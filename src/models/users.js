import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String },
    verified: { type: Boolean, default: false },
    events: { type: Array },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
    verifyToken: { type: String },
    verifyTokenExpiry: { type: Date },
    timestamp: { type: Date, default: Date.now },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    address: { type: String },
    city: { type: String },
    stateOrProvince: { type: String },
    country: { type: String },
    postalCode: { type: String },
    linkedInOrGithub: { type: String },
});

export const userModels =
    mongoose.models?.user || mongoose.model('user', userSchema);
