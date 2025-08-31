// api to create query

import { NextResponse } from 'next/server';

const {
    queryFormAction,
    getAllQuery,
} = require('@/src/serverAction/queryAction');

export async function POST(req) {
    const formData = await req.json();
    console.log(formData);
    try {
        await queryFormAction(formData);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const query = await getAllQuery();
        return NextResponse.json(query, { status: 200 });
    } catch (e) {
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 }
        );
    }
}
