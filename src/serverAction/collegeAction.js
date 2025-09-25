'use server';

import { connectDB } from '../lib/mongodb';
import { collegeModels } from '../models/colleges';

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
        console.log({ college, URL: contractUrl });
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
