'use server';
import { connectDB } from '@/lib/mongodb';
import { userModels } from '../models/users';
import {
    comparePassword,
    saltAndHashPassword,
} from '@/utils/saltAndHashPassword';
import { redirect } from 'next/navigation';
import { get } from 'mongoose';

export async function userFormAction(formData) {
    await connectDB();
    let data = Object.fromEntries(formData.entries());
    const requiredFields = ['email', 'password'];
    for (const field of requiredFields) {
        if (!data[field]) {
            throw new Error(`Field "${field}" is required.`);
        }
    }

    let user = await getUserFromDB(data.email);

    if (user) {
        throw new Error({ msg: 'User already exists' });
    }

    data = {
        ...data,
        password: await saltAndHashPassword(data.password),
        role: 'user',
        verified: false,
        forgotPasswordToken: 'first',
        forgotPasswordTokenExpiry: Date.now(),
        verifyToken: encodeURIComponent(
            await saltAndHashPassword(process.env.VERIFY_STRING + data.password)
        ),
        verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
    };
    try {
        const user = await userModels.create(data);
        await user.save();
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                subject: `Welcome to the community, ${user.name}`,
                message: {
                    name: user.name,
                    dashboardLink: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
                    contactEmail: 'official.jaimishra@gmail.com',
                },
                type: 'welcome',
            }),
        });
        return redirect('/login');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function userGoogleAction(email, name) {
    await connectDB();

    try {
        let data = {
            name: name,
            email: email,
            role: 'user',
            verified: false,
            forgotPasswordToken: 'first',
            forgotPasswordTokenExpiry: Date.now(),
            verifyToken: encodeURIComponent(
                await saltAndHashPassword(process.env.VERIFY_STRING + email)
            ),
            verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
        };

        const user = await userModels.create(data);
        await user.save();
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                subject: `Welcome to the community, ${user.name}`,
                message: {
                    name: user.name,
                    dashboardLink: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
                    contactEmail: 'official.jaimishra@gmail.com',
                },
                type: 'welcome',
            }),
        });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserEmailPassword(email, password) {
    await connectDB();
    const user = await userModels.findOne({ email: email });
    if (!user) {
        return null;
    } else {
        const correctPass = await comparePassword(password, user.password);
        if (correctPass) {
            return user;
        } else {
            return null;
        }
    }
}

export async function getUserFromDB(email) {
    try {
        await connectDB();
        const user = await userModels.findOne({ email: email });
        if (!user) {
            return null;
        } else {
            return user;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateVerifyUser(token) {
    try {
        // Use `await` without a callback
        await connectDB(); // Ensure DB is connected
        const user = await userModels.findOne({ verifyToken: token });

        if (user) {
            user.verifyTokenExpiry > Date.now()
                ? (user.verified = true)
                : (user.verified = false);

            await user.save();
        }

        if (!user) {
            throw new Error('User not found');
        }

        return user; // Return the updated user document
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export async function updateForgotPasswordToken(email) {
    try {
        await connectDB();
        const user = await getUserFromDB(email);
        if (user) {
            user.forgotPasswordToken = encodeURIComponent(
                await saltAndHashPassword(
                    process.env.VERIFY_STRING + Math.random().toString()
                )
            );
            user.forgotPasswordTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
            await user.save();
        }
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                subject: `Reset your password`,
                message: {
                    name: user.name,
                    resetLink: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${user.forgotPasswordToken}`,
                    contactEmail: user.email,
                },
                type: 'reset',
            }),
        });
        return user.forgotPasswordToken;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updatePassword(token, password) {
    if (!token || !password) return;
    console.log(token + ' ' + password);
    try {
        await connectDB();
        const user = await userModels.findOne({
            forgotPasswordToken: token,
        });
        if (user && user.forgotPasswordTokenExpiry >= Date.now()) {
            user.password = await saltAndHashPassword(password);
            await user.save();
            return true;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserById(id) {
    try {
        await connectDB();
        const user = await userModels.findById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Function to update a user by ID
export async function userEventRegistration(
    email,
    registrationDetails,
    userDetails
) {
    try {
        await connectDB();
        // Update the user by ID using the User model
        let user = await userModels.findOne({ email: email });
        if (user) {
            user.events.push(registrationDetails.events);
            user.phoneNumber = userDetails.phone;
            user.address = userDetails.address;
            user.city = userDetails.city;
            user.dateOfBirth = userDetails.dob;
            user.gender = userDetails.gender;
            user.postalCode = userDetails.postalCode;
            user.stateOrProvince = userDetails.state;
            user.country = userDetails.country;
            user.linkedInOrGithub = userDetails.profile;
            user.agreeToTerms = userDetails.terms === 'on' ? true : false;

            await user.save();
        }

        // Return the updated user
        return JSON.stringify(user);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
