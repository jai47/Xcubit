'use client';

import gsap from 'gsap';
import { CiLinkedin, CiFacebook, CiInstagram } from 'react-icons/ci';
import Image from '../Image';
import FiltersSection from '../FiltersSection/FiltersSection';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

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
        <section className="w-screen h-screen text-background flex flex-col justify-center items-center gap-10 md:flex-row md:justify-between md:gap-0 dark:bg-background dark:text-primary bg-[#000000]">
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
            <div className="h-screen w-16 hidden md:block" />
            {/* Center Content */}
            <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
                <p ref={subheading1Ref} className="text-sm tracking-widest">
                    WE CREATE EVENTS...
                </p>
                <h1
                    className="text-7xl md:text-9xl font-black cursor-default"
                    style={{ fontFamily: 'Times New Roman' }}
                    ref={headingRef}
                >
                    XCUBIT
                </h1>
                <div className="w-full flex justify-end items-center">
                    <p ref={subheading2Ref} className="text-sm tracking-widest">
                        ...WE ORGANISE EVENTS
                    </p>
                </div>
            </div>

            <div className="w-full px-5 flex justify-center items-center mt-10 md:hidden">
                <FiltersSection />
            </div>
            {/* Right Image */}
            <Image
                src={
                    'https://ik.imagekit.io/rwavrzuyv/pablo-heimplatz-ZODcBkEohk8-unsplash.jpg?tr=h-600%2Cw-700'
                }
                alt="Background"
                width={700}
                height={700}
                className="hidden md:block"
            />
        </section>
    );
};

export default HeroSection;
