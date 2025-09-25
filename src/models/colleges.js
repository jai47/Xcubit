// models/College.js
import mongoose from 'mongoose';
import { generateVerificationTokens } from '../utils/generateVerificationTokens';

const CollegeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        adminUserEmail: { type: String, required: true, unique: true }, // College admin
        logo: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        phone: { type: String },
        website: { type: String },
        events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }], // Linked events
        verified: { type: Boolean, default: false },
        verifyToken: { type: String, default: generateVerificationTokens },
        contract: { type: String, default: '' },
    },
    { timestamps: true }
);

export const collegeModels =
    mongoose.models?.college || mongoose.model('college', CollegeSchema);
