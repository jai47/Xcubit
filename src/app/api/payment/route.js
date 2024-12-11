const { NextResponse, NextRequest } = require('next/server');
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
    console.log({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
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

        const response = await razorpay.orders.create(options);
        return NextResponse.json({ order: response }, { status: 200 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({
            error: 'Failed to create order',
        });
    }
}
