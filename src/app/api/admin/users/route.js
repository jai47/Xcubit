//api call to create event
import { auth } from '@/src/auth';
import {
    changeRole,
    deleteUser,
    getAllUsers,
} from '@/src/serverAction/userAction';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await auth();

    if (session?.role !== 'admin') {
        return NextResponse.json(
            {
                success: false,
                message: 'Not authorized',
            },
            { status: 405 }
        );
    }
    try {
        const data = await getAllUsers();
        return NextResponse.json(
            { data: data, success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        let request = await req.json();
        if (!request.request) {
            return NextResponse.json(
                { success: false, data: 'Invalid request' },
                { status: 400 }
            );
        }
        if (request.request === 'changeRole') {
            const res = await changeRole(request.id, request.role);
            return NextResponse.json(
                { data: res.message, success: true },
                { status: 200 }
            );
        } else if (request.request === 'deleteUser') {
            const data = await deleteUser(request.id);
            return NextResponse.json(
                { data: data, success: true },
                { status: 200 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
