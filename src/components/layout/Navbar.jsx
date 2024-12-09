'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo/logo.png';

const Navbar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav
            className=" text-white px-6 py-3 sticky w-full z-20 top-0 start-0"
            style={{ background: '#525252' }}
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Left: Logo */}
                <Link href="/">
                    <div className="flex items-center space-x-2">
                        <Image src={logo} alt="Logo" height={45} priority />
                    </div>
                </Link>

                {/* Center: Navbar Links (Hidden on Small Screens) */}
                <div className="text-sm hidden md:flex items-center justify-end space-x-8">
                    <Link href="/" className="hover:text-gray-400">
                        Home
                    </Link>
                    <Link href="/events" className="hover:text-gray-400">
                        Events
                    </Link>
                    <Link href="/about" className="hover:text-gray-400">
                        About Us
                    </Link>
                    <Link
                        href={{
                            pathname: '/dashboard',
                            query: {
                                section: 'My Tickets',
                            },
                        }}
                        className="hover:text-gray-400"
                    >
                        Tickets
                    </Link>
                    <Link href="/contact" className="hover:text-gray-400">
                        Contact
                    </Link>

                    {/* Right: Login & Signup */}
                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <>
                                <Link
                                    href="/login"
                                    className="px-6 py-2 border border-gray-400 rounded-full hover:bg-gray-700 transition duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signin"
                                    className="px-6 py-2 border border-gray-400 rounded-full text-white hover:bg-gray-700 transition duration-300"
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <Link
                                href="/dashboard"
                                className="px-6 py-2 border border-gray-400 rounded-full text-white hover:bg-gray-700 transition duration-300"
                            >
                                <span>{user.name}</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Hamburger Menu (Visible on Small Screens) */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
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

            {/* Dropdown Menu (Visible on Mobile) */}
            {isOpen && (
                <div className="md:hidden transform transition-all duration-300 ease-in-out space-y-2 opacity-100 translate-y-0">
                    <Link
                        href="/"
                        className="block text-gray-200 hover:text-gray-400 text-center py-2"
                    >
                        Home
                    </Link>
                    <Link
                        href="/routes/event"
                        className="block text-gray-200 hover:text-gray-400 text-center py-2"
                    >
                        Events
                    </Link>
                    <Link
                        href="/routes/about"
                        className="block text-gray-200 hover:text-gray-400 text-center py-2"
                    >
                        About Us
                    </Link>
                    <Link
                        href={{
                            pathname: '/dashboard',
                            query: {
                                section: 'My Tickets',
                            },
                        }}
                        className="block text-gray-200 hover:text-gray-400 text-center py-2"
                    >
                        Tickets
                    </Link>
                    <Link
                        href="/routes/contact"
                        className="block text-gray-200 hover:text-gray-400 text-center py-2"
                    >
                        Contact
                    </Link>
                    {!user ? (
                        <>
                            <Link
                                href="/routes/login"
                                className="block text-gray-200 hover:text-gray-400 text-center py-2"
                            >
                                Login
                            </Link>
                            <Link
                                href="/routes/register"
                                className="block text-gray-200 hover:text-gray-400 text-center py-2"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <Link
                            href="/dashboard"
                            className="flex justify-center items-center"
                        >
                            <span className="px-6 py-2 border border-gray-400 rounded-full text-white hover:bg-gray-700 transition duration-300">
                                {user.name}
                            </span>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
