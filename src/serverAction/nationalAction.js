'use server';

import { connectDB } from '../lib/mongodb';
import { nationalEventModel, teamModels } from '../models';
import { deleteCache, getOrSetCache } from '../utils/Cache';

// ✅ GET all national events
export async function nationalEventAdminGET() {
    try {
        await connectDB();
        const events = await nationalEventModel.find({}).lean();
        if (!events) {
            return { success: false, message: 'No events found' };
        }
        return { success: true, data: JSON.parse(JSON.stringify(events)) };
    } catch (err) {
        return {
            success: false,
            message: 'Server error while fetching events',
        };
    }
}

// ✅ POST create new event
export async function nationalEventAdminPOST(data) {
    try {
        await connectDB();
        const newEvent = await nationalEventModel.create(data);
        if (!newEvent) {
            return { success: false, message: 'Failed to create event' };
        }
        return { success: true, data: JSON.parse(JSON.stringify(newEvent)) };
    } catch (err) {
        return { success: false, message: 'Server error while creating event' };
    }
}

// ✅ PUT update event
export async function nationalEventAdminPUT(id, updates) {
    try {
        await connectDB();
        const updatedEvent = await nationalEventModel
            .findByIdAndUpdate(id, updates, { new: true })
            .lean();

        if (!updatedEvent) {
            return { success: false, message: 'Event not found' };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(updatedEvent)),
        };
    } catch (err) {
        return { success: false, message: 'Server error while updating event' };
    }
}

// ✅ GET latest event (based on `date`, fallback to `createdAt`)
export async function nationalEventAdminGETLATEST() {
    try {
        const cacheKey = 'currentNationalEvent';
        const { success, data, cache } = await getOrSetCache(
            cacheKey,
            async () => {
                await connectDB();
                return await nationalEventModel
                    .findOne({})
                    .sort({ date: -1, createdAt: -1 })
                    .lean();
            }
        );

        if (!success) {
            return { success: false, message: 'No events found' };
        }
        return {
            success,
            data: JSON.parse(JSON.stringify(data)),
        };
    } catch (err) {
        return {
            success: false,
            message: 'Server error while fetching latest event',
        };
    }
}

export async function sendTeamsToNational({ nationalId, teamIds, collegeId }) {
    await connectDB();

    if (!nationalId || !Array.isArray(teamIds) || teamIds.length === 0) {
        return { success: false, message: 'Invalid data' };
    }

    try {
        const national = await nationalEventModel.findById(nationalId);
        if (!national) {
            return { success: false, message: 'National event not found' };
        }

        const now = new Date();

        // ✅ Only allow between submissionDate and submissionDeadline
        if (now < national.submissionDate) {
            return {
                success: false,
                message: `Submission window starts on ${national.submissionDate.toDateString()}`,
            };
        }

        if (now > national.submissionDeadline) {
            return {
                success: false,
                message: `Submission window closed on ${national.submissionDeadline.toDateString()}`,
            };
        }

        // ✅ Update teams in bulk
        const updated = await teamModels.updateMany(
            { _id: { $in: teamIds } },
            { $set: { national: national._id } }
        );

        // ✅ Add unique teams to national.registrations
        const uniqueIds = [
            ...new Set([
                ...national.registrations.map((id) => id.toString()),
                ...teamIds.map((id) => id.toString()),
            ]),
        ];

        national.registrations = uniqueIds;
        await national.save();

        await deleteCache(`event:${collegeId}:${nationalId}`);
        return {
            success: true,
            message: `${updated.modifiedCount} team(s) submitted successfully.`,
        };
    } catch (err) {
        console.error('Send to National Error ❌', err);
        return { success: false, message: 'Internal server error.' };
    }
}
