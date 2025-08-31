import Image from 'next/image';
import React from 'react';

const HomeAbout = () => {
    return (
        <div className="w-full bg-neutral-950 font-sans pb-20 relative">
            {/* Background gradient */}
            <div className="absolute top-0 h-full w-full bg-[radial-gradient(ellipse_40%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] md:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>

            {/* Content */}
            <div className="w-full h-full max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-10 relative">
                {/* Left Text */}
                <div className="flex-1">
                    <h2 className="text-2xl md:text-5xl mb-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white/70 to-gray-100/50">
                        About Xcubiton 2026
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base lg:text-lg max-w-md">
                        Xcubiton 2025 is the premier tech and industry hackathon
                        bringing together the brightest minds from around the
                        globe. Over 48 hours, participants will tackle
                        real-world challenges using cutting-edge technologies
                        like AI, blockchain, IoT, and more. With over $100,000
                        in prizes, mentorship from industry experts, and
                        networking opportunities with leading tech companies,
                        Xcubiton is your gateway to innovation and career
                        advancement.
                    </p>

                    {/* Stats */}
                    <div className="w-full text-white/90 mt-10">
                        <ul className="flex flex-wrap justify-start gap-8 md:gap-14">
                            <li className="min-w-[80px]">
                                <p className="font-sans font-medium tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-fuchsia-200 to-rose-200/75">
                                    500+
                                </p>
                                <p className="text-sm">Participant</p>
                            </li>
                            <li className="min-w-[80px]">
                                <p className="font-sans font-medium tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-fuchsia-200 to-rose-200/75">
                                    48
                                </p>
                                <p className="text-sm">Hours</p>
                            </li>
                            <li className="min-w-[80px]">
                                <p className="font-sans font-medium tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-fuchsia-200 to-rose-200/75">
                                    $10k
                                </p>
                                <p className="text-sm">Prize Pool</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex-1 flex justify-center md:justify-end">
                    <Image
                        src="/hero.jpg"
                        alt="template"
                        width={500}
                        height={500}
                        className="rounded-lg object-cover h-auto w-full max-w-sm md:max-w-md lg:max-w-lg shadow"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeAbout;
