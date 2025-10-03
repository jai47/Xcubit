'use client';
import { useEffect, useState, useRef } from 'react';
import Image from '@/src/components/Image';

export default function EventDetailsHeroImage({ src, alt }) {
    const [offset, setOffset] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const scrollTop = window.scrollY || window.pageYOffset;

            // How far the hero is from the top of the viewport
            const elementTop = rect.top + scrollTop;

            // Current scroll position relative to the hero
            const relativeY = scrollTop - elementTop;

            // Adjust speed (smaller factor = slower movement = better parallax feel)
            setOffset(relativeY * 0.3);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // run once on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover will-change-transform"
                style={{
                    transform: `translateY(${offset}px)`,
                    transition: 'transform 0.05s linear',
                }}
            />
        </div>
    );
}
