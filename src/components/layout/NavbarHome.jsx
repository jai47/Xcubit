'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../../public/logo/logo.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useSession } from 'next-auth/react';
import { useNationalEvent } from '@/src/context/National/NationalEventContext';

const Navbar = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const nationals = useNationalEvent();
    const [isOpen, setIsOpen] = useState(false);
    const tl = useRef(null);

    const animationConfig = useCallback(() => {
        gsap.set('.links', { opacity: 0, x: 50 });

        tl.current = gsap
            .timeline({ paused: true, defaults: { ease: 'power4.out' } })
            .to('#menu', {
                duration: 0.8,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            })
            .from('.close', {
                opacity: 0,
                x: -50,
                duration: 0.3,
            })
            .to(
                '.links',
                {
                    opacity: 1,
                    x: 0,
                    stagger: 0.1,
                    duration: 0.3,
                },
                '-=0.5'
            );
    }, []);

    useGSAP(animationConfig);

    useEffect(() => {
        if (tl.current) {
            isOpen ? tl.current.play() : tl.current.reverse();
        }
    }, [isOpen]);

    const menuStyle = {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        background:
            'linear-gradient(135deg, rgba(93,79,241,0.25), rgba(96,83,231,0.1))',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
    };

    const navStyle = {
        background:
            'linear-gradient(138deg, rgba(93,79,241,0.3), rgba(96,83,231,0.1))',
    };

    return (
        <nav className="fixed top-10 lg:top-5 w-screen h-fit flex justify-center items-center z-[5]">
            <div
                className="py-4 lg:py-2 px-8 w-11/12 rounded-full shadow-lg flex items-center justify-between relative backdrop-blur-md"
                style={navStyle}
            >
                {/* Left logo */}
                <div className="flex-shrink-0">
                    <Image src={logoImage} alt="Logo" height={40} priority />
                </div>

                {/* Center nav links */}
                <div className="hidden md:flex flex-1 justify-center">
                    <ul className="flex text-xs uppercase text-white gap-8 lg:gap-12 font-sans items-center">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/events">Events</Link>
                        </li>

                        {/* Guidelines Dropdown */}
                        <li
                            tabIndex={0} // makes it focusable
                            className="relative group cursor-pointer outline-none"
                        >
                            <span className="hover:text-gray-300 transition select-none">
                                Guidelines
                            </span>

                            {/* Dropdown */}
                            <div
                                className="
            absolute left-0 top-full mt-1
            hidden group-hover:block group-focus:block
            bg-black/80 backdrop-blur-md rounded-md shadow-lg
            border border-white/10 w-56 p-2 z-50 select-none
        "
                            >
                                <div className="flex flex-col space-y-1">
                                    <Link
                                        href={
                                            nationals?.collegeGuideline || '#'
                                        }
                                        className="px-3 py-2 text-xs text-white hover:bg-white/10 rounded-md"
                                        target="_blank"
                                    >
                                        Institute Guidelines
                                    </Link>
                                    <Link
                                        href={
                                            nationals?.participantsGuideline ||
                                            '#'
                                        }
                                        className="px-3 py-2 text-xs text-white hover:bg-white/10 rounded-md"
                                        target="_blank"
                                    >
                                        Participants Guidelines
                                    </Link>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Link href="/ps">Problem Statement</Link>
                        </li>
                        <li>
                            <Link href="/#timeline" scroll={true}>
                                Timeline
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">About Us</Link>
                        </li>
                        <li>
                            <Link href="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </div>

                {/* Right hamburger button */}
                <div className="flex-shrink-0">
                    <button
                        aria-label="menu"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="w-6 h-6 fill-white stroke-white"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={
                                    isOpen
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 6h16M4 12h16m-7 6h7'
                                }
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div
                id="menu"
                className="h-screen w-screen fixed top-0 right-0 flex flex-col pl-20 lg:pl-24 justify-center space-y-16 z-30"
                style={menuStyle}
            >
                <button
                    aria-label="close menu"
                    className="close absolute top-6 left-6"
                    onClick={() => setIsOpen(false)}
                >
                    <p className="text-2xl text-white">&#x2715;</p>
                </button>

                <Link
                    href={process.env.NEXT_PUBLIC_BASE_URL}
                    className="text-4xl text-white links md:text-6xl lg:text-4xl"
                >
                    Home
                </Link>
                <Link
                    href="/events"
                    className="text-4xl text-white links md:text-6xl lg:text-4xl"
                >
                    Events
                </Link>
                {!user ? (
                    <Link
                        href="/login"
                        className="text-4xl text-white links md:text-6xl lg:text-4xl"
                    >
                        <span>Signup</span>
                    </Link>
                ) : (
                    <Link
                        href="/dashboard"
                        className="text-4xl text-white links md:text-6xl lg:text-4xl"
                    >
                        <span>Dashboard</span>
                    </Link>
                )}
                <Link
                    href="/about"
                    className="text-4xl text-white links md:text-6xl lg:text-4xl"
                >
                    About Us
                </Link>
                <Link
                    href="/contact"
                    className="text-4xl text-white links md:text-6xl lg:text-4xl"
                >
                    Support
                </Link>

                <div>
                    <p className="mt-4 md:mt-0 text-xs md:text-sm text-white">
                        © 2024 Xcubit. All rights reserved.
                    </p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
