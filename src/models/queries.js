import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    query: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const queryModels =
    mongoose.models?.query || mongoose.model('query', querySchema);
