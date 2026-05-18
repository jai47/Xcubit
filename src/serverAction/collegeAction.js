'use server';

import { connectDB } from '../lib/mongodb';
import { collegeModels } from '../models';

//for /admin to fetch all the colleges
export async function fetchAllInstitutes() {
    try {
        await connectDB();
        const colleges = await collegeModels.find({});
        if (!colleges)
            return {
                success: false,
                message: 'Cant able to fetch colleges at this moment',
            };
        return {
            success: true,
            data: JSON.parse(JSON.stringify(colleges)),
        };
    } catch (error) {
        return {
            success: false,
            message: 'Internal Server error',
        };
    }
}

//for /admin create new college
export async function createNewCollege(data) {
    try {
        await connectDB();
        const newCollege = await collegeModels.create(data);
        if (!newCollege) {
            return {
                success: false,
                message: 'Cannot create new institute right now',
            };
        }
        return { success: true, data: JSON.parse(JSON.stringify(newCollege)) };
    } catch (error) {
        return { success: false, message: 'Internal server error' };
    }
}

// for /institutes to fetch institute related to current admin email
export async function fetchInstituteByAdminEmail(email) {
    if (!email) {
        return {
            success: false,
            message: 'email is not provided',
        };
    }

    try {
        await connectDB();

        const college = await collegeModels.findOne({ adminUserEmail: email });

        if (!college) {
            return {
                success: false,
                message: 'No institute registered with current email',
            };
        }

        return {
            success: true,
            data: college,
        };
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
}

export async function updateCollegeAdmin(id, update) {
    if (!id || !update || Object.keys(update).length === 0) {
        return {
            success: false,
            message: 'College ID or update data not provided or empty.',
        };
    }

    try {
        await connectDB();

        const allowedFields = [
            'name',
            'logo',
            'address',
            'city',
            'state',
            'phone',
            'website',
            'verified',
            'approval',
            'postEventImages',
            'national',
            'contract',
            'adminUserEmail',
        ];

        const sanitizedUpdate = Object.fromEntries(
            Object.entries(update).filter(([key]) =>
                allowedFields.includes(key)
            )
        );

        if (Object.keys(sanitizedUpdate).length === 0) {
            return {
                success: false,
                message: 'No valid fields provided for update.',
            };
        }

        const updatedCollege = await collegeModels.findByIdAndUpdate(
            id,
            { $set: sanitizedUpdate },
            { new: true, runValidators: true, sanitizeFilter: true }
        );

        if (!updatedCollege) {
            return { success: false, message: 'College not found.' };
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updatedCollege)),
            message: 'College updated successfully.',
        };
    } catch (error) {
        console.error('Error updating college:', error);
        return {
            success: false,
            message: error.message || 'Server error.',
        };
    }
}

// update college data, used in /institute?section=College Info
export async function updateCollege(email, update) {
    if (!email || !update || Object.keys(update).length === 0) {
        return {
            success: false,
            message: 'Email or update data not provided or empty.',
        };
    }

    try {
        await connectDB();

        // Make sure college exists
        const existingCollege = await collegeModels.findOne({
            adminUserEmail: email,
        });
        if (!existingCollege) {
            return { success: false, message: 'College not found.' };
        }

        // Define safe, allowed fields for update
        const allowedFields = [
            'name',
            'logo',
            'address',
            'city',
            'state',
            'phone',
            'website',
            'verified',
            'approval',
            'postEventImages',
            'national',
        ];

        // Sanitize update object
        const sanitizedUpdate = Object.fromEntries(
            Object.entries(update).filter(
                ([key]) =>
                    allowedFields.includes(key) && key !== 'adminUserEmail'
            )
        );

        if (Object.keys(sanitizedUpdate).length === 0) {
            return {
                success: false,
                message: 'No valid fields provided for update.',
            };
        }

        // Perform atomic update and return new document
        const updatedCollege = await collegeModels.findOneAndUpdate(
            { adminUserEmail: email },
            { $set: sanitizedUpdate },
            { new: true, runValidators: true }
        );

        if (!updatedCollege) {
            return {
                success: false,
                message: 'College not found after update attempt.',
            };
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updatedCollege)),
            message: 'College updated successfully.',
        };
    } catch (error) {
        console.error('Error updating college:', error);
        return {
            success: false,
            message: error.message || 'Server error.',
        };
    }
}

// for /institute to update the contract url in document
export async function updateCollegeContract(email, contractUrl) {
    if (!email || !contractUrl) {
        return {
            success: false,
            message: 'Email or contractUrl not provided',
        };
    }

    try {
        await connectDB();

        const college = await collegeModels.findOne({ adminUserEmail: email });
        if (!college) {
            return { success: false, message: 'College not found' };
        }
        college.contract = contractUrl; // add a new field in schema if not exists
        await college.save();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(college)),
            message: 'Contract Uploaded',
        };
    } catch (error) {
        return { success: false, message: error.message || 'Server error' };
    }
}

// for verify/college to set verify feild to true
export async function verifyCollegeAndEmail(email, token) {
    if (!email || !token) {
        return {
            success: false,
            message: 'Email or token not provided',
        };
    }

    try {
        await connectDB();

        // Find the college by token and email
        const college = await collegeModels.findOne({
            verifyToken: token,
            adminUserEmail: email,
        });

        if (!college) {
            return {
                success: false,
                message: 'No institute found with the provided email and token',
            };
        }

        // Update verified status and optionally clear the token
        college.verified = true;
        college.verifyToken = ''; // optionally clear the token after verification

        await college.save();

        return {
            success: true,
            data: college,
            message: 'College verified successfully',
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Server error',
        };
    }
}
