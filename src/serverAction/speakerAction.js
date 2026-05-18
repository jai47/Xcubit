'use server';
import mongoose from 'mongoose';
import { connectDB } from '../lib/mongodb';
import { SpeakerModel } from '../models';

// /admin to fetch sponsor all data for admin
export async function speakerAdminGET() {
    try {
        await connectDB();
        const speaker = await SpeakerModel.find({}).lean();
        if (!speaker) {
            return {
                success: false,
                message: 'Not able to fetch speakers at this moment',
            };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(speaker)),
        };
    } catch (error) {
        return {
            success: false,
            message: 'Encountered an server error',
        };
    }
}

export async function speakerAdminPOST(data) {
    try {
        await connectDB();
        const newSpeaker = await SpeakerModel.create(data);
        if (!newSpeaker) {
            return {
                success: false,
                message: 'Cannot create new speaker right now',
            };
        }
        return { success: true, data: JSON.parse(JSON.stringify(newSpeaker)) };
    } catch (error) {
        return { success: false, message: 'Internal Server Error' };
    }
}

//delete speaker in admin panel
export async function speakerAdminDELETE(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                success: false,
                message:
                    'Invalid speaker ID, contact website devloper to delete entry',
            };
        }

        await connectDB();

        const result = await SpeakerModel.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return {
                success: false,
                message: 'Speaker not found or already deleted',
            };
        }
        return {
            success: true,
            message: 'Speaker deleted successfully',
        };
    } catch (error) {
        console.error('Error deleting speaker:', error);
        return {
            success: false,
            message: 'Internal Server Error',
        };
    }
}

export async function speakerGET() {
    try {
        await connectDB();
        const speakers = await SpeakerModel.find({});
        if (!speakers) {
            return {
                success: false,
                message: 'Cannot fetch speakers at the moment',
            };
        }
        return { success: true, data: JSON.parse(JSON.stringify(speakers)) };
    } catch (error) {
        return {
            success: false,
            message: 'Internal Server Error',
        };
    }
}
