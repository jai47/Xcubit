'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { sponsorGET } from '@/src/serverAction/sponsorAction'; // adjust path

const LogoCarousel = ({ sponsors }) => {
    return (
        <div className="relative w-full overflow-hidden mx-auto flex items-center justify-center ">
            {/* Sliding container */}
            <div className="flex w-max animate-logoSlide space-x-16">
                {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map(
                    (sponsor, i) => (
                        <div
                            key={`${sponsor._id}-${i}`}
                            className="drop-shadow-xl hover:scale-110 transition-transform duration-300"
                        >
                            {sponsor.social?.link ? (
                                <a
                                    href={sponsor.social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src={sponsor.logo || '/fallback.png'}
                                        alt={sponsor.name}
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                </a>
                            ) : (
                                <Image
                                    src={sponsor.logo || '/fallback.png'}
                                    alt={sponsor.name}
                                    width={100}
                                    height={100}
                                    className="object-contain"
                                />
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default LogoCarousel;
