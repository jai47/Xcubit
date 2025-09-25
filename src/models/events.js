import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    college: { type: String },
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: Array, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    time: { type: String, required: true },
    image: { type: String, required: true },
    fileId: { type: String, required: true },
    thumbnail: { type: String, required: true },
    location: { type: String, required: true },
    locationURL: { type: String, required: true },
    eventType: {
        type: String,
        required: true,
    },
    price: { type: Number, required: true, min: 0 },
    maxParticipation: { type: Number, required: true, min: 1 },
    prizePool: { type: Number, required: true, min: 0 },
    sponsors: { type: Array, required: false },
    featureGuests: { type: Array, required: false },
    submission: {
        text: { type: Boolean, default: false },
        video: { type: Boolean, default: false },
        document: { type: Boolean, default: false },
        repo: { type: Boolean, default: false },
    },
    registered: { type: Number, default: 0 },
    entered: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
});

export const eventModels =
    mongoose.models?.event || mongoose.model('event', eventSchema);
