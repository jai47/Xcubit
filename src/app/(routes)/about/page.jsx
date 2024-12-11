'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AboutUs = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gray-800 text-white relative">
            {/* Logo Section */}
            <div className="absolute top-6 left-6 z-10 space-y-4">
                {/* Logo */}
                <Image
                    src="/logo/logo.png" // Replace with your logo's path
                    alt="Vastav Intellect Logo"
                    width={160} // Adjust dimensions based on your design
                    height={160}
                    priority // Ensures the image loads faster for improved LCP
                    className="mb-8"
                />

                {/* About Us Title */}
                <div className="text-left ml-12 pl-16">
                    <h1 className="text-5xl font-bold mb-2">About Us</h1>
                    <div className="h-[2px] w-20 bg-white"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="absolute top-1/3 left-1/2  z-20 text-left space-y-6 px-6 lg:px-20 max-w-3xl">
                <h2 className="text-3xl font-semibold tracking-wide text-white mb-4">
                    WE ARE A DIGITAL PRODUCTION TEAM.
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                    Vastav Intellect IP Solutions is a professional law firm
                    specializing in intellectual property rights, market
                    research, and prototyping. Since 2019, we have helped
                    clients safeguard and grow their business in the competitive
                    legal landscape.
                </p>
                <button
                    onClick={() => router.push('/contact')}
                    className="bg-orange-500 text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-orange-600 transition-all"
                >
                    Contact Us
                </button>
            </div>
        </div>
    );
};

export default AboutUs;
