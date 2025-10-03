import Link from 'next/link';
const { updateVerifyUser } = require('@/src/serverAction/userAction');

export default async function Page({ params }) {
    const { tokens } = await params;

    if (!tokens?.[0]) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
                <div className="max-w-md w-full text-center bg-neutral-900 p-8 rounded-lg shadow-lg border border-neutral-800">
                    <h1 className="text-2xl font-bold text-red-500">
                        ❌ Invalid Token
                    </h1>
                    <Link
                        href="/login"
                        className="inline-block mt-4 px-6 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors duration-200 text-white font-medium"
                    >
                        Back to Login
                    </Link>
                </div>
            </main>
        );
    }

    const { success, message } = await updateVerifyUser(tokens[0]);

    if (success) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
                {/* Meta refresh triggers redirect after 5 seconds */}
                <meta httpEquiv="refresh" content="5;url=/verify" />
                <div className="max-w-md w-full space-y-6 text-center bg-neutral-900 p-8 rounded-lg shadow-lg border border-neutral-800">
                    <h1 className="text-2xl font-bold text-green-400">
                        ✅ Verification Successful
                    </h1>
                    <p className="text-neutral-300">
                        You are good to go! {message}
                    </p>
                    <div className="text-sm text-neutral-400">
                        Redirecting you to login page in 5 seconds...
                    </div>
                    <Link
                        href="/login"
                        className="inline-block mt-4 px-6 py-2 rounded-md bg-green-600 hover:bg-green-500 transition-colors duration-200 text-white font-medium"
                    >
                        Click here to login
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4">
            <div className="max-w-md w-full space-y-4 text-center bg-neutral-900 p-8 rounded-lg shadow-lg border border-neutral-800">
                <h1 className="text-2xl font-bold text-red-500">
                    ❌ Verification Failed
                </h1>
                <p className="text-neutral-300">
                    Something went wrong, {message}
                </p>
                <Link
                    href="/login"
                    className="inline-block mt-4 px-6 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors duration-200 text-white font-medium"
                >
                    Back to Login
                </Link>
            </div>
        </main>
    );
}
