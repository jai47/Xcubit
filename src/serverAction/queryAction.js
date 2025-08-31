'use server';

import { connectDB } from '@/src/lib/mongodb';
import { queryModels } from '@/src/models/queries';

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
        const query = await queryModels.find();
        return query;
    } catch (e) {
        return e;
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
