import mongoose, { Schema } from 'mongoose';

const contentBlockSchema = new Schema({
    type: {
        type: String,
        enum: ['text', 'image', 'list'],
        required: true,
    },
    value: { type: Schema.Types.Mixed, required: true },
});

const timelineSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date },
    blocks: [contentBlockSchema], // multiple blocks per timeline item
});

const venueSchema = new Schema({
    name: { type: String },
    address: { type: String },
    locationURL: { type: String },
});

const nationalEventSchema = new Schema(
    {
        name: { type: String, required: true },
        session: { type: String, required: true, unique: true }, // e.g., "2026"
        date: { type: Date, required: true },
        registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
        entered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
        venue: { type: venueSchema, default: {} },
        timeline: [timelineSchema],
        shortDescription: { type: String },
        description: { type: String },
        banner: { type: String },
        status: {
            type: String,
            enum: ['upcoming', 'ongoing', 'completed'],
            default: 'upcoming',
        },
    },
    { timestamps: true }
);

export const nationalEventModel =
    mongoose.models?.national ||
    mongoose.model('national', nationalEventSchema);
