import Razorpay from 'razorpay';

let instance;

export const getRazorpayInstance = () => {
    if (
        !process.env.RAZORPAY_KEY_ID ||
        !process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET
    ) {
        throw new Error('Razorpay keys are not defined');
    }

    if (!instance) {
        instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
        });
    }

    return instance;
};
