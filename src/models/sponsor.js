import mongoose from 'mongoose';

const SponsorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        logo: { type: String },
        social: { type: Object },
        patnerShip: { type: String }, //eg media partner, ....
        category: {
            type: String,
            enum: ['title', 'platinum', 'gold', 'silver'],
            default: 'silver',
        },
        tags: [String],
    },
    { timestamps: true }
);

export const sponsorModels =
    mongoose.models?.sponsor || mongoose.model('sponsor', SponsorSchema);
