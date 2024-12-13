import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    fileId: { type: String, required: true },
    thumbnail: { type: String, required: true },
    location: { type: String, required: true },
    locationURL: { type: String, required: true },
    eventType: { type: String, required: true },
    price: { type: String, required: true },
    maxParticipation: { type: String, required: true },
    entered: { type: String },
    timestamp: { type: Date, default: Date.now },
});

export const eventModels =
    mongoose.models?.event || mongoose.model('event', eventSchema);
