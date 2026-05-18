'use server';
import mongoose from 'mongoose';
import { connectDB } from '../lib/mongodb';
import { JudgeModel } from '../models';

// Fetch all judges for admin
export async function judgeAdminGET() {
    try {
        await connectDB();
        const judges = await JudgeModel.find({}).lean();
        if (!judges) {
            return {
                success: false,
                message: 'Unable to fetch judges at this moment',
            };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(judges)),
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Encountered a server error',
        };
    }
}

// Create a new judge
export async function judgeAdminPOST(data) {
    try {
        await connectDB();
        const newJudge = await JudgeModel.create(data);
        if (!newJudge) {
            return {
                success: false,
                message: 'Cannot create new judge right now',
            };
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(newJudge)),
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Internal Server Error' };
    }
}

//delete judge in admin panel
export async function judgeAdminDELETE(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                success: false,
                message:
                    'Invalid judge ID, contact website devloper to delete entry',
            };
        }

        await connectDB();

        const result = await JudgeModel.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return {
                success: false,
                message: 'Judge not found or already deleted',
            };
        }
        return {
            success: true,
            message: 'Judge deleted successfully',
        };
    } catch (error) {
        console.error('Error deleting judge:', error);
        return {
            success: false,
            message: 'Internal Server Error',
        };
    }
}

// for /* to display judges
export async function judgeGET() {
    try {
        await connectDB();
        const judges = await JudgeModel.find({});
        if (!judges) {
            return {
                success: false,
                message: 'Cannot fetch judges at the moment',
            };
        }
        return { success: true, data: JSON.parse(JSON.stringify(judges)) };
    } catch (error) {
        return {
            success: false,
            message: 'Internal Server Error',
        };
    }
}
