'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const words = ['Loading', 'Processing', 'Almost there...', 'Done!'];

export default function Loading() {
    const [index, setIndex] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const containerRef = useRef(null);
    const textRef = useRef(null);

    // Cycle through words
    useEffect(() => {
        if (index < words.length - 1) {
            const timer = setTimeout(
                () => {
                    setIndex((prev) => prev + 1);
                },
                index === 0 ? 1000 : 600
            );
            return () => clearTimeout(timer);
        } else {
            // Trigger exit animation after last word
            setTimeout(() => {
                setIsExiting(true);
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        // Next.js will replace with page content
                    },
                });
            }, 200);
        }
    }, [index]);

    // Animate text each time it changes
    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                { yPercent: 100, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                }
            );
        }
    }, [index]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
        >
            <div className="relative flex flex-col items-center space-y-4">
                <span
                    ref={textRef}
                    className="text-white text-3xl md:text-5xl font-semibold"
                >
                    {words[index]}
                </span>
                <div className="w-12 h-12 rounded-full border-4 border-dashed border-gray-400 border-t-transparent animate-spin" />
            </div>
        </div>
    );
}
