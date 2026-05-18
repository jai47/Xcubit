import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
    {
        name: { type: String, required: true },
        leader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        event: { type: mongoose.Schema.Types.ObjectId, ref: 'event' },
        submission: {
            text: { type: String, default: '' },
            video: { type: String, default: '' },
            document: { type: String, default: '' },
            repo: { type: String, default: '' },
        },
        entered: { type: Boolean, default: false }, // for local level
        national: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'national',
            default: null,
        },
    },
    { timestamps: true }
);

export const teamModels =
    mongoose.models?.team || mongoose.model('team', teamSchema);
