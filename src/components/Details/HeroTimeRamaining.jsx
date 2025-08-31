'use client';
import { useState, useEffect } from 'react';

const HeroTimeRemaining = ({ data }) => {
    const targetTime = new Date(data).getTime();

    const calculateTimeLeft = () => {
        const now = Date.now();
        const diff = targetTime - now;

        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: '00', seconds: '00' };
        }

        const days = Math.floor(diff / 86400000); // 1000 * 60 * 60 * 24
        const hours = Math.floor((diff % 86400000) / 3600000); // 1000 * 60 * 60
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        return {
            days,
            hours,
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [targetTime]);

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <div className="mt-6 flex flex-wrap justify-center items-center gap-4 sm:gap-6 ">
            {[
                { label: 'DAYS', value: days },
                { label: 'HOURS', value: hours },
                { label: 'MINUTES', value: minutes },
                { label: 'SECONDS', value: seconds },
            ].map((item) => (
                <div
                    key={item.label}
                    className="text-center text-gray-300 flex flex-col"
                >
                    <span className="text-5xl font-medium">{item.value}</span>
                    <span className="text-[8px] text-gray-300 mt-1">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default HeroTimeRemaining;

// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const HeroTimeRemaining = ({ data, className }) => {
//     const targetTime = new Date(data).getTime();

//     const calculateTimeLeft = () => {
//         const now = Date.now();
//         const diff = targetTime - now;

//         if (diff <= 0) {
//             return { days: 0, hours: 0, minutes: '00', seconds: '00' };
//         }

//         const days = Math.floor(diff / 86400000); // 1000 * 60 * 60 * 24
//         const hours = Math.floor((diff % 86400000) / 3600000); // 1000 * 60 * 60
//         const minutes = Math.floor((diff % 3600000) / 60000);
//         const seconds = Math.floor((diff % 60000) / 1000);

//         return {
//             days,
//             hours,
//             minutes: String(minutes).padStart(2, '0'),
//             seconds: String(seconds).padStart(2, '0'),
//         };
//     };

//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

//     // Refs for gsap animation
//     const refs = {
//         days: useRef(null),
//         hours: useRef(null),
//         minutes: useRef(null),
//         seconds: useRef(null),
//     };

//     useEffect(() => {
//         const timer = setInterval(() => {
//             const newTime = calculateTimeLeft();
//             setTimeLeft((prev) => {
//                 // animate only when value changes
//                 Object.keys(newTime).forEach((key) => {
//                     if (prev[key] !== newTime[key] && refs[key]?.current) {
//                         gsap.fromTo(
//                             refs[key].current,
//                             { scale: 1.4, opacity: 0 },
//                             {
//                                 scale: 1,
//                                 opacity: 1,
//                                 duration: 0.4,
//                                 ease: 'back.out(2)',
//                             }
//                         );
//                     }
//                 });
//                 return newTime;
//             });
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [targetTime]);

//     const { days, hours, minutes, seconds } = timeLeft;

//     return (
//         <div
//             className={`mt-6 flex flex-wrap justify-center items-center gap-4 sm:gap-6 ${className}`}
//         >
//             {[
//                 { label: 'DAYS', value: days, ref: refs.days },
//                 { label: 'HOURS', value: hours, ref: refs.hours },
//                 { label: 'MINUTES', value: minutes, ref: refs.minutes },
//                 { label: 'SECONDS', value: seconds, ref: refs.seconds },
//             ].map((item) => (
//                 <div
//                     key={item.label}
//                     className="text-center flex flex-col bg-white/5 rounded-xl px-4 py-2 shadow-lg backdrop-blur-md border border-white/10"
//                 >
//                     <span
//                         ref={item.ref}
//                         className="text-5xl font-bold text-white drop-shadow-md"
//                     >
//                         {item.value}
//                     </span>
//                     <span className="text-[10px] tracking-widest text-gray-300 mt-2">
//                         {item.label}
//                     </span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default HeroTimeRemaining;
