'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false, // prevents auto navigation
        });

        setLoading(false);

        if (res?.error) {
            toast.error('Invalid credentials'); // ✅ Toast appears client-side
        } else {
            toast.success('Login successful');
            router.push('/dashboard');
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-10 mb-12 w-full flex flex-col justify-center items-center gap-6"
        >
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

            <div className="w-full sm:w-3/5">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[50px] bg-main text-black py-2 rounded-full transition-all duration-300 dark:bg-background dark:hover:bg-main dark:border dark:border-primary"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </form>
    );
}
