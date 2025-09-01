'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import gsap from 'gsap';
import Image from 'next/image';
import { IoMdPlay } from 'react-icons/io';

const VideoPlayer = ({
    thumbnailUrl,
    videoUrl,
    title,
    description,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen && modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.9, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power3.out',
                }
            );
        }
    }, [isOpen]);

    return (
        <div className={`relative ${className}`}>
            {/* Thumbnail */}
            <div
                className="relative cursor-pointer group overflow-hidden rounded-xl scale-110 shadow-lg "
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={thumbnailUrl}
                    alt={title}
                    width={800}
                    height={450}
                    priority // 👈 ensures this image is preloaded (important for LCP)
                    quality={80} // 👈 balances size & clarity
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAIAAACzY+a1AAABsElEQVR4nO3b0QmEAAxEwQRS+HV+FuGHPJipQFh2iaD7m/9QdiPCuFsRxt3u14/AO1qYJ8I8Q5rnIs0zpHmGNE8L80SYZ0jztDDPS0WeIc0zpHkizDOkeVqY5yLNM6R5hj..."
                    className="w-full h-80 object-cover scale-110"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex flex-col items-center justify-center">
                    <button
                        aria-label={'Play Video'}
                        className="p-4 bg-white/20 backdrop-blur-md rounded-full hover:scale-110 transition-transform duration-300"
                    >
                        <IoMdPlay size={28} className="text-white" />
                    </button>
                    <h3 className="text-white font-semibold text-lg mt-3">
                        {title}
                    </h3>
                    <p className="text-gray-300 text-sm max-w-xs text-center px-4">
                        {description}
                    </p>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-3xl bg-black rounded-xl overflow-hidden shadow-xl"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
                        >
                            <FaTimes size={18} className="text-white" />
                        </button>

                        {/* Video */}
                        <iframe
                            className="w-full h-[500px] rounded-xl"
                            src={videoUrl}
                            title={title}
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
