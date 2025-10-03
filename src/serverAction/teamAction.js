'use server';
import { nanoid } from 'nanoid';
import { connectDB } from '../lib/mongodb';
import { eventModels } from '../models/events';
import { teamModels } from '../models/teams';
import { userModels } from '../models/users';

/**
 * Create a new team for an event
 */
export async function createTeam({ eventId, leaderId, name }) {
    await connectDB();

    try {
        // Check if event exists
        const event = await eventModels.findById(eventId);
        if (!event) return { success: false, message: 'Event not found' };

        // Check if user already has a team in this event
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

        // Create unique team code
        const teamCode = nanoid(8);

        const team = await teamModels.create({
            name,
            leader: leaderId,
            members: [leaderId],
            teamCode,
            event: eventId,
        });

        // Update user reference
        await userModels.findByIdAndUpdate(leaderId, {
            $push: { teams: team._id },
        });

        return { success: true, team };
    } catch (err) {
        console.error('Error creating team:', err);
        return { success: false, message: 'Server error' };
    }
}

/**
 * Join an existing team with code
 */
export async function joinTeam({ teamCode, userId }) {
    await dbConnect();

    try {
        // Find team by code
        const team = await teamModels.findOne({ teamCode }).populate('event');
        if (!team) return { success: false, message: 'Invalid team code' };

        // Check if user already has a team in this event
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

        // Add user to team
        team.members.push(userId);
        await team.save();

        // Update user reference
        await userModels.findByIdAndUpdate(userId, {
            $push: { teams: team._id },
        });

        return { success: true, team };
    } catch (err) {
        console.error('Error joining team:', err);
        return { success: false, message: 'Server error' };
    }
}
