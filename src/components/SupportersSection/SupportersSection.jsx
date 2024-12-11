// components/SupportersSection.jsx
import Image from 'next/image';

import logo from '../../../public/logo/ideathon.jpeg'; // Add logo
const SupportersSection = () => {
    const supporters = [logo, logo, logo, logo, logo, logo, logo, logo, logo]; // Add logos
    return (
        <section className="py-12 text-center w-full bg-gray-50">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800">
                Our Supporters
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
                We've had the pleasure of working with industry-defining brands.
                These are just some of them.
            </p>

            {/* Responsive Grid Layout for Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {supporters.map((logo, index) => (
                    <div
                        key={index}
                        className="opacity-100 animate-fadeIn hover:scale-110 transform transition duration-300 ease-in-out"
                    >
                        <Image
                            src={logo}
                            alt="Supporter"
                            className="mx-auto h-12 sm:h-16 md:h-20 lg:h-24"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SupportersSection;
