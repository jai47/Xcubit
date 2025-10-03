'use server';

import { connectDB } from '../lib/mongodb';
import { nationalEventModel } from '../models/nationalEvent';

// ✅ GET all events
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
        await connectDB();
        const latestEvent = await nationalEventModel
            .findOne({})
            .sort({ date: -1, createdAt: -1 })
            .lean();

        if (!latestEvent) {
            return { success: false, message: 'No events found' };
        }
        return { success: true, data: JSON.parse(JSON.stringify(latestEvent)) };
    } catch (err) {
        return {
            success: false,
            message: 'Server error while fetching latest event',
        };
    }
}
