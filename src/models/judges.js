import mongoose from 'mongoose';

const JudgesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String },
        designation: { type: String },
        organization: { type: String },
        description: { type: String },
        email: { type: String, unique: true, sparse: true },
        expertise: [String],
        role: {
            type: String,
            enum: ['Judge', 'Mentor', 'Evaluator', 'Speaker'],
            default: 'Judge',
        },
        socialLinks: {
            linkedin: String,
            twitter: String,
        },
    },
    { timestamps: true }
);

export const JudgeModel =
    mongoose.models?.judge || mongoose.model('judge', JudgesSchema);
