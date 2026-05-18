import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
        national: { type: mongoose.Schema.Types.ObjectId, ref: 'national' },
        institute: { type: mongoose.Schema.Types.ObjectId, ref: 'college' },
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        shortDescription: { type: String, required: true },
        description: { type: String, required: true },
        dateTime: { type: Date, required: true },
        image: { type: String, required: true },
        location: { type: String, required: true },
        locationURL: { type: String, required: true },
        featureGuests: [{ type: Object }],
        registered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
        postEventImags: [{ type: String }],
    },
    { timestamps: true }
);

eventSchema.index({ institute: 1, national: 1 }, { unique: true });

export const eventModels =
    mongoose.models?.event || mongoose.model('event', eventSchema);
