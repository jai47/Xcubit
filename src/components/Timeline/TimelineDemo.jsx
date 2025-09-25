'use client';
import React from 'react';
import Image from 'next/image';
import { Timeline } from './Timeline';

const TimelineDemo = () => {
    const data = [
        {
            title: 'Internal Ideathon (Jan-Mar 2026)',
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
            title: 'Xcubiton 2026 (3rd Apr 2026)',
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
        {
            title: 'Day 1 (4th Apr 2026)',
            content: (
                <div>
                    <p className="text-white/70 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Schedule for{' '}
                        <span className="font-semibold text-indigo-300">
                            Day 1
                        </span>{' '}
                        – Get ready for an action-packed day of pitches,
                        networking, and collaboration!
                    </p>
                    <ul className="mb-8 space-y-4 text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        <li>
                            🟠 <strong>8:30 AM – 9:30 AM:</strong> Registration
                            & Entry
                        </li>
                        <li>
                            🟠 <strong>9:30 AM – 10:30 AM:</strong> Opening
                            Ceremony
                        </li>
                        <li>
                            🟠 <strong>10:30 AM – 5:00 PM:</strong> Pitching
                            Sessions (with mentoring support)
                        </li>
                        <li>
                            🟠 <strong>1:00 PM onwards:</strong> Networking
                            Session – Meet peers and industry leaders
                        </li>
                        <li>
                            🟠 <strong>5:00 PM – 5:30 PM:</strong> Coffee Break
                        </li>
                        <li>
                            🟠 <strong>5:30 PM:</strong> Results Announcement
                        </li>
                        <li>
                            🟠 <strong>7:00 PM – 8:30 PM:</strong> Dinner &
                            Networking Wrap-up
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: 'Day 2 (4th Apr 2026)',
            content: (
                <div>
                    <p className="text-white/70 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Schedule for{' '}
                        <span className="font-semibold text-indigo-300">
                            Day 2
                        </span>{' '}
                        – Dive deeper into investment discussions and conclude
                        with exciting prospects!
                    </p>
                    <ul className="mb-8 space-y-4 text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        <li>
                            🟢 <strong>8:00 AM:</strong> Breakfast
                        </li>
                        <li>
                            🟢 <strong>9:00 AM:</strong> VC Interaction – Learn
                            from investors
                        </li>
                        <li>
                            🟢 <strong>9:30 AM – 2:00 PM:</strong> Pitch for
                            Investment – Present to investors
                        </li>
                        <li>
                            🟢 <strong>4:00 PM:</strong> Closing Ceremony &
                            Announcements
                        </li>
                    </ul>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen w-full" id="timeline">
            <Timeline data={data} />
        </div>
    );
};

export default TimelineDemo;
