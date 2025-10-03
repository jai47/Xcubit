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
        teamCode: { type: String, unique: true, required: true },
        event: { type: mongoose.Schema.Types.ObjectId, ref: 'event' },
        submission: {
            text: { type: Boolean, default: false },
            video: { type: Boolean, default: false },
            document: { type: Boolean, default: false },
            repo: { type: Boolean, default: false },
        },
    },
    { timestamps: true }
);

export const teamModels =
    mongoose.models?.team || mongoose.model('team', teamSchema);
