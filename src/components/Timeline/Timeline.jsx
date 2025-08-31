'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Timeline = ({ data }) => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const line = lineRef.current;

            gsap.fromTo(
                line,
                { height: 0, opacity: 0 },
                {
                    height: '100%',
                    opacity: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 10%',
                        end: 'bottom 50%',
                        scrub: true,
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full bg-neutral-950 font-sans md:px-10 relativ pb-20"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 flex flex-col justify-center items-center">
                <h2 className="text-2xl md:text-5xl mb-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/70 to-gray-100/50">
                    Hackathon Timeline
                </h2>
                <p className="text-neutral-400 text-sm md:text-lg">
                    Our hackathon will last 4 weeks. Submissions will be
                    accepted from July 29th until 11:59 PM PT on August 25th.
                </p>
            </div>

            <div className="relative max-w-7xl mx-auto pb-20">
                {/* vertical line */}
                <div className="absolute left-8 top-0 w-[2px] h-full bg-neutral-800 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
                    <div
                        ref={lineRef}
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
                    />
                </div>

                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10 relative"
                    >
                        {/* sticky left part */}
                        <div className="sticky flex flex-col md:flex-row z-[1] items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 w-10 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full bg-gradient-to-r from-violet-400 to-rose-400" />
                            </div>
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white/50">
                                {item.title}
                            </h3>
                        </div>

                        {/* right content */}
                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-rose-400">
                                {item.title}
                            </h3>
                            <div className="text-neutral-300">
                                {item.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
