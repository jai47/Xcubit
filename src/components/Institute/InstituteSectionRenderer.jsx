'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import CollegeInfo from '@/src/components/Institute/CollegeInfo/CollegeInfo';

const InstituteSectionRenderer = ({ college }) => {
    const searchParams = useSearchParams();
    const currentSection = searchParams.get('section') || 'College Info';

    const renderSection = () => {
        switch (currentSection) {
            case 'College Info':
                return <CollegeInfo college={college} />;
            case 'My Event':
                return (
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 dark:text-gray-300">
                            Create Event form goes here.
                        </p>
                    </div>
                );
            case 'Submit Teams':
                return (
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 dark:text-gray-300">
                            Submit Teams form goes here.
                        </p>
                    </div>
                );
            case 'Report':
                return (
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                        <p className="text-gray-600 dark:text-gray-300">
                            Reports and analytics go here.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="flex-1 bg-gray-200 dark:bg-slate-900 p-4 overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {currentSection}
            </h1>
            {renderSection()}
        </section>
    );
};

export default InstituteSectionRenderer;
