'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaQrcode, FaCog } from 'react-icons/fa';
import gsap from 'gsap';

const Ticket = ({ name, image, qrCode }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            cardRef.current,
            { y: 80, opacity: 0, rotateX: -15 },
            { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power4.out' }
        );
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-gray-900">
            <div className="relative" ref={cardRef}>
                {/* Lanyard string */}
                <div className="absolute rotate-180 -top-16 left-1/2 -translate-x-1/2">
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-4 h-44 bg-gradient-to-l from-green-900 to-green-700 rounded-full origin-top rotate-12 -z-[1]" />
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-4 h-44 bg-green-900 rounded-full origin-top -rotate-12" />
                </div>
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-7 h-2 bg-black rounded-full" />
                {/* Ticket Card */}
                <div className="bg-white rounded-3xl shadow-2xl border-4 border-green-900 px-6 py-8 w-[320px] flex flex-col items-center">
                    {/* QR Code */}
                    {qrCode ? (
                        <Image
                            src={qrCode}
                            alt="QR Code"
                            width={200}
                            height={200}
                            className="rounded-xl border-2 border-green-900"
                        />
                    ) : (
                        <FaQrcode className="w-40 h-40 text-green-800" />
                    )}

                    {/* Profile */}
                    <div className="-mt-12 mb-4 rounded-full border-4 border-white shadow-md overflow-hidden">
                        <Image src={image} alt={name} width={64} height={64} />
                    </div>

                    {/* Label */}
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <span className="w-2 h-2 bg-orange-600 rounded-full" />
                        Enter Pass
                    </p>

                    {/* Name */}
                    <h2 className="mt-1 text-xl font-bold text-black">
                        {name}
                    </h2>
                </div>

                {/* Bottom Controls */}
                <div className="flex justify-between mt-4 text-gray-300 px-6">
                    <button className="p-2 bg-gray-800 rounded-full">
                        <FaCog className="text-white" />
                    </button>
                    <p className="text-xs tracking-wide">ON MY ENTER PASS</p>
                    <button className="p-2 bg-gray-800 rounded-full">
                        <FaQrcode className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
