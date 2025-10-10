'use server';
import { connectDB } from '@/src/lib/mongodb';
import { userModels } from '../models/users';
import {
    comparePassword,
    saltAndHashPassword,
} from '@/src/utils/saltAndHashPassword';
import { redirect } from 'next/navigation';
import { sendEmail } from '../utils/Email/sendEmail';

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
        verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
    };
    try {
        const user = await userModels.create(data);
        await user.save();

        const response = await sendEmail({
            email: user.email,
            subject: `Welcome to the community, ${user.name}`,
            message: {
                name: user.name,
                verifyLink: `${process.env.NEXT_PUBLIC_BASE_URL}/verify/user/${user.verifyToken}`,
                contactEmail: 'support@xcubit.in',
            },
            type: 'verify',
        });
        redirect('/login');
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
            verified: true,
            forgotPasswordToken: 'first',
            forgotPasswordTokenExpiry: Date.now(),
            verifyToken: encodeURIComponent(
                await saltAndHashPassword(process.env.VERIFY_STRING + email)
            ),
            verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
        };

        const user = await userModels.create(data);
        await user.save();
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getUserEmailPassword(email, password) {
    try {
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
    } catch (error) {
        console.log(error);
        throw new Error('Error getting user');
    }
}

export async function getUserFromDB(email) {
    try {
        await connectDB();
        const user = await userModels.findOne({ email: email });
        if (!user) {
            return null;
        } else {
            return JSON.parse(JSON.stringify(user));
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

        if (!user) {
            return { success: false, message: 'Invalid verification token' };
        }

        if (user?.verifyTokenExpiry > Date.now()) {
            user.verified = true;
            await user.save();
            return { success: true, message: 'Verification Successful' };
        } else {
            return { success: false, message: 'Verification link expired' };
        }
    } catch (error) {
        return {
            success: false,
            message:
                'Internal Server error, Raise your councern with the support bot',
        };
    }
}

export async function updateForgotPasswordToken(email) {
    try {
        await connectDB();
        const user = await userModels.findOne({ email: email });
        if (user) {
            if (
                user.forgotPasswordTokenExpiry &&
                user.forgotPasswordTokenExpiry >= Date.now()
            ) {
                return {
                    msg: `Forgot password token is still active. Please try again after ${new Date(
                        user.forgotPasswordTokenExpiry
                    ).toLocaleString('hi-IN')} when it expires.`,
                    sucess: false,
                };
            }
            user.forgotPasswordToken = await saltAndHashPassword(
                process.env.VERIFY_STRING + Math.random().toString()
            );

            user.forgotPasswordTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
            await user.save();

            await sendEmail({
                email: user.email,
                subject: `Reset your password`,
                message: {
                    name: user.name,
                    resetLink: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${user.forgotPasswordToken}`,
                    contactEmail: user.email,
                },
                type: 'reset',
            });
        } else {
            return {
                success: false,
                message: 'User not found',
            };
        }

        return {
            msg: 'A password-changing link has been sent to your registered email. Please check your inbox and follow the instructions.',
            sucess: true,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updatePassword(token, password) {
    if (!token || !password) return;
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
        throw new Error(`Unable to update password: ${error.message}`);
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
            user.phoneNumber = userDetails.phoneNumber;
            user.address = userDetails.address;
            user.city = userDetails.city;
            user.dateOfBirth = userDetails.dateOfBirth;
            user.gender = userDetails.gender;
            user.postalCode = userDetails.postalCode;
            user.stateOrProvince = userDetails.stateOrProvince;
            user.country = userDetails.country;
            user.linkedInOrGithub = userDetails.linkedInOrGithub;
            await user.save();
        }

        // Return the updated user
        return true;
    } catch (error) {
        return false;
    }
}

// Function to get all users
export async function getAllUsers() {
    try {
        await connectDB();
        const users = await userModels.find({}).lean(); // Use .lean() to return plain objects
        if (!users) {
            return {
                success: false,
                message: 'Cannot able to fetch all users at the moment',
            };
        }
        return { success: true, data: JSON.parse(JSON.stringify(users)) };
    } catch (error) {
        throw new Error(`Error getting users: ${error.message}`);
    }
}

// Function to change role
export async function changeRole(id, role) {
    try {
        await connectDB();
        console.log(id, role);
        const user = await userModels.findById(id);
        if (user) {
            user.role = role;
            await user.save();
            return { message: 'Role updated', sucess: true };
        }
        return { message: 'Error updating role', sucess: false };
    } catch (error) {
        throw new Error(`Error changing role: ${error.message}`);
    }
}

// Function to delete user
export async function deleteUser(id) {
    try {
        await connectDB();
        const user = await userModels.findByIdAndDelete(id);
        return user;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}

export async function updateUserProfile(userId, formData) {
    await connectDB();
    try {
        const updated = await userModels.findByIdAndUpdate(
            userId,
            { $set: formData },
            { new: true }
        );
        return { success: true, user: JSON.parse(JSON.stringify(updated)) };
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Failed to update user profile' };
    }
}
