import { getUserFromDB } from '@/serverAction/userAction';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    if (!req) {
        return NextResponse.json(
            { message: 'Structure is incorrect' },
            { status: 400 }
        );
    }

    let reqBody = await req?.json();

    if (!reqBody.email) {
        return NextResponse.json(
            { message: 'Email is required' },
            { status: 400 }
        );
    }
    const user = await getUserFromDB(reqBody.email);
    return NextResponse.json({ user: user }, { status: 200 });
}
