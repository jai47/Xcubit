// components/SupportersSection.jsx
import Image from 'next/image';

import logo from '../../../public/logo/logo.png'; // Add logo
const SupportersSection = () => {
    const supporters = [logo, logo, logo, logo, logo, logo, logo, logo, logo]; // Add logos
    return (
        <section className="py-12 text-center w-screen">
            <h2 className="text-4xl font-bold mb-8 ">Our Supporters</h2>
            <p className="text-1xl  mb-8 ">
                We&apos;ve had the pleasure of working with industry-defining
                brands. These are just some of them.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
                {supporters.map((logo, index) => (
                    <Image
                        key={index}
                        src={logo}
                        alt="Supporter"
                        className="h-12"
                    />
                ))}
            </div>
        </section>
    );
};

export default SupportersSection;
