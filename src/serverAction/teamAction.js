'use server';
import { connectDB } from '../lib/mongodb';
import {
    eventModels,
    nationalEventModel,
    teamModels,
    userModels,
} from '../models';
import { deleteCache, getOrSetCache } from '../utils/Cache';

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

        return { success: true, team: JSON.parse(JSON.stringify(team)) };
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
    try {
        if (!user || !user._id) {
            return { success: false, message: 'Invalid user data' };
        }

        // If user has no teams → skip cache entirely
        if (!user.teams || !user.teams.length) {
            return { success: true, data: [] };
        }

        // Cache key specific to the user
        const cacheKey = `userTeams:${user._id}`;

        // Wrap DB logic inside getOrSetCache
        const { success, data, cache } = await getOrSetCache(
            cacheKey,
            async () => {
                await connectDB();
                const teamsAndEvent = await teamModels
                    .find({ _id: { $in: user.teams } })
                    .populate([
                        {
                            path: 'event',
                            select: 'name dateTime location locationURL status',
                        },
                        {
                            path: 'members',
                            select: 'name email profileImage',
                        },
                        {
                            path: 'leader',
                            select: 'name email profileImage',
                        },
                    ])
                    .lean();

                return JSON.parse(JSON.stringify(teamsAndEvent));
            },
            300 // cache TTL = 5 minutes
        );

        return { success, data, cache };
    } catch (err) {
        console.error('Error fetching user teams and events:', err);
        return { success: false, message: 'Failed to fetch teams and events' };
    }
}

export async function updateTeamEntry({
    teamId,
    nationals = false,
    nationalId = null,
}) {
    try {
        await connectDB();

        const team = await teamModels
            .findById(teamId)
            .populate('event members');
        if (!team)
            return { success: false, message: 'Invalid or unknown team ID' };

        // --- NATIONAL EVENT ENTRY ---
        if (nationals) {
            if (!nationalId) {
                return {
                    success: false,
                    message: 'Missing nationalId for national entry',
                };
            }

            const nationalEvent = await nationalEventModel.findById(nationalId);
            if (!nationalEvent)
                return { success: false, message: 'Invalid national event ID' };

            // Check if team already entered
            if (nationalEvent.entered.includes(teamId)) {
                return {
                    success: false,
                    message:
                        'Team already marked as entered for this national event',
                };
            }

            nationalEvent.entered.push(teamId);
            await nationalEvent.save();

            return {
                success: true,
                message: 'Team marked as entered for national event!',
            };
        }

        // --- LOCAL EVENT ENTRY ---
        if (!nationals) {
            if (team.entered) {
                return {
                    success: false,
                    message: 'Team already marked as entered',
                };
            }

            team.entered = true;
            await team.save();

            return {
                success: true,
                data: {
                    name: team.name,
                    id: team._id,
                    event: team.event,
                    members: team.members,
                },
                message: 'Team marked as entered locally',
            };
        }

        return { success: false, message: 'Invalid request' };
    } catch (err) {
        console.error('updateTeamEntry error:', err);
        return { success: false, message: 'Server error while updating entry' };
    }
}

export async function updateTeam(teamId, update) {
    if (
        !teamId ||
        typeof update !== 'object' ||
        Object.keys(update).length === 0
    ) {
        return {
            success: false,
            message: 'Team ID or update data not provided or empty.',
        };
    }

    try {
        await connectDB();

        // Whitelist top-level fields
        const allowedFields = ['name', 'submission'];

        // Sanitize nested submission fields if present
        if (update.submission && typeof update.submission === 'object') {
            const allowedSubFields = ['text', 'video', 'document', 'repo'];
            update.submission = Object.fromEntries(
                Object.entries(update.submission).filter(([key]) =>
                    allowedSubFields.includes(key)
                )
            );
        }

        // Sanitize top-level update
        const sanitizedUpdate = Object.fromEntries(
            Object.entries(update).filter(([key]) =>
                allowedFields.includes(key)
            )
        );

        if (Object.keys(sanitizedUpdate).length === 0) {
            return {
                success: false,
                message: 'No valid fields provided for update.',
            };
        }

        // Atomic update
        const updatedTeam = await teamModels.findByIdAndUpdate(
            teamId,
            { $set: sanitizedUpdate },
            { new: true, runValidators: true }
        );

        if (!updatedTeam) {
            return { success: false, message: 'Team not found.' };
        }

        const deleteResult = await deleteCache(
            `userTeams:${updatedTeam.leader.toString()}`
        );
        console.log('Cache deletion result:', deleteResult);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(updatedTeam)),
            message: 'Team updated successfully.',
        };
    } catch (error) {
        console.error('Error updating team:', error);
        return {
            success: false,
            message: error.message || 'Server error.',
        };
    }
}
