'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
const MultiSection = ({ details }) => {
    const searchParams = useSearchParams();
    const querySection = searchParams.get('section') || 'Details';

    return (
        <div className="mt-8 px-4 sm:px-6 lg:px-16">
            <div className="flex gap-4 sm:gap-6 border-b pb-2">
                <Link
                    href="?section=Details"
                    scroll={false}
                    className={`px-4 py-2 font-semibold rounded-full transition ${
                        querySection === 'Details'
                            ? 'bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300 text-gray-800'
                            : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50'
                    }`}
                >
                    Details
                </Link>
            </div>
            <div className="mt-6">
                {querySection === 'Details' && (
                    <div
                        className="leading-relaxed text-white text-sm sm:text-base space-y-4"
                        dangerouslySetInnerHTML={{ __html: details }}
                    />
                )}
            </div>
        </div>
    );
};

export default MultiSection;
