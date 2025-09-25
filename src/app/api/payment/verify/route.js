import { NextResponse } from 'next/server';

const { auth } = require('@/src/auth');

export const POST = auth(async (req) => {
    if (!req.auth) {
        return NextResponse.json({});
    }
});
