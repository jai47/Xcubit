// app/signin/page.jsx
import { auth } from '@/src/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import GoogleLoginButton from '@/src/components/Auth/GoogleLoginButton';
import SignInForm from '@/src/components/Auth/Signin/SigninForm';

export default async function SignInPage() {
    const session = await auth();

    // SSR redirect for authenticated users
    if (session?.user) {
        redirect('/');
    }

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen dark:bg-background dark:text-primary transition-all duration-500">
            {/* LEFT SIDE */}
            <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col">
                <div className="flex justify-end gap-1 text-sm">
                    <span>Already have an account?</span>
                    <Link
                        href="/login"
                        className="underline text-main font-medium"
                    >
                        Login
                    </Link>
                </div>

                <div className="flex flex-col justify-center w-full px-6 md:px-10 mt-8 md:mt-32">
                    <h1 className="text-3xl font-black text-center lg:text-left">
                        Create your account
                    </h1>

                    <div className="mt-10 mb-12 w-full flex justify-center">
                        <GoogleLoginButton />
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center my-4 text-sm dark:text-muted">
                        <div className="w-2/5 border-t border-gray-300"></div>
                        <span className="mx-4">OR</span>
                        <div className="w-2/5 border-t border-gray-300"></div>
                    </div>

                    <SignInForm />
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div
                style={{
                    background:
                        'url(https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className="hidden lg:block w-full lg:w-1/2 rounded-2xl"
            />
        </div>
    );
}
