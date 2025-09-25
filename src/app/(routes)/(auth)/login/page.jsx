import { auth } from '@/src/auth';
import { loginCred, loginGoogle } from '@/src/serverAction/authAction';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default async function Login() {
    const session = await auth();
    const user = session?.user;

    if (user) {
        redirect('/');
    }

    return (
        <>
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
                        <form
                            action={async () => {
                                'use server';
                                await loginGoogle();
                            }}
                            className="mt-10 mb-12 w-full flex justify-center"
                        >
                            <button
                                type="submit"
                                className="w-full sm:w-3/5 hover:bg-gray-50 border border-background py-3 rounded-full flex items-center justify-center space-x-3 transition-all duration-300 dark:border-primary dark:hover:bg-muted"
                            >
                                <FcGoogle size={25} />
                                <span>Continue with Google</span>
                            </button>
                        </form>

                        {/* OR Divider */}
                        <div className="flex items-center justify-center my-4 text-sm dark:text-muted">
                            <div className="w-2/5 border-t border-gray-300"></div>
                            <span className="mx-4">OR</span>
                            <div className="w-2/5 border-t border-gray-300"></div>
                        </div>

                        {/* Email/Password Login */}
                        <form
                            action={async (formData) => {
                                'use server';
                                await loginCred(formData);
                            }}
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
                                    className="w-full h-[50px] bg-main text-white py-2 rounded-full transition-all duration-300 dark:bg-background dark:hover:bg-main dark:border dark:border-primary"
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
