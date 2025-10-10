'use server';
import { connectDB } from '../lib/mongodb';
import { eventModels } from '../models/events';
import { teamModels } from '../models/teams';
import { userModels } from '../models/users';

export async function getTeamById(teamId) {
    await connectDB();
    try {
        const team = await teamModels.findById(teamId).populate('event');
        if (!team) {
            return { success: false, message: 'Team not found' };
        }
        const event = team.event;
        return { success: true, team, event };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fetching team' };
    }
}

export async function checkAlreadyInTeam(eventId, userId) {
    await connectDB();
    try {
        const existingTeam = await teamModels.findOne({
            event: eventId,
            $or: [{ leader: userId }, { members: userId }],
        });

        if (existingTeam) {
            return {
                success: true,
                message: 'You are already in a team for this event',
                data: existingTeam._id,
            };
        }

        return { success: false, message: 'No team exist for this event' };
    } catch (error) {
        return {
            success: false,
            message: 'Internal Server Error',
        };
    }
}

export async function createTeam({ eventId, leaderId, name }) {
    await connectDB();

    try {
        // check event existence
        const event = await eventModels.findById(eventId);
        if (!event) return { success: false, message: 'Event not found' };

        // prevent duplicate teams for the same event
        const existingTeam = await teamModels.findOne({
            event: eventId,
            $or: [{ leader: leaderId }, { members: leaderId }],
        });

        if (existingTeam) {
            return {
                success: false,
                message: 'You are already in a team for this event',
            };
        }

        // create team
        const team = await teamModels.create({
            name,
            leader: leaderId,
            members: [leaderId],
            event: eventId,
        });

        // update references
        await Promise.all([
            eventModels.findByIdAndUpdate(eventId, {
                $push: { registered: team._id },
            }),
            userModels.findByIdAndUpdate(leaderId, {
                $push: { teams: team._id, events: eventId },
            }),
        ]);

        return { success: true, team: team.toObject() };
    } catch (err) {
        console.error('Error creating team:', err);
        return { success: false, message: 'Server error while creating team' };
    }
}

export async function joinTeam({ teamCode, userId }) {
    await connectDB();
    try {
        // find team by its _id
        const team = await teamModels.findById(teamCode).populate('event');
        if (!team) return { success: false, message: 'Invalid team code' };

        // prevent joining multiple teams in same event
        const existingTeam = await teamModels.findOne({
            event: team.event._id,
            $or: [{ leader: userId }, { members: userId }],
        });

        if (existingTeam) {
            return {
                success: false,
                message: 'You are already in a team for this event',
            };
        }

        // add user to team
        team.members.push(userId);
        await team.save();

        await userModels.findByIdAndUpdate(userId, {
            $push: { teams: team._id, events: team.event._id },
        });

        return {
            success: true,
            message: 'Join the team',
            data: JSON.parse(JSON.stringify(team)),
        };
    } catch (err) {
        console.error('Error joining team:', err);
        return { success: false, message: 'Server error while joining team' };
    }
}

export async function teamAndEventUserGET(user) {
    await connectDB();

    try {
        // If user has no teams
        if (!user.teams || !user.teams.length) {
            return { success: true, teamsAndEvent: [] };
        }

        // Fetch all teams the user is part of and populate the associated event
        const teamsAndEvent = await teamModels
            .find({ _id: { $in: user.teams } })
            .populate([
                {
                    path: 'event',
                    select: 'name dateTime location locationURL status', // ✅ only the required fields
                },
                {
                    path: 'members',
                    select: 'name email profileImage', // ✅ small member footprint
                },
                {
                    path: 'leader',
                    select: 'name email profileImage',
                },
            ])
            .lean();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(teamsAndEvent)),
        };
    } catch (err) {
        console.error('Error fetching user teams and events:', err);
        return { success: false, message: 'Failed to fetch teams and events' };
    }
}
