'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from '../Image';
const MultiSection = ({ details, sponsors }) => {
    const searchParams = useSearchParams();
    const querySection = searchParams.get('section') || 'Details';

    // Define the content for each section
    const renderSectionContent = () => {
        switch (querySection) {
            case 'Details':
                return (
                    <div className="mt-6">
                        {Array.isArray(details) && details.length > 0 ? (
                            details.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="leading-relaxed text-sm sm:text-base mb-4"
                                    dangerouslySetInnerHTML={{
                                        __html: paragraph,
                                    }}
                                ></p>
                            ))
                        ) : (
                            <p className="text-background text-sm sm:text-base">
                                No details available.
                            </p>
                        )}
                    </div>
                );
            case 'Sponsors':
                return (
                    <div className="mt-8">
                        {sponsors && sponsors.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {sponsors.map((sponsor, index) => (
                                    <Link
                                        href={sponsor.link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={index}
                                        className="flex flex-col items-center p-6 transition-transform transform hover:scale-105 hover:shadow-xl rounded-xl border border-gray-200"
                                    >
                                        <Image
                                            src={sponsor.image?.thumbnailUrl}
                                            alt={`${sponsor.name} logo`}
                                            width={100}
                                            height={100}
                                            className="w-28 h-28 object-contain mb-6 rounded-lg shadow-md"
                                        />
                                        <p className="text-gray-800 dark:text-primary text-base font-semibold text-center">
                                            {sponsor.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400 text-base text-center font-medium">
                                No sponsors available at the moment.
                            </p>
                        )}
                    </div>
                );
            default:
                return (
                    <p className="text-sm sm:text-base">Section not found.</p>
                );
        }
    };

    return (
        <div className="mt-8 px-4 sm:px-6 lg:px-16">
            <div className="border-b">
                <div className="flex flex-wrap gap-4 sm:gap-6">
                    <Link
                        href="?section=Details"
                        scroll={false}
                        className={`font-bold pb-2 ${
                            querySection === 'Details'
                                ? 'text-background border-b-2 border-background dark:text-primary'
                                : 'text-gray-600 hover:text-gray-500'
                        }`}
                    >
                        Details
                    </Link>
                    {sponsors && (
                        <Link
                            href="?section=Sponsors"
                            scroll={false}
                            className={`font-bold pb-2 ${
                                querySection === 'Sponsors'
                                    ? 'text-background border-b-2 border-background dark:text-primary'
                                    : 'text-gray-600 hover:text-gray-500'
                            }`}
                        >
                            Sponsors
                        </Link>
                    )}
                </div>
            </div>
            {renderSectionContent()}
        </div>
    );
};

export default MultiSection;
