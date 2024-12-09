import Image from 'next/image';
import logo1 from '../../../public/logo/logo.png';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-neutral-600 text-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Footer Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* 1st Section: Logo and Social Media */}
                    <div className="flex flex-col items-center lg:items-start space-y-6">
                        <Image
                            src={logo1}
                            alt="VIEF Logo"
                            className="h-16 w-auto"
                        />
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com/VIEF"
                                className="hover:text-gray-400"
                                aria-label="Facebook"
                            >
                                <FaFacebookF size={20} />
                            </a>
                            <a
                                href="https://x.com/VIEF"
                                className="hover:text-gray-400"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={20} />
                            </a>
                            <a
                                href="https://youtube.com/VIEF"
                                className="hover:text-gray-400"
                                aria-label="YouTube"
                            >
                                <FaYoutube size={20} />
                            </a>
                            <a
                                href="https://linkedin.com/company/VIEF"
                                className="hover:text-gray-400"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* 2nd Section: Useful Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Useful Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="hover:text-gray-400">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/routes/about"
                                    className="hover:text-gray-400"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/routes/event"
                                    className="hover:text-gray-400"
                                >
                                    Events
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/routes/contact"
                                    className="hover:text-gray-400"
                                >
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-400">
                                    Terms and Conditions
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 3rd Section: Careers */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Careers</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://vief.vercel.app/careers/vief"
                                    className="hover:text-gray-400"
                                >
                                    Jobs at VIEF
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vief.vercel.app/careers/volunteer"
                                    className="hover:text-gray-400"
                                >
                                    Jobs as Volunteer
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vief.vercel.app/careers/internship"
                                    className="hover:text-gray-400"
                                >
                                    Apply for Internship
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://vief.vercel.app/careers/startups"
                                    className="hover:text-gray-400"
                                >
                                    Jobs at Startups
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 4th Section: Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Subscribe to our Newsletter
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                            VIEF empowers aspiring entrepreneurs with the
                            resources and support to turn ideas into reality.
                            Join our vibrant community, connect with mentors,
                            and be the change for India's future.
                        </p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 pr-32 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="border-t border-gray-700 mt-10 pt-6">
                    <p className="text-center text-sm text-gray-400">
                        Copyright ©️ 2024 VIEF | All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
