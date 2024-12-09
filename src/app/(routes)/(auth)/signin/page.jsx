import { auth } from '@/app/auth';
import { userFormAction } from '@/serverAction/userAction';
import { FcGoogle } from 'react-icons/fc';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { signinWithGoogle } from '@/serverAction/authAction';

export default async function SignIn() {
    const session = await auth(); // Check if the user is logged in
    const user = session?.user;
    if (user) {
        redirect('/');
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="bg-white h-screen w-2/4">
                <div className="w-full flex justify-end mt-10 mb-10 px-14 gap-1">
                    <span>Already have an account?</span>
                    <Link href="/login" className="underline">
                        Login
                    </Link>
                </div>
                <div className="flex flex-col h-2/4 justify-center w-full px-10 mt-32">
                    <h1 className="text-3xl font-black">Sign up</h1>
                    <form
                        action={async () => {
                            'use server';
                            await signinWithGoogle();
                        }}
                        className="mt-10 mb-12 w-full flex justify-center"
                    >
                        <button
                            type="submit"
                            className="w-3/5 text-black hover:bg-gray-50 border border-black py-3 rounded-full flex items-center justify-center space-x-3 transition-all duration-300"
                        >
                            <FcGoogle size={25} />
                            <span>Continue with Google</span>
                        </button>
                    </form>
                    <div className="flex items-center justify-center my-4 text-sm text-gray-500">
                        <div className="w-2/5 border-t border-gray-300"></div>
                        <span className="mx-4">OR</span>
                        <div className="w-2/5 border-t border-gray-300"></div>
                    </div>
                    <form
                        action={async (formData) => {
                            'use server';
                            try {
                                await userFormAction(formData);
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                        className="mt-10 mb-12 w-full flex flex-col justify-center items-center gap-10"
                    >
                        <div className="flex w-3/5 h-fit flex-col relative justify-center items-center ">
                            <label
                                htmlFor="name"
                                className="absolute top-[-25%] left-5 bg-white px-1 w-fit"
                            >
                                What should we call you?
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="E.g. John Doe"
                                required
                                className="w-full px-4 py-2 outline-none border border-gray-300 rounded-[10px] h-[55px]"
                            />
                        </div>

                        <div className="flex w-3/5 h-fit flex-col relative justify-center items-center ">
                            <label
                                htmlFor="email"
                                className="absolute top-[-25%] left-5 bg-white px-1 w-fit"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="w-full px-4 py-2 outline-none border border-gray-300 rounded-[10px] h-[55px]"
                            />
                        </div>
                        <div className="flex w-3/5 h-fit flex-col relative justify-center items-center ">
                            <label
                                htmlFor="password"
                                className="absolute top-[-25%] left-5 bg-white px-1 w-fit"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 outline-none border border-gray-300 rounded-[10px] h-[55px]"
                            />
                        </div>
                        <div className="w-3/5">
                            <button
                                type="submit"
                                className="w-2/5 h-[50px] bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-full transition-all duration-300"
                            >
                                CONTINUE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div
                style={{
                    background:
                        'url(https://vief.vercel.app/static/media/bg-landing.181eed223f887d01ee8e.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
                className=" bg-slate-100 h-screen w-2/4 "
            ></div>
        </div>
    );
}
