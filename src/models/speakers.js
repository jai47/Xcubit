import mongoose from 'mongoose';

const SpeakerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String },
        designation: { type: String },
        organization: { type: String },
        description: { type: String },
        email: { type: String, unique: true, sparse: true },
        banner: { type: String },
        role: {
            type: String,
            enum: ['Speaker'],
            default: 'Speaker',
        },
        socialLinks: {
            linkedin: String,
            twitter: String,
        },
        topic: { type: String }, // Topic of talk
        sessionTime: { type: Date }, // When they will speak
        eventName: { type: String }, // Event/session name
    },
    { timestamps: true }
);

export const SpeakerModel =
    mongoose.models?.speaker || mongoose.model('speaker', SpeakerSchema);
