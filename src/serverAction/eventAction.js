'use server';

import { connectDB } from '@/src/lib/mongodb';
import { eventModels } from '../models/events';
import { collegeModels } from '../models/colleges';

/**
 * Fetch the event for a specific college & national (returns null if none)
 */
export async function eventInstituteGET(collegeId, nationalId) {
    try {
        await connectDB();

        if (!collegeId || !nationalId) {
            return {
                success: false,
                message: 'collegeId and nationalId are required',
            };
        }

        const event = await eventModels
            .findOne({ institute: collegeId, national: nationalId })
            .lean();

        return {
            success: true,
            data: event ? JSON.parse(JSON.stringify(event)) : null,
        };
    } catch (err) {
        console.error('eventInstituteGET error:', err);
        return { success: false, message: 'Server error while fetching event' };
    }
}

/**
 * Create event for a specific college under a national.
 * - prevents duplicates
 * - updates college.nationals using $addToSet (so duplicate nationals are avoided)
 * - rolls back the created event if the college update fails
 */
export async function eventInstitutePOST(formData) {
    try {
        await connectDB();

        // basic validation
        if (!formData?.institute || !formData?.national) {
            return {
                success: false,
                message: 'institute and national are required',
            };
        }

        // Prevent duplicate at app level
        const existing = await eventModels.findOne({
            institute: formData.institute,
            national: formData.national,
        });

        if (existing) {
            return {
                success: false,
                message: 'Event already exists for this college and national',
            };
        }

        // Create event
        const newEvent = await eventModels.create(formData);

        // Update college: use $addToSet so duplicates are avoided
        const updatedCollege = await collegeModels.findByIdAndUpdate(
            formData.institute,
            { $addToSet: { national: formData.national } }, // use 'nationals' array field
            { new: true }
        );

        // If college not found / update failed, roll back event creation to keep data consistent
        if (!updatedCollege) {
            // attempt rollback
            try {
                await eventModels.findByIdAndDelete(newEvent._id);
            } catch (delErr) {
                console.error('Rollback failed for event:', delErr);
            }
            return {
                success: false,
                message: 'College not found — event creation rolled back',
            };
        }

        return { success: true, data: JSON.parse(JSON.stringify(newEvent)) };
    } catch (err) {
        // If error is from unique index duplicate key, return friendly message
        if (err && err.code === 11000) {
            return {
                success: false,
                message:
                    'Duplicate event: an event for this college & national already exists',
            };
        }

        console.error('eventInstitutePOST error:', err);
        return { success: false, message: 'Server error while creating event' };
    }
}

// ✅ Fetch all events (national-level listing or admin use)
export async function eventGET() {
    try {
        await connectDB();
        const events = await eventModels
            .find({})
            .populate('institute')
            .populate('national');
        return { success: true, data: JSON.parse(JSON.stringify(events)) };
    } catch (err) {
        console.error('eventGET error:', err);
        return {
            success: false,
            message: 'Server error while fetching all events',
        };
    }
}

export async function getEventBySlug(slug) {
    await connectDB();
    try {
        if (typeof slug !== 'string') {
            return false;
        }
        const event = await eventModels.findOne({ slug: slug }).lean();
        if (!event) {
            return false;
        }
        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.error('Error fetching event by name:', error.message);
        throw error; // Re-throw error for handling in getServerSideProps
    }
}

// Function to create a new event
export async function eventFormAction(formData) {
    await connectDB();
    const data = await formData;
    const requiredFields = ['name', 'category', 'description', 'start', 'end'];
    for (const field of requiredFields) {
        if (!data[field]) {
            throw new Error(`Field "${field}" is required.`);
        }
    }

    // Additional validations (e.g., date formats, numeric fields)
    if (isNaN(parseFloat(data.price))) {
        throw new Error('Price must be a valid number.');
    }
    try {
        // Create a new event using the Event model
        const event = await eventModels.create(data);
        // Return the newly created event
        event.save();
    } catch (error) {
        // If an error occurs during event creation, log the error and throw it
        console.log(error);
        throw error;
    }
}
