'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';

const AboutUs = () => {
    const router = useRouter();
    return (
        <>
            <Navbar />
            <div
                className="min-h-screen bg-gray-700 text-white flex flex-col justify-start items-center pt-16 pb-12 w-full overflow-x-hidden"
                style={{ background: '#525252' }}
            >
                {/* Title Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        About Us
                    </h1>
                    <div className="h-[2px] w-20 sm:w-24 bg-white mx-auto"></div>
                </div>

                {/* Main Content */}
                <div className="px-6 lg:px-12 text-center sm:text-left max-w-full sm:max-w-3xl space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-white mb-4">
                        WE ARE A DIGITAL PRODUCTION TEAM.
                    </h2>
                    <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8">
                        Vastav Intellect IP Solutions is a professional law firm
                        specializing in intellectual property rights, market
                        research, and prototyping. Since 2019, we have helped
                        clients safeguard and grow their business in the
                        competitive legal landscape.
                    </p>
                    <button
                        onClick={() => router.push('/contact')}
                        className="bg-orange-500 text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-orange-600 transition-all"
                    >
                        Contact Us
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
