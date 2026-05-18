'use client';

import gsap from 'gsap';
import { CiLinkedin, CiInstagram, CiTwitter } from 'react-icons/ci';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import HeroTimeRemaining from '../../Details/HeroTimeRamaining';
import VideoPlayer from '../Videoplayer/VideoPlayer';
import LogoCarousel from './LogoCarousel';
import { useNationalEvent } from '@/src/context/National/NationalEventContext';

const HeroSection = ({ sponsorGET }) => {
    const socialIconsRef = useRef(null);
    const headingRef = useRef(null);
    const subheading1Ref = useRef(null);
    const subheading2Ref = useRef(null);
    const [showAurora, setShowAurora] = useState(true);
    const [sponsors, setSponsors] = useState([]);

    const event = useNationalEvent();

    useEffect(() => {
        const cookies = document.cookie.split(';').map((c) => c.trim());
        const auroraCookie = cookies.find((cookie) =>
            cookie.startsWith('showAurora=')
        );
        if (auroraCookie) {
            const value = auroraCookie.split('=')[1];
            setShowAurora(value === 'true');
        }
    }, []);

    useEffect(() => {
        const fetchSponsors = async () => {
            const res = await sponsorGET();
            if (res.success) {
                setSponsors(res.data);
            } else {
                console.error('Failed to fetch sponsors:', res.message);
            }
        };
        fetchSponsors();
    }, []);

    useGSAP(
        () => {
            const links = socialIconsRef.current?.querySelectorAll('a, span');
            gsap.from(links, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: 'power4.out',
                stagger: 0.2,
            });

            gsap.from(subheading1Ref.current, {
                y: -50,
                opacity: 0,
                duration: 1,
                delay: 1,
                ease: 'power4.out',
            });
            gsap.from(subheading2Ref.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 1,
                ease: 'power4.out',
            });

            gsap.fromTo(
                headingRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
            );
        },
        { scope: [socialIconsRef, headingRef, subheading1Ref] }
    );

    const toggleAurora = (value) => {
        setShowAurora(value);
        document.cookie = `showAurora=${value}; path=/; max-age=${
            60 * 60 * 24 * 365
        }`;
    };

    return (
        <section
            className="w-full min-h-screen text-background overflow-hidden select-none bg-[#030303] relative flex flex-col justify-center items-center px-2 sm:px-6 lg:px-12"
            style={{
                backgroundImage: "url('/grid.webp')",
                backgroundPosition: '0 10%, 10% 10%',
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundSize: '2000px , 1525px',
            }}
        >
            {/* Aurora Toggle Button */}
            <div className="absolute right-2 top-24 sm:right-4 sm:top-32 group z-20 backdrop-blur-sm">
                <div
                    className={`h-8 sm:h-10 bg-opacity-90 text-white font-medium transition-all duration-300 ease-in-out
          ${showAurora ? 'bg-indigo-600/40' : 'bg-gray-500/40'}
          w-1 group-hover:w-20 sm:group-hover:w-24
          rounded-md overflow-hidden flex items-center`}
                >
                    <ul className="flex flex-col space-y-1 sm:space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                        <li>
                            <button
                                onClick={() => toggleAurora(!showAurora)}
                                className="w-full text-left text-white rounded px-2 py-1 transition flex items-center justify-between text-[10px] sm:text-sm"
                            >
                                <span>Animation</span>
                                <span
                                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-black ${
                                        showAurora
                                            ? 'bg-green-500'
                                            : 'bg-gray-300'
                                    }`}
                                />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Aurora Background */}
            {showAurora && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none px-2 sm:px-4 lg:px-12">
                    <div className="absolute -inset-[10px] opacity-60 blur-[100px] will-change-transform [background-image:repeating-linear-gradient(100deg,rgba(59,130,246,0.15)_10%,rgba(99,102,241,0.25)_20%,rgba(147,197,253,0.2)_30%,rgba(196,181,253,0.25)_40%,rgba(167,139,250,0.2)_50%)] [background-size:200%_200%] animate-[aurora_12s_ease-in-out_infinite_alternate] mix-blend-screen" />
                </div>
            )}

            {/* Social Icons (hidden on mobile) */}
            <div
                ref={socialIconsRef}
                className="hidden md:flex fixed left-0 top-0 h-screen w-10 sm:w-16 flex-col items-center justify-center z-[1]"
            >
                <div className="flex flex-col gap-4 sm:gap-10 items-center justify-center">
                    <Link
                        href="https://www.linkedin.com/company/xcubit/"
                        target="_blank"
                    >
                        <CiLinkedin size={20} />
                    </Link>
                    <Link href="http://x.com/xcubit_official" target="_blank">
                        <CiTwitter size={20} />
                    </Link>
                    <Link
                        href="https://www.instagram.com/xcubit_official/"
                        target="_blank"
                    >
                        <CiInstagram size={20} />
                    </Link>
                </div>
                <span className="text-[9px] sm:text-xs absolute bottom-16 sm:bottom-24 tracking-[4px] sm:tracking-[8px] -rotate-90 whitespace-nowrap selection:bg-main selection:text-white">
                    Follow us on
                </span>
            </div>

            {/* Main Hero Content */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 lg:gap-16 w-full text-center lg:text-left">
                {/* Left Section */}
                <div className="flex flex-col items-center lg:items-start max-w-2xl px-2 sm:px-6 scale-75">
                    <h1
                        ref={headingRef}
                        className="text-5xl md:text-5xl lg:text-5xl font-sans font-medium tracking-wide capitalize leading-tight"
                    >
                        {event?.name || 'Innovation Connect'}
                    </h1>

                    <h2
                        ref={subheading1Ref}
                        className="text-4xl md:text-3xl lg:text-5xl font-sans font-medium tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 mt-2 sm:mt-4"
                    >
                        From Vision to Venture
                    </h2>

                    <div className="mt-3 sm:mt-4">
                        <HeroTimeRemaining
                            data={event?.date}
                            className="text-sm sm:text-base md:text-2xl lg:text-4xl font-mono"
                        />
                    </div>

                    <p className="font-extralight text-xs sm:text-sm md:text-base max-w-md sm:max-w-xl mt-3 sm:mt-4 px-2 sm:px-0">
                        {event?.shortDescription ||
                            'A premier national-level ideathon that brings together the brightest minds, boldest thinkers, and most passionate innovators from across India.'}
                    </p>

                    <div className="mt-5 sm:mt-6 flex justify-center lg:justify-start">
                        <span className="relative inline-block overflow-hidden rounded-full p-[2px]">
                            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#6366f1_50%,#b27ce6_100%)]"></span>
                            <div className="inline-flex h-full w-full items-center justify-center rounded-full bg-gray-900/90 dark:bg-gray-950 text-sm sm:text-base font-medium backdrop-blur-3xl">
                                <Link
                                    href="/events"
                                    className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-purple-400/30 via-indigo-500/40 to-transparent dark:from-purple-400/20 dark:via-indigo-500/30 text-white border border-purple-500/40 hover:from-purple-400/50 hover:via-indigo-500/60 transition-all py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base"
                                >
                                    Explore Events
                                </Link>
                            </div>
                        </span>
                    </div>
                </div>

                {/* Right Section (Video) */}
                <div className="flex-shrink-0 w-full sm:w-4/5 md:w-3/4 lg:w-[50%] mt-6 lg:mt-0 hidden md:block lg:block scale-75">
                    <VideoPlayer
                        thumbnailUrl={event?.banner || '/promo2.png'}
                        videoUrl="/Promovideo.mp4"
                        title=""
                        description=""
                        className="rounded-xl w-full"
                    />
                </div>
            </div>

            {/* Sponsors */}
            {sponsors.length === 0 ? (
                <div className="absolute bottom-0 w-full text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    🎉 Sponsors Coming Soon!
                </div>
            ) : (
                <div className="absolute bottom-0 w-11/12 bg-slate-950/5 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-center mt-6 gap-2 sm:gap-4 py-2 sm:py-4">
                    <p className="text-base sm:text-lg font-thin text-white/70">
                        Supported By Leading Brands
                    </p>
                    <div className="hidden sm:block h-5 w-[1px] bg-white/70 mx-2" />
                    <LogoCarousel sponsors={sponsors} />
                </div>
            )}
        </section>
    );
};

export default HeroSection;
