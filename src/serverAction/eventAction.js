'use server';

import { connectDB } from '@/src/lib/mongodb';
// Importing the Event model from the models folder
import { eventModels } from '../models/events';

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

export async function updateRegistered(name) {
    await connectDB();
    try {
        // Use $inc to increment the registered field
        const event = await eventModels.findOneAndUpdate(
            { name }, // Find the event by name
            { $inc: { registered: 1 } }, // Increment the registered field by 1
            { new: true } // Return the updated document
        );
        return true;
    } catch (error) {
        return false;
    }
}

// Function to get all events
export async function getEvents() {
    try {
        // Retrieve all events using the Event model
        await connectDB();
        const events = await eventModels.find().lean();
        if (!events) {
            return {
                success: false,
                message: 'Cannot fetch events at this moment',
            };
        }
        return { success: true, data: JSON.parse(JSON.stringify(events)) };
    } catch (error) {
        // If an error occurs during event retrieval, log the error and throw it
        console.log(error);
        throw error;
    }
}

// Function to get a single event by ID
export async function getEventById(id) {
    try {
        // Retrieve the event by ID using the Event model
        const event = await eventModels.findById(id);
        // Return the event
        return event;
    } catch (error) {
        // If an error occurs during event retrieval, log the error and throw it
        console.log(error);
        throw error;
    }
}

// Function to get a single event by name
// export async function getEventByName(name) {
//     await connectDB();
//     try {
//         if (typeof name !== 'string') {
//             return false;
//         }
//         const event = await eventModels.findOne({ name: name });
//         if (!event) {
//             return false;
//         }
//         return event;
//     } catch (error) {
//         console.error('Error fetching event by name:', error.message);
//         throw error; // Re-throw error for handling in getServerSideProps
//     }
// }

export async function getEventBySlug(slug) {
    await connectDB();
    try {
        if (typeof slug !== 'string') {
            return false;
        }
        const event = await eventModels.findOne({ slug: slug });
        if (!event) {
            return false;
        }
        return event;
    } catch (error) {
        console.error('Error fetching event by name:', error.message);
        throw error; // Re-throw error for handling in getServerSideProps
    }
}

// Function to update an event by ID
export async function updateEvent(id, eventDetails) {
    try {
        // Update the event by ID using the Event model
        const event = await eventModels.findByIdAndUpdate(id, eventDetails, {
            new: true,
        });
        // Return the updated event
        return event;
    } catch (error) {
        // If an error occurs during event update, log the error and throw it
        console.log(error);
        throw error;
    }
}
