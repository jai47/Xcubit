// pages/api/colleges.js (Next.js API Route)

import { auth } from '@/src/auth';
import { connectDB } from '@/src/lib/mongodb';
import { collegeModels } from '@/src/models/colleges';
import { NextResponse } from 'next/server';

//fetch all colleges
export async function GET() {
    try {
        await connectDB();
        const colleges = await collegeModels.find(
            {},
            'name address website city state logo'
        );
        return NextResponse.json({
            data: colleges,
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.status(500).json({
            error: 'Failed to fetch events',
        });
    }
}
