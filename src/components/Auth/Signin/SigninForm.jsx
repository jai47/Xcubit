'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { userFormAction } from '@/src/serverAction/userAction';
import confetti from 'canvas-confetti';
export default function SignInForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const { success, message } = await userFormAction(formData);

            if (success) {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    ticks: 200,
                    scalar: 1.2,
                    colors: [
                        '#FF5F6D',
                        '#FFC371',
                        '#4ECDC4',
                        '#45B649',
                        '#96C93D',
                    ],
                });
                toast.success(
                    '🎉 Account created! Check your email to verify.'
                );
                setTimeout(() => router.push('/login'), 2000);
            } else {
                toast.error(message || 'Signup failed. Try again.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong. Try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSignup}
            className="mt-10 mb-12 w-full flex flex-col justify-center items-center gap-6"
        >
            <div className="flex w-full sm:w-3/5 flex-col relative">
                <label
                    htmlFor="name"
                    className="absolute top-[-10px] left-3 px-1 text-sm bg-primary dark:bg-background dark:text-primary"
                >
                    What should we call you?
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="E.g. John Doe"
                    required
                    className="w-full px-4 py-3 outline-none border border-muted rounded-lg dark:bg-background dark:text-primary"
                />
            </div>

            <div className="flex w-full sm:w-3/5 flex-col relative">
                <label
                    htmlFor="email"
                    className="absolute top-[-10px] left-3 px-1 text-sm bg-primary dark:bg-background dark:text-primary"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 outline-none border border-muted rounded-lg dark:bg-background dark:text-primary"
                />
            </div>

            <div className="flex w-full sm:w-3/5 flex-col relative">
                <label
                    htmlFor="password"
                    className="absolute top-[-10px] left-3 px-1 text-sm bg-primary dark:bg-background dark:text-primary"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 outline-none border border-muted rounded-lg dark:bg-background dark:text-primary"
                />
            </div>

            <div className="w-full md:w-3/5">
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full h-[50px] bg-main text-black py-2 rounded-full transition-all duration-300 ${
                        loading
                            ? 'opacity-70 cursor-not-allowed'
                            : 'hover:opacity-90 dark:bg-background dark:hover:bg-main dark:border dark:border-primary'
                    }`}
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>
            </div>
        </form>
    );
}
