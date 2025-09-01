import React from 'react';
import Link from 'next/link';

const SponsorSection = () => {
    return (
        <section className="relative h-[40vh] w-screen overflow-hidden bg-neutral-950 flex flex-col items-center justify-center text-center">
            {/* Animated Gradient Blobs */}
            <div className="absolute inset-0 blur-3xl opacity-50 [filter:url(#blurMe)_blur(60px)]">
                <div
                    className="absolute w-[70%] h-[70%] top-[15%] left-[15%] animate-first 
                    bg-[radial-gradient(circle_at_center,rgba(18,113,255,0.5)_0%,transparent_70%)] 
                    mix-blend-screen
                    [-webkit-mask-image:radial-gradient(circle,white,transparent)]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-position:center]
                    [-webkit-mask-size:contain]"
                ></div>
                <div
                    className="absolute w-[70%] h-[70%] top-[15%] left-[15%] animate-second 
                    bg-[radial-gradient(circle_at_center,rgba(221,74,255,0.6)_0%,transparent_70%)] 
                    mix-blend-screen
                    [-webkit-mask-image:radial-gradient(circle,white,transparent)]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-position:center]
                    [-webkit-mask-size:contain]"
                ></div>
                <div
                    className="absolute w-[70%] h-[70%] top-[15%] left-[15%] animate-third 
                    bg-[radial-gradient(circle_at_center,rgba(100,220,255,0.5)_0%,transparent_70%)] 
                    mix-blend-screen
                    [-webkit-mask-image:radial-gradient(circle,white,transparent)]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-position:center]
                    [-webkit-mask-size:contain]"
                ></div>
                <div
                    className="absolute w-[70%] h-[70%] top-[15%] left-[15%] animate-fourth 
                    bg-[radial-gradient(circle_at_center,rgba(200,50,50,0.5)_0%,transparent_70%)] 
                    mix-blend-screen
                    [-webkit-mask-image:radial-gradient(circle,white,transparent)]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-position:center]
                    [-webkit-mask-size:contain]"
                ></div>
                <div
                    className="absolute w-[70%] h-[70%] top-[15%] left-[15%] animate-fifth 
                    bg-[radial-gradient(circle_at_center,rgba(180,180,50,0.5)_0%,transparent_70%)] 
                    mix-blend-screen
                    [-webkit-mask-image:radial-gradient(circle,white,transparent)]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-position:center]
                    [-webkit-mask-size:contain]"
                ></div>
            </div>

            {/* Centered Content */}
            <div className="w-full h-full flex flex-col justify-center items-center gap-5 relative">
                <div className="relative flex flex-col items-center justify-center space-y-8">
                    <h1 className="bg-clip-text text-transparent drop-shadow-lg bg-gradient-to-b from-white/90 to-white/30 text-2xl md:text-4xl lg:text-6xl font-bold">
                        Ready to{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300">
                            Innovate?
                        </span>
                    </h1>
                    <p className="text-white/80 max-w-2xl mx-auto mb-12">
                        Join hundreds of developers, designers, and
                        entrepreneurs in the ultimate tech challenge. Your next
                        breakthrough starts here.
                    </p>
                </div>
                {/* Button */}
                <div className="flex items-center justify-center lg:justify-start">
                    <span className="relative inline-block overflow-hidden rounded-full p-[2px]">
                        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#6366f1_50%,#b27ce6_100%)]"></span>
                        <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-900/90 dark:bg-gray-950 text-sm sm:text-base font-medium backdrop-blur-3xl">
                            <Link
                                href="/events"
                                className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-purple-400/30 via-indigo-500/40 to-transparent dark:from-purple-400/20 dark:via-indigo-500/30 text-white border border-purple-500/40 hover:from-purple-400/50 hover:via-indigo-500/60 transition-all py-3 px-6 sm:py-4 sm:px-10"
                            >
                                Register Now - It&apos;s Free
                            </Link>
                        </div>
                    </span>
                </div>
                <p className="text-white/80 text-xs max-w-2xl mx-auto mb-12">
                    Registration closes August 25, 2026
                </p>
            </div>

            {/* SVG Blur Filter */}
            <svg className="hidden">
                <defs>
                    <filter id="blurMe">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="10"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  
                                    0 1 0 0 0  
                                    0 0 1 0 0  
                                    0 0 0 18 -8"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
        </section>
    );
};

export default SponsorSection;
