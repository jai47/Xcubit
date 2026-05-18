'use client';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

export default function GoogleLoginButton() {
    return (
        <button
            onClick={() => {
                toast('Redirecting to Google...');
                signIn('google', { callbackUrl: '/' });
            }}
            className="w-full sm:w-3/5 hover:bg-gray-50 border border-background py-3 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 dark:border-primary dark:hover:bg-muted"
        >
            <FcGoogle size={25} />
            <span>Continue with Google</span>
        </button>
    );
}
