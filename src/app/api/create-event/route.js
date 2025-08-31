//api call to create event

import { eventFormAction } from '@/src/serverAction/eventAction';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const formData = await req.json();
    try {
        await eventFormAction(formData);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
