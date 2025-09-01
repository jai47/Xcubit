'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import gsap from 'gsap';

const judges = [
    {
        name: 'Mr. Venkatesh Bharti',
        title: 'CEO Xcubit, Scientist',
        description:
            'Former AI Research Lead at Stanford. Pioneer in machine learning and robotics with 20+ years of industry experience.',
        image: 'https://res.cloudinary.com/dql4uvrzz/image/upload/v1734062555/awards/wgp5lmuofkgaqr4frrrb.jpg',
    },
    {
        name: 'Ms. Deepa Kohli',
        title: 'Board Member, Xcubit Labs',
        description:
            'Serial entrepreneur with successful exits. Recognized in Forbes 30 Under 30 for innovations in blockchain technology.',
        image: 'https://res.cloudinary.com/dql4uvrzz/image/upload/v1734062509/awards/uxkq75h4gsrkciasrqxv.jpg',
    },
    {
        name: 'Dr. Sarah Kumar',
        title: 'Head of Innovation, HealthTech Solutions',
        description:
            'Leading expert in digital health innovations. Multiple patents holder. WHO consultant for healthcare technology.',
        image: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20female%20tech%20innovator%20with%20modern%20professional%20style%20leadership%20presence&width=400&height=400&seq=judge-004&orientation=squarish',
    },
    {
        name: 'Robert Anderson',
        title: 'Managing Partner, Nova Ventures',
        description:
            '25+ years in venture capital. Early investor in multiple unicorn startups. Expert in scaling tech companies.',
        image: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20distinguished%20male%20venture%20capitalist%20with%20silver%20hair%20executive%20suit%20modern%20setting&width=400&height=400&seq=judge-003&orientation=squarish',
    },
];

export default function Judges() {
    const [activeIndex, setActiveIndex] = useState(0);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const autoplayRef = useRef(null);

    const handleNext = () =>
        setActiveIndex((prev) => (prev + 1) % judges.length);
    const handlePrev = () =>
        setActiveIndex((prev) => (prev - 1 + judges.length) % judges.length);

    useEffect(() => {
        if (contentRef.current) {
            gsap.fromTo(
                contentRef.current.children,
                { y: 20, opacity: 0, filter: 'blur(8px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power3.out',
                }
            );
        }
        if (imageRef.current) {
            gsap.fromTo(
                imageRef.current,
                { scale: 0.98, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }
            );
        }
    }, [activeIndex]);

    useEffect(() => {
        autoplayRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % judges.length);
        }, 6000);
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, []);

    const activeJudge = judges[activeIndex];

    return (
        <section className="w-full bg-neutral-950 text-white flex flex-col items-center">
            <h2 className="text-2xl md:text-5xl mb-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/70 to-gray-100/50">
                Distinguished{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300">
                    Judges
                </span>
            </h2>
            <p className="text-lg text-gray-400 mb-12 px-4 text-center max-w-2xl">
                Meet our panel of industry experts and tech leaders
            </p>

            {/* Main Highlight Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl px-6 items-center w-full">
                <div className="flex justify-center">
                    <img
                        ref={imageRef}
                        key={activeJudge.image}
                        src={activeJudge.image}
                        alt={activeJudge.name}
                        className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg"
                    />
                </div>
                <div ref={contentRef} key={activeJudge.name}>
                    <h3 className="text-xl md:text-2xl font-semibold">
                        {activeJudge.name}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm md:text-base">
                        {activeJudge.title}
                    </p>
                    <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                        {activeJudge.description}
                    </p>
                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={handlePrev}
                            aria-label="Previous judge"
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-white/35 transition"
                        >
                            <FaArrowLeft size={18} />
                        </button>
                        <button
                            onClick={handleNext}
                            aria-label="Next judge"
                            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-white/35 transition"
                        >
                            <FaArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Infinite Carousel */}
            <div className="relative w-4/5 overflow-hidden py-12 pb-20">
                <div className="flex w-max animate-logoSlide space-x-6 px-6">
                    {[...judges, ...judges, ...judges].map((judge, idx) => (
                        <div
                            key={`${judge.name}-${idx}`}
                            className="bg-neutral-900 border border-neutral-800/70 text-white rounded-xl p-4 sm:p-6 w-56 sm:w-72 flex-shrink-0 hover:scale-105 hover:border-indigo-400/20 hover:shadow-xl hover:shadow-indigo-400/20 transition-all duration-300"
                        >
                            <img
                                src={judge.image}
                                alt={judge.name}
                                className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3"
                            />
                            <h3 className="text-lg sm:text-xl font-bold">
                                {judge.name}
                            </h3>
                            <p className="text-indigo-300 text-sm sm:text-base">
                                {judge.title}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-3">
                                {judge.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
