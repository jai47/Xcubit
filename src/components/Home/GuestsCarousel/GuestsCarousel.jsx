'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaUserTie } from 'react-icons/fa';
import gsap from 'gsap';

export default function GuestsCarousel({ judgeGET, speakerGET }) {
    const [participants, setParticipants] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const autoplayRef = useRef(null);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const [judgesRes, speakersRes] = await Promise.all([
                    judgeGET(),
                    speakerGET(),
                ]);

                const combined = [];
                if (judgesRes.success) combined.push(...judgesRes.data);
                if (speakersRes.success) combined.push(...speakersRes.data);

                setParticipants(combined);
            } catch (err) {
                console.error('Error fetching participants:', err);
            }
        };

        fetchParticipants();
    }, [judgeGET, speakerGET]);

    const handleNext = () =>
        setActiveIndex((prev) => (prev + 1) % participants.length);
    const handlePrev = () =>
        setActiveIndex(
            (prev) => (prev - 1 + participants.length) % participants.length
        );

    useEffect(() => {
        if (!participants.length) return;

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
    }, [activeIndex, participants]);

    useEffect(() => {
        if (!participants.length) return;
        autoplayRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % participants.length);
        }, 6000);
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [participants]);

    if (!participants.length) return null;

    const activeParticipant = participants[activeIndex];

    return (
        <section className="w-full bg-neutral-950 text-white flex flex-col items-center">
            <h2 className="text-2xl md:text-5xl mb-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/70 to-gray-100/50">
                Distinguished{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300">
                    Speakers & Judges
                </span>
            </h2>
            <p className="text-lg text-gray-400 mb-12 px-4 text-center max-w-2xl">
                Meet our panel of industry experts, speakers, and tech leaders
            </p>

            {/* Main Highlight Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl px-6 items-center w-full">
                <div className="flex justify-center">
                    {activeParticipant.image ? (
                        <img
                            ref={imageRef}
                            key={activeParticipant._id}
                            src={activeParticipant.image}
                            alt={activeParticipant.name}
                            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg"
                        />
                    ) : (
                        <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center bg-gray-800 rounded-2xl shadow-lg">
                            <FaUserTie size={64} />
                        </div>
                    )}
                </div>
                <div ref={contentRef} key={activeParticipant._id}>
                    <h3 className="text-xl md:text-2xl font-semibold">
                        {activeParticipant.name}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm md:text-base">
                        {activeParticipant.designation ||
                            activeParticipant.role}
                    </p>
                    {activeParticipant.organization && (
                        <p className="text-gray-400 mb-2 text-sm md:text-base">
                            {activeParticipant.organization}
                        </p>
                    )}
                    <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                        {activeParticipant.description}
                    </p>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
                <button
                    onClick={handlePrev}
                    aria-label="Previous participant"
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-white/35 transition"
                >
                    <FaArrowLeft size={18} />
                </button>
                <button
                    onClick={handleNext}
                    aria-label="Next participant"
                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-800 hover:bg-white/35 transition"
                >
                    <FaArrowRight size={18} />
                </button>
            </div>

            {/* Infinite Carousel */}
            <div className="relative w-4/5 overflow-hidden py-12 pb-20">
                <div className="flex w-max animate-logoSlide space-x-6 px-6">
                    {[...participants, ...participants, ...participants].map(
                        (p, idx) => (
                            <div
                                key={`${p._id}-${idx}`}
                                className="bg-neutral-900 border border-neutral-800/70 text-white rounded-xl p-4 sm:p-6 w-56 sm:w-72 flex-shrink-0 hover:scale-105 hover:border-indigo-400/20 hover:shadow-xl hover:shadow-indigo-400/20 transition-all duration-300"
                            >
                                <img
                                    src={p.image || '/default-avatar.png'}
                                    alt={p.name}
                                    className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3"
                                />
                                <h3 className="text-lg sm:text-xl font-bold">
                                    {p.name}
                                </h3>
                                <p className="text-indigo-300 text-sm sm:text-base">
                                    {p.designation || p.role}
                                </p>
                                <p className="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-3">
                                    {p.description}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
