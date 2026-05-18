'use server';

import { connectDB } from '@/src/lib/mongodb';
import { queryModels } from '../models';

export async function queryFormAction(formData) {
    try {
        await connectDB();
        const query = await queryModels.create(formData);
        query.save();
        return query;
    } catch (e) {
        return e;
    }
}

//get all query
export async function getAllQuery() {
    try {
        await connectDB();
        const query = await queryModels.find().lean();
        if (!query) {
            return {
                success: false,
                message: 'Cannot fetch queries at this moment',
            };
        }
        return { success: true, data: JSON.parse(JSON.stringify(query)) };
    } catch (e) {
        return {
            success: false,
            message: 'Internal server error',
        };
    }
}

// delete the query
export async function deleteQuery(id) {
    try {
        await connectDB();
        const query = await queryModels.findByIdAndDelete(id);
        return query;
    } catch (e) {
        return e;
    }
}
