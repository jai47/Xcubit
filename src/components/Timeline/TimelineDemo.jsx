'use client';
import React from 'react';
import Image from 'next/image';
import { Timeline } from './Timeline';

export function TimelineDemo() {
    const data = [
        {
            title: 'Pre-Event (August 2026)',
            content: (
                <div>
                    <p className="text-white/70 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Preparations kick off – registrations open, problem
                        statements released, and webinars hosted to guide
                        participants.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            'https://res.cloudinary.com/dql4uvrzz/image/upload/v1733044748/awards/wb34lx4trusrmdfzr06i.png',
                            'https://res.cloudinary.com/dql4uvrzz/image/upload/v1733044889/awards/e5jxy2v5j2yt54u8mqss.jpg',
                            'https://res.cloudinary.com/dql4uvrzz/image/upload/v1733043564/awards/c3ike3wlnqzkqt6i7ktd.png',
                        ].map((img, i) => (
                            <Image
                                key={i}
                                src={`${img}`}
                                alt="pre-event"
                                width={500}
                                height={500}
                                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow"
                            />
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: 'September 2026',
            content: (
                <div>
                    <p className="text-white/70 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        The grand launch of{' '}
                        <span className="font-semibold text-indigo-300">
                            Xcubit Ideathon 2026
                        </span>{' '}
                        – a national-level innovation challenge bringing
                        together brilliant minds to solve real-world problems.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            'https://res.cloudinary.com/dql4uvrzz/image/upload/v1733043564/awards/c3ike3wlnqzkqt6i7ktd.png',
                            'https://res.cloudinary.com/dql4uvrzz/image/upload/v1733044889/awards/e5jxy2v5j2yt54u8mqss.jpg',
                            'https://res.cloudinary.com/dql4uvrzz/image/upload/v1733044748/awards/wb34lx4trusrmdfzr06i.png',
                            'https://res.cloudinary.com/dql4uvrzz/image/upload/v1733044748/awards/wb34lx4trusrmdfzr06i.png',
                        ].map((img, i) => (
                            <Image
                                key={i}
                                src={`${img}`}
                                alt="event"
                                width={500}
                                height={500}
                                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow"
                            />
                        ))}
                    </div>
                </div>
            ),
        },
        // {
        //     title: 'Changelog',
        //     content: (
        //         <div>
        //             <p className="text-white/70 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
        //                 What’s new in{' '}
        //                 <span className="font-semibold text-indigo-300">
        //                     Xcubit Ideathon 2026
        //                 </span>{' '}
        //                 🚀
        //             </p>
        //             <ul className="mb-8 space-y-2 text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
        //                 <li>
        //                     ✅ National-level outreach with 50+ colleges onboard
        //                 </li>
        //                 <li>
        //                     ✅ New competition tracks: AI, Sustainability,
        //                     FinTech, AR/VR
        //                 </li>
        //                 <li>✅ Blockchain-based certificate issuance</li>
        //                 <li>✅ Workshops & mentorship from industry leaders</li>
        //                 <li>
        //                     ✅ Attractive prizes and incubation opportunities
        //                 </li>
        //             </ul>
        //         </div>
        //     ),
        // },
    ];

    return (
        <div className="min-h-screen w-full" id="timeline">
            <Timeline data={data} />
        </div>
    );
}
