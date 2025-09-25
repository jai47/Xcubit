'use server';
import { connectDB } from '../lib/mongodb';
import { JudgeModel } from '../models/judges';

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
