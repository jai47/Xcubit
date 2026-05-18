'use server';
import mongoose from 'mongoose';
import { connectDB } from '../lib/mongodb';
import { sponsorModels } from '../models';

// /admin to fetch sponsor all data for admin
export async function sponsorAdminGET() {
    try {
        await connectDB();
        const sponsor = await sponsorModels.find({}).lean();
        if (!sponsor) {
            return {
                success: false,
                message: 'Cannot able to fetch sponsors at this moment',
            };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(sponsor)),
        };
    } catch (error) {
        return {
            success: false,
            message: 'Encountered an server error',
        };
    }
}

// for /admin to create new sponsor
export async function sponsorAdminPOST(data) {
    try {
        await connectDB();
        const newSponsor = await sponsorModels.create(data);
        if (!newSponsor) {
            return {
                success: false,
                message: 'Cannot create new sponsor right now',
            };
        }
        return { success: true, data: JSON.parse(JSON.stringify(newSponsor)) };
    } catch (error) {
        return { success: false, message: 'Internal Server Error' };
    }
}

//delete sponsor in admin panel
export async function sponsorAdminDELETE(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                success: false,
                message:
                    'Invalid sponsor ID, contact website devloper to delete entry',
            };
        }

        await connectDB();

        const result = await sponsorModels.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return {
                success: false,
                message: 'Sponsor not found or already deleted',
            };
        }
        return {
            success: true,
            message: 'Sponsor deleted successfully',
        };
    } catch (error) {
        console.error('Error deleting sponsor:', error);
        return {
            success: false,
            message: 'Internal Server Error',
        };
    }
}

// for /* to get image, link of sponsor
export async function sponsorGET() {
    try {
        await connectDB();
        const sponsors = await sponsorModels.find({});
        if (!sponsors) {
            return {
                success: false,
                message: 'Not able to fetch sponsors at the moment',
            };
        }
        return { success: true, data: JSON.parse(JSON.stringify(sponsors)) };
    } catch (error) {
        return {
            success: false,
            message: 'Internal server error',
        };
    }
}
