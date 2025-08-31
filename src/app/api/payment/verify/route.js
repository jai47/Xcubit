import { NextResponse } from 'next/server';

const { auth } = require('@/auth');

export const POST = auth(async (req) => {
    if (!req.auth) {
        return NextResponse.json({});
    }
});
