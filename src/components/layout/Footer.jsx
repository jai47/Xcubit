import Image from 'next/image';
import logo1 from '../../../public/logo/logo.png';
import { CiLinkedin, CiFacebook, CiInstagram } from 'react-icons/ci';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-[#030303] text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-4">
                    {/* Logo */}
                    <div className="flex justify-center items-center gap-4 mb-4 md:mb-0">
                        <Image
                            src={logo1}
                            alt="Xcubit Logo"
                            width={70}
                            height={50}
                        />
                        <span className="text-3xl font-black text-white">
                            XCUBIT
                        </span>
                    </div>

                    {/* Social + Links */}
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                        {/* Links */}
                        <div className="flex space-x-6 text-sm">
                            <Link
                                href="/privacy-policy"
                                className="hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/term-condition"
                                className="hover:text-white transition-colors"
                            >
                                Terms
                            </Link>
                        </div>

                        {/* Socials */}
                        <div className="flex space-x-4 text-gray-400 hover:text-white transition-colors">
                            <Link
                                href="https://www.linkedin.com/company/xcubit/"
                                target="_blank"
                                className="hover:text-[#0A66C2]"
                            >
                                <CiLinkedin size={22} />
                            </Link>
                            <Link
                                href="https://www.facebook.com/"
                                target="_blank"
                                className="hover:text-[#1877F2]"
                            >
                                <CiFacebook size={22} />
                            </Link>
                            <Link
                                href="https://www.instagram.com/"
                                target="_blank"
                                className="hover:text-pink-500"
                            >
                                <CiInstagram size={22} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm">
                    <div className="flex space-x-6">
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>
                        <Link href="/events" className="hover:text-white">
                            Events
                        </Link>
                        <Link href="/about" className="hover:text-white">
                            About Us
                        </Link>
                        <Link href="/contact" className="hover:text-white">
                            Support
                        </Link>
                    </div>
                    <p className="mt-4 md:mt-0 text-xs md:text-sm text-gray-500">
                        ©️ 2024 Xcubit. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
