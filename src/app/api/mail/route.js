import { sendEmail } from '@/src/utils/Email/sendEmail';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, subject, message, image, type } = body;

        const response = await sendEmail({
            email,
            subject,
            message,
            image,
            type,
        });

        if (!response.success) {
            return new Response(JSON.stringify(response), { status: 500 });
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Email sent successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal Server Error',
            },
            { status: 500 }
        );
    }
}
