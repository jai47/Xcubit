import mongoose from 'mongoose';

const ProblemStatementSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true, unique: true },
        title: { type: String, required: true, unique: true },
        description: { type: String },
        company: { type: String },
        department: { type: String },
        category: { type: String, enum: ['Software', 'Hardware'] },
        theme: { type: String },
        social: { type: Object },
        dataset: { type: String },
        teamSize: {
            min: { type: Number, default: 2 },
            max: { type: Number, default: 6 },
        },
        tags: [String],
    },
    { timestamps: true }
);

export const problemStatementModels =
    mongoose.models?.problemStatement ||
    mongoose.model('problemStatement', ProblemStatementSchema);
