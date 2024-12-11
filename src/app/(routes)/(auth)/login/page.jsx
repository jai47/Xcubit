import { auth } from '@/app/auth';
import Navbar from '@/components/layout/Navbar';
import { loginCred, loginGoogle, logout } from '@/serverAction/authAction';
import { redirect } from 'next/dist/server/api-utils';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default async function Login() {
    const session = await auth();
    const user = session?.user;

    if (user) {
        return (
            <>
                <Navbar user={user} />
                <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
                    <form
                        action={async () => {
                            'use server';
                            await logout();
                            redirect('/');
                        }}
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                    >
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 mt-4">
                                {user.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white py-2 rounded-lg mt-6 hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row w-full min-h-screen">
                {/* Left Section */}
                <div className="bg-white w-full lg:w-1/2 p-6 lg:p-12 flex flex-col">
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
                        <form
                            action={async () => {
                                'use server';
                                await loginGoogle();
                            }}
                            className="mt-10 mb-12 w-full flex justify-center"
                        >
                            <button
                                type="submit"
                                className="w-full sm:w-3/5 text-black hover:bg-gray-50 border border-black py-3 rounded-full flex items-center justify-center space-x-3 transition-all duration-300"
                            >
                                <FcGoogle size={25} />
                                <span>Continue with Google</span>
                            </button>
                        </form>

                        {/* OR Divider */}
                        <div className="flex items-center justify-center my-4 text-sm text-gray-500">
                            <div className="w-2/5 border-t border-gray-300"></div>
                            <span className="mx-4">OR</span>
                            <div className="w-2/5 border-t border-gray-300"></div>
                        </div>

                        {/* Email/Password Login */}
                        <form
                            action={async (formData) => {
                                'use server';
                                try {
                                    await loginCred(formData);
                                } catch (error) {
                                    console.error(error);
                                }
                            }}
                            className="mt-10 mb-12 w-full flex flex-col justify-center items-center gap-6"
                        >
                            <div className="flex w-full sm:w-3/5 flex-col relative">
                                <label
                                    htmlFor="email"
                                    className="absolute top-[-10px] left-3 bg-white px-1 text-sm"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div className="flex w-full sm:w-3/5 flex-col relative">
                                <label
                                    htmlFor="password"
                                    className="absolute top-[-10px] left-3 bg-white px-1 text-sm"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    className="w-full px-4 py-3 outline-none border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="w-full sm:w-3/5">
                                <button
                                    type="submit"
                                    className="w-full h-[50px] bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-full transition-all duration-300"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Background Section */}
                <div
                    style={{
                        background:
                            'url(https://vief.vercel.app/static/media/bg-landing.181eed223f887d01ee8e.jpeg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    className="hidden lg:block bg-slate-100 w-full lg:w-1/2"
                ></div>
            </div>
        </>
    );
}
