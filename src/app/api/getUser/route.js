import { auth } from '@/auth';
import { getUserFromDB } from '@/src/serverAction/userAction';
import { NextResponse } from 'next/server';

export const POST = auth(async function POST(req) {
    if (!req) {
        return NextResponse.json(
            { message: 'Structure is incorrect' },
            { status: 400 }
        );
    }
    if (!req.auth)
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        );

    let reqBody = await req?.json();

    if (!reqBody.email) {
        return NextResponse.json(
            { message: 'Email is required' },
            { status: 400 }
        );
    }
    const user = await getUserFromDB(reqBody.email);
    if (user) {
        return NextResponse.json({ user: user }, { status: 200 });
    }
});

// export async function POST(req) {
//     if (!req) {
//         return NextResponse.json(
//             { message: 'Structure is incorrect' },
//             { status: 400 }
//         );
//     }

//     let reqBody = await req?.json();

//     if (!reqBody.email) {
//         return NextResponse.json(
//             { message: 'Email is required' },
//             { status: 400 }
//         );
//     }
//     const user = await getUserFromDB(reqBody.email);
//     return NextResponse.json({ user: user }, { status: 200 });
// }
