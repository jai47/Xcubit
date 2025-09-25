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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length);
        }, 800);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
        }
    }, [currentIndex]);

    console.log('www.linkedin.com/in/jai47/');

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-950 text-white text-3xl font-semibold z-[9999]">
            <div
                ref={textRef}
                className="flex items-center justify-center gap-3"
            >
                <span className="w-3 h-3 rounded-full bg-gray-300" />
                <span>{greetings[currentIndex]}</span>
            </div>
        </div>
    );
};

export default Loading;
