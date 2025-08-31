'use client';

import gsap from 'gsap';
import { CiLinkedin, CiFacebook, CiInstagram } from 'react-icons/ci';
import Image from '../Image';
import FiltersSection from '../FiltersSection/FiltersSection';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import HeroTimeRemaining from '../Details/HeroTimeRamaining';

const HeroSection = () => {
    const socialIconsRef = useRef(null);
    const headingRef = useRef(null);
    const subheading1Ref = useRef(null);
    const subheading2Ref = useRef(null);

    useGSAP(
        () => {
            const links = socialIconsRef.current?.querySelectorAll('a'); // Select all child <a> tags

            gsap.from(links, {
                x: -50,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: 'power4.out',
                stagger: 0.2, // Apply stagger to child elements
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

    return (
        <section
            className="w-screen h-screen text-background overflow-hidden select-none"
            style={{
                backgroundImage: `
                    linear-gradient(to bottom right, rgba(20, 22, 52), rgba(10, 10, 10), rgba(38, 20, 45, 0.85)),
                    url('/hero.jpg')
                `,
                backgroundPosition: '0 100%, 100% 100%',
                backgroundRepeat: 'no-repeat, no-repeat',
                backgroundSize: 'auto, 1525px',
            }}
        >
            {/* Left Social Links */}
            <div
                ref={socialIconsRef}
                className="fixed left-0 top-0 h-screen w-16 flex-col items-center justify-center hidden md:flex lg:flex z-10"
            >
                <div className="flex flex-col gap-16 items-center justify-center z-10">
                    <Link
                        href="https://www.linkedin.com/company/xcubit/"
                        target="_blank"
                    >
                        <CiLinkedin size={20} />
                    </Link>
                    <Link href="https://www.linkedin.com/company/xcubit/">
                        <CiFacebook size={20} />
                    </Link>
                    <Link href="https://www.linkedin.com/company/xcubit/">
                        <CiInstagram size={20} />
                    </Link>
                </div>
                <span className="text-sm absolute bottom-28 tracking-[10px] -rotate-90 whitespace-nowrap selection:bg-main selection:text-white">
                    Follow us on
                </span>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center gap-5">
                <h1 className="text-9xl font-sans font-medium tracking-wide bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                    Xcubiton
                </h1>
                <h1 className="text-8xl font-sans font-medium tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                    AI for Good Hackathon
                </h1>
                <HeroTimeRemaining
                    data={new Date('2025-12-25T10:00:00')}
                    className="text-5xl"
                />
                <p className="font-extralight text-xs text-center mt-5">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Suscipit, sit obcaecati quas numquam eius fugiat nisi eaque
                    sed commodi voluptatibus, iusto adipisci nobis, corrupti
                    <br />
                    omnis similique veniam sunt. Deleniti, ratione? design and
                    cutting-edge technology.
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
