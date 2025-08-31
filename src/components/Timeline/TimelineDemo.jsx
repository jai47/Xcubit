'use client';
import React from 'react';
import Image from 'next/image';
import { Timeline } from './Timeline';

export function TimelineDemo() {
    const data = [
        {
            title: '2024',
            content: (
                <div>
                    <p className="text-white/70 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Built and launched Aceternity UI and Aceternity UI Pro
                        from scratch
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {['/hero.jpg', '/hero.jpg', '/hero.jpg'].map(
                            (img, i) => (
                                <Image
                                    key={i}
                                    src={`${img}`}
                                    alt="template"
                                    width={500}
                                    height={500}
                                    className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow"
                                />
                            )
                        )}
                    </div>
                </div>
            ),
        },
        {
            title: 'Early 2023',
            content: (
                <div>
                    <p className="text-white/70 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Lorem ipsum is for people who are too lazy to write
                        copy. But we are not. Here are some more examples.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            '/hero.jpg',
                            '/hero.jpg',
                            '/hero.jpg',
                            '/hero.jpg',
                        ].map((img, i) => (
                            <Image
                                key={i}
                                src={`${img}`}
                                alt="template"
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
            title: 'Changelog',
            content: (
                <div>
                    <p className="text-white/70 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Deployed 5 new components on Aceternity today
                    </p>
                    <ul className="mb-8 space-y-2 text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                        <li>✅ Card grid component</li>
                        <li>✅ Startup template Aceternity</li>
                        <li>✅ Random file upload lol</li>
                        <li>✅ Himesh Reshammiya Music CD</li>
                        <li>✅ Salman Bhai Fan Club registrations open</li>
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
}
