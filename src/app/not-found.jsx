'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="relative flex h-screen w-screen flex-col items-center justify-center bg-neutral-950 text-white">
            {/* Background 404 Text */}
            <h1
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[35rem] font-bold text-neutral-900/50"
            >
                404
            </h1>

            <div className="z-[1] flex flex-col items-center text-center">
                <h2 className="mb-4 text-5xl font-bold">We lost this page</h2>
                <p className="mb-8 max-w-sm text-lg text-neutral-400">
                    The page you are looking for doesn&apos;t exist or has been
                    moved.
                </p>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="rounded-md bg-neutral-50 px-4 py-2 font-semibold text-neutral-950 transition-colors hover:bg-neutral-200"
                    >
                        &larr; Go back
                    </button>
                    <Link
                        href="/"
                        className="rounded-md border border-gray-700 bg-black px-4 py-2 font-semibold text-neutral-50 transition-colors hover:bg-neutral-800"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
