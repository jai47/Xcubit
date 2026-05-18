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
        national: [{ type: mongoose.Schema.Types.ObjectId, ref: 'national' }], // <-- track nationals, not events
        verified: { type: Boolean, default: false },
        verifyToken: { type: String, default: generateVerificationTokens },
        contract: { type: String, default: '' },
        approval: { type: Boolean, default: false },
        postEventImages: [{ type: String }],
    },
    { timestamps: true }
);

export const collegeModels =
    mongoose.models?.college || mongoose.model('college', CollegeSchema);
