import { redirect } from 'next/navigation';
import { auth } from '@/src/auth';
import { verifyCollegeAndEmail } from '@/src/serverAction/collegeAction';
import Button from '@/src/components/Button';
import Link from 'next/link';

export default async function Page({ params }) {
    const { tokens } = params;
    const session = await auth();

    if (!session) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4">
                <div className="bg-neutral-900 p-8 rounded-lg shadow-lg max-w-md text-center">
                    <h1 className="text-2xl font-semibold text-white mb-4">
                        Access Denied
                    </h1>
                    <p className="text-neutral-300 mb-6">
                        You need to be logged in to perform this action.
                    </p>
                    <Link href="/login">
                        <Button text="Login Instead" />
                    </Link>
                </div>
            </div>
        );
    }

    if (!tokens?.[0]) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4">
                <div className="bg-neutral-900 p-8 rounded-lg shadow-lg max-w-md text-center">
                    <h1 className="text-2xl font-semibold text-red-500 mb-4">
                        Invalid Link
                    </h1>
                    <p className="text-neutral-300 mb-6">
                        The verification link is missing or invalid. Please
                        check your email for the correct link.
                    </p>
                    <Link href="/">
                        <Button text="Go back to Home" />
                    </Link>
                </div>
            </div>
        );
    }

    const res = await verifyCollegeAndEmail(session.user.email, tokens[0]);

    if (res.success) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4">
                <div className="bg-neutral-900 p-8 rounded-lg shadow-lg max-w-md text-center">
                    <h1 className="text-2xl font-semibold text-green-500 mb-4">
                        Verification Successful!
                    </h1>
                    <p className="text-neutral-300 mb-6">
                        Your email is now verified with your college. You can
                        now create and manage events through your dashboard.
                    </p>
                    <Link href="/institute">
                        <Button text="Go to Dashboard" />
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4">
                <div className="bg-neutral-900 p-8 rounded-lg shadow-lg max-w-md text-center">
                    <h1 className="text-2xl font-semibold text-red-500 mb-4">
                        Verification Failed
                    </h1>
                    <p className="text-neutral-300 mb-6">
                        It seems you&apos;re logged in with a different email.
                        Please log in with the email provided in the
                        verification email.
                    </p>
                    <Link href="/">
                        <Button text="Go back to Home" />
                    </Link>
                </div>
            </div>
        );
    }
}
