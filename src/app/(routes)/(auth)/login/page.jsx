// app/login/page.jsx
import { auth } from '@/src/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import LoginForm from '@/src/components/Auth/Login/LoginForm';
import GoogleLoginButton from '@/src/components/Auth/GoogleLoginButton';

export default async function Login() {
    const session = await auth();
    const user = session?.user;

    if (user) {
        redirect('/');
    }

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen dark:bg-background dark:text-primary">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col">
                <div className="flex justify-end gap-1">
                    <span>Don&apos;t have an account?</span>
                    <Link href="/signin" className="underline">
                        Sign in
                    </Link>
                </div>

                {/* Login Form Section */}
                <div className="flex flex-col justify-center w-full px-6 md:px-10 mt-8 md:mt-32">
                    <h1 className="text-3xl font-black text-center lg:text-left">
                        Login
                    </h1>

                    {/* Google Login */}
                    <div className="flex justify-center my-5">
                        <GoogleLoginButton />
                    </div>
                    {/* OR Divider */}
                    <div className="flex items-center justify-center my-4 text-sm dark:text-muted">
                        <div className="w-2/5 border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-300">OR</span>
                        <div className="w-2/5 border-t border-gray-300"></div>
                    </div>

                    {/* Email/Password Login */}
                    <LoginForm />
                </div>
            </div>

            {/* Right Background Section */}
            <div
                style={{
                    background:
                        'url(https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className="hidden lg:block bg-slate-100 w-full lg:w-1/2"
            ></div>
        </div>
    );
}
