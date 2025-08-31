const { NextResponse, NextRequest } = require('next/server');
import { getRazorpayInstance } from '@/src/lib/razorpay';

export async function POST(req) {
    try {
        const request = await req;
        const { amount, currency } = await request?.json();
        const options = {
            amount: amount,
            currency,
            receipt: `vief-${Date.now()}-${Math.random()
                .toString()
                .substring(7)}-receipt`,
        };
        const razorpay = await getRazorpayInstance();
        const response = await razorpay.orders.create(options);
        return NextResponse.json({ order: response }, { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({
            error: 'Failed to create order',
        });
    }
}
