// api to create query

import { NextResponse } from 'next/server';

const { deleteQuery } = require('@/src/serverAction/queryAction');

export async function POST(req) {
    const request = await req.json();
    try {
        await deleteQuery(request.id);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
