'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const Loading = () => {
    const greetings = [
        'Hello',
        'Olá',
        'مرحبا',
        '안녕하세요',
        'こんにちは',
        '你好',
        'Ciao',
        'Hola',
        'Bonjour',
        'Hallo',
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const textRef = useRef(null);
    // Cycle through greetings
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Animate text fade in/out
    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
        }
    }, [currentIndex]);

    return (
        <div className="fixed inset-0 flex items-center justify-center text-white text-3xl font-semibold z-[9999] bg-black">
            <div
                ref={textRef}
                className="flex items-center justify-center gap-3 tracking-wide"
            >
                <span className="font-sans">{greetings[currentIndex]}</span>
            </div>

            <div className="absolute top-8 right-8 w-6 h-6 rounded-full animate-spin border border-white border-t-transparent hidden md:block lg:block"></div>
        </div>
    );
};

export default Loading;
