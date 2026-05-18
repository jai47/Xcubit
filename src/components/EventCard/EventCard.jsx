'use client';
import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const EventCard = ({ image, slug, date, title, description, category }) => {
    const cardRef = useRef(null);
    const imgRef = useRef(null);
    const titleRef = useRef(null);
    const dateRef = useRef(null);
    const categoryRef = useRef(null);
    const descRef = useRef(null);
    const detailsRef = useRef(null);
    const tooltipRef = useRef(null);

    useGSAP(() => {
        gsap.set(tooltipRef.current, { opacity: 0, scale: 0.9 });
    }, []);

    const handleMouseEnter = () => {
        gsap.to(tooltipRef.current, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.35,
            ease: 'power3.out',
        });
    };

    const handleMouseLeave = () => {
        gsap.to(tooltipRef.current, {
            opacity: 0,
            scale: 0.9,
            filter: 'blur(6px)',
            duration: 0.4,
            ease: 'power3.inOut',
        });
    };

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(tooltipRef.current, {
            x,
            y,
            duration: 1,
            ease: 'power3.out',
        });
    };

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
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
            href={`/events/${slug}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className="group relative flex flex-col justify-between h-[420px] w-full sm:w-[340px] md:w-[320px] lg:w-[340px] 
                       hover:z-10 rounded-2xl shadow-lg border border-white/10 bg-neutral-900 
                       hover:scale-[1.02] transition-transform duration-300"
        >
            {/* Event Image */}
            <div
                ref={imgRef}
                className="relative h-2/3 w-full rounded-t-2xl overflow-hidden"
            >
                <Image
                    src={image || '/promo1.jpg'}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 scale-[1.02] group-hover:scale-100"
                    quality={80}
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-semibold text-sm uppercase tracking-wider">
                        View Details
                    </span>
                </div>
            </div>

            {/* Event Info */}
            <div className="flex flex-col justify-between p-5">
                <p ref={dateRef} className="text-xs text-gray-400 mb-2">
                    {new Date(date).toDateString('hi-IN')}
                </p>
                <h3
                    ref={titleRef}
                    className="text-lg font-bold text-white mb-2 line-clamp-1"
                >
                    {title}
                </h3>
                <p
                    ref={descRef}
                    className="text-sm text-gray-300 line-clamp-2 mb-4"
                >
                    {description || 'Exciting event awaits you!'}
                </p>

                <div
                    ref={detailsRef}
                    className="flex items-center justify-between"
                >
                    <span className="text-xs uppercase font-semibold text-gray-300 group-hover:text-indigo-300 transition-colors">
                        View details
                    </span>
                    <svg
                        width="24"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        className="fill-indigo-300 group-hover:translate-x-1 transition-transform duration-300"
                    >
                        <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                    </svg>
                </div>
            </div>

            {/* Tooltip (hover-follow) */}
            <div
                ref={tooltipRef}
                className="hidden md:block lg:block absolute pointer-events-none z-50 bg-neutral-900/90 text-white text-xs px-3 py-2 
                           rounded-md max-w-[220px] backdrop-blur-md shadow-xl border border-white/10"
            >
                {description}
            </div>
        </Link>
    );
};

export default EventCard;
