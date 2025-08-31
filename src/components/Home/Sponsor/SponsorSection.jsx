import React from 'react';
import LogoCarousel from './LogoCarousel';

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
            <div className="w-full h-full flex flex-col justify-center items-center gap-10 relative">
                <div className="relative flex flex-col items-center justify-center space-y-12">
                    <h1 className="bg-clip-text text-transparent drop-shadow-lg bg-gradient-to-b from-white/90 to-white/30 text-2xl md:text-4xl lg:text-6xl font-bold">
                        Our Industry Sponsors
                    </h1>
                </div>
                <LogoCarousel />
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
