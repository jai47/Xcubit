'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroTimeRemaining = ({ data, className }) => {
    const targetTime = new Date(data).getTime();

    const calculateTimeLeft = () => {
        const now = Date.now();
        const diff = targetTime - now;

        if (diff <= 0) {
            return { days: '00', hours: '00', minutes: '00', seconds: '00' };
        }

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        return {
            days: String(days).padStart(2, '0'),
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    // Refs for gsap animation
    const refs = {
        days: useRef(null),
        hours: useRef(null),
        minutes: useRef(null),
        seconds: useRef(null),
    };

    // Container refs for stagger
    const containerRefs = useRef([]);

    useEffect(() => {
        const timer = setInterval(() => {
            const newTime = calculateTimeLeft();
            setTimeLeft((prev) => {
                Object.keys(newTime).forEach((key) => {
                    if (prev[key] !== newTime[key] && refs[key]?.current) {
                        gsap.killTweensOf(refs[key].current);
                        gsap.fromTo(
                            refs[key].current,
                            { scale: 1.2, opacity: 0 },
                            {
                                scale: 1,
                                opacity: 1,
                                duration: 0.3,
                                ease: 'back.out(2)',
                            }
                        );
                    }
                });
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetTime]);

    // Animate divs with stagger on mount
    useGSAP(() => {
        gsap.from(containerRefs.current, {
            y: -20,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            stagger: 0.2,
        });
    });

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <div
            className={`mt-6 flex flex-wrap justify-center items-center gap-4 sm:gap-6 ${className}`}
        >
            {[
                { label: 'DAYS', value: days, ref: refs.days },
                { label: 'HOURS', value: hours, ref: refs.hours },
                { label: 'MINUTES', value: minutes, ref: refs.minutes },
                { label: 'SECONDS', value: seconds, ref: refs.seconds },
            ].map((item, idx) => (
                <div
                    key={item.label}
                    ref={(el) => (containerRefs.current[idx] = el)}
                    className="text-center flex flex-col bg-white/5 rounded-xl px-4 py-2 shadow-lg backdrop-blur-md border border-white/10"
                >
                    <span
                        ref={item.ref}
                        className="text-5xl font-bold text-white drop-shadow-md"
                    >
                        {item.value}
                    </span>
                    <span className="text-[10px] tracking-widest text-gray-300 mt-2">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default HeroTimeRemaining;

// {[
//                 { label: 'DAYS', value: days, ref: refs.days },
//                 { label: 'HOURS', value: hours, ref: refs.hours },
//                 { label: 'MINUTES', value: minutes, ref: refs.minutes },
//                 { label: 'SECONDS', value: seconds, ref: refs.seconds },
//             ].map((item, idx, arr) => (
//                 <div key={item.label} className="flex items-center gap-2">
//                     {/* Timer Block */}
//                     <div
//                         ref={(el) => (containerRefs.current[idx] = el)}
//                         className="text-center flex flex-col bg-white/5 rounded-xl px-4 py-2 shadow-lg backdrop-blur-md border border-white/10"
//                     >
//                         <span
//                             ref={item.ref}
//                             className="text-5xl font-bold text-white drop-shadow-md"
//                         >
//                             {item.value}
//                         </span>
//                         <span className="text-[10px] tracking-widest text-gray-300 mt-2">
//                             {item.label}
//                         </span>
//                     </div>

//                     {/* Colon (skip after last) */}
//                     {idx < arr.length - 1 && (
//                         <span className="text-4xl font-bold text-white drop-shadow-md">
//                             :
//                         </span>
//                     )}
//                 </div>
//             ))}
