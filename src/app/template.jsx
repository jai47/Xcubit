'use client';

import { animatePageIn } from '../utils/animations';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';

const TemplateComponent = ({ children }) => {
    useGSAP(() => {
        animatePageIn(); // Page transition animation
    }, []);

    return (
        <div className="w-screen h-screen absolute top-0 z-40">
            {/* Gradient Glassmorphism Banners (hidden on mobile) */}
            <div
                id="banner-1"
                className="min-h-screen z-10 fixed top-0 left-0 w-1/4 hidden md:block 
                bg-gradient-to-b from-purple-500/20 via-indigo-500/10 to-transparent
                backdrop-blur-xl "
            />
            <div
                id="banner-2"
                className="min-h-screen z-10 fixed top-0 left-1/4 w-1/4 hidden md:block 
                bg-gradient-to-b from-indigo-500/20 via-blue-500/10 to-transparent
                backdrop-blur-xl "
            />
            <div
                id="banner-3"
                className="min-h-screen z-10 fixed top-0 left-2/4 w-1/4 hidden md:block 
                bg-gradient-to-b from-blue-500/20 via-teal-400/10 to-transparent
                backdrop-blur-xl "
            />
            <div
                id="banner-4"
                className="min-h-screen z-10 fixed top-0 left-3/4 w-1/4 hidden md:block 
                bg-gradient-to-b from-teal-400/20 via-purple-400/10 to-transparent
                backdrop-blur-xl"
            />

            {/* Page Content */}
            {children}
        </div>
    );
};

export default dynamic(() => Promise.resolve(TemplateComponent), {
    ssr: false,
});
