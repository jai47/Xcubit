'use server';

import { connectDB } from '../lib/mongodb';
import { problemStatementModels } from '../models';

// Get all problem statements
export async function problemStatementGET() {
    try {
        await connectDB();
        const statements = await problemStatementModels.find({});
        return {
            success: true,
            data: JSON.parse(JSON.stringify(statements)),
        };
    } catch (error) {
        return {
            success: false,
            message: 'Internal Server Error',
        };
    }
}

// Get a problem statement by ID
export async function problemStatementGETById(id) {
    try {
        await connectDB();
        const statement = await problemStatementModels.findById(id);
        if (!statement) {
            return { success: false, message: 'Problem statement not found' };
        }
        return { success: true, data: JSON.parse(JSON.stringify(statement)) };
    } catch (error) {
        return { success: false, message: 'Internal Server Error' };
    }
}

// Create a new problem statement
export async function problemStatementPOST(payload) {
    try {
        await connectDB();
        const existing = await problemStatementModels.findOne({
            title: payload.title,
        });
        if (existing) {
            return {
                success: false,
                message: 'Problem statement already exists',
            };
        }
        const newStatement = await problemStatementModels.create(payload);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(newStatement)),
        };
    } catch (error) {
        return { success: false, message: 'Internal Server Error' };
    }
}

// Delete a problem statement by ID
export async function problemStatementDELETE(id) {
    try {
        await connectDB();
        const deleted = await problemStatementModels.findByIdAndDelete(id);
        if (!deleted) {
            return { success: false, message: 'Problem statement not found' };
        }
        return { success: true, data: JSON.parse(JSON.stringify(deleted)) };
    } catch (error) {
        return { success: false, message: 'Internal Server Error' };
    }
}
