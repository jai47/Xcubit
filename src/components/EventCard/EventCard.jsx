'use client';
import Link from 'next/link';
import Image from '../Image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ image, date, title, description, price, category }) => {
    const cardRef = useRef(null);
    const imgRef = useRef(null);
    const titleRef = useRef(null);
    const dateRef = useRef(null);
    const categoryRef = useRef(null);
    const descRef = useRef(null);
    const detailsRef = useRef(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 80%', // Start animation when the top of the card is 80% of the viewport height
                    toggleActions: 'play none none reverse', // Play when entering, reverse when leaving
                },
            });

            tl.from(imgRef.current, {
                opacity: 0,
                y: 100,
                duration: 0.8,
            })
                .from(
                    titleRef.current,
                    { opacity: 0, y: 50, duration: 0.6 },
                    '-=0.4'
                )
                .from(
                    [dateRef.current, categoryRef.current],
                    { opacity: 0, y: 50, duration: 0.6 },
                    '-=0.4'
                )
                .from(
                    descRef.current,
                    { opacity: 0, y: 50, duration: 0.6 },
                    '-=0.4'
                )
                .from(
                    detailsRef.current,
                    { opacity: 0, y: 20, duration: 0.5 },
                    '-=0.3'
                );
        },
        { scope: cardRef.current }
    );

    return (
        <Link
            ref={cardRef}
            href={`/events/${title}`}
            className="flex flex-col justify-between  h-[430px] w-full sm:w-[350px] md:w-[300px] lg:w-[350px] overflow-hidden mb-10 cursor-pointer border border-gray-300 rounded-lg p-5"
        >
            <div className="group h-3/5 w-full relative " ref={imgRef}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    objectFit="cover"
                    className="scale-105 group-hover:scale-100 transition-transform duration-300  rounded-lg"
                    quality={70}
                />
                <div className="h-full w-full absolute bg-black bg-opacity-40 flex flex-col justify-center items-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-primary text-sm font-black uppercase">
                        View Details
                    </span>
                </div>
            </div>
            <div className="flex justify-between w-full">
                <p
                    ref={categoryRef}
                    className="uppercase text-[12px] text-muted mt-5 mb-5"
                >
                    {category}
                </p>
                <p
                    ref={dateRef}
                    className="text-[12px] text-background px-1 bg-gray-300 rounded-full mt-5 mb-5"
                >
                    {new Date(date).toDateString('hi-IN')}
                </p>
            </div>
            <p ref={titleRef} className="w-full leading-relaxed">
                <span className="text-4xl uppercase">{title?.charAt(0)}</span>
                <span className="text-sm"> {title?.substring(1)}</span>
            </p>
            <p ref={descRef} className="w-full leading-relaxed">
                <span className="text-sm">{description}</span>
            </p>
            <div ref={detailsRef} className="flex items-center mt-5 gap-5">
                <span className="text-[12px] uppercase font-black">
                    view details
                </span>
                <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    className="fill-background dark:fill-white"
                >
                    <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                </svg>
            </div>
        </Link>
    );
};

export default EventCard;
