import React from 'react';
import { FaReact, FaNodeJs, FaPython, FaJava, FaGithub } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiNextdotjs } from 'react-icons/si';

const logos = [
    { id: 'react', icon: FaReact },
    { id: 'nextjs', icon: SiNextdotjs },
    { id: 'node', icon: FaNodeJs },
    { id: 'mongodb', icon: SiMongodb },
    { id: 'tailwind', icon: SiTailwindcss },
    { id: 'python', icon: FaPython },
    { id: 'java', icon: FaJava },
    { id: 'github', icon: FaGithub },
];

const LogoCarousel = () => {
    return (
        <div className="relative w-full overflow-hidden py-8 mx-auto flex items-center">
            {/* Sliding container */}
            <div className="flex w-max animate-logoSlide space-x-16">
                {[...logos, ...logos, ...logos, ...logos].map((logo, i) => {
                    const Icon = logo.icon;
                    return (
                        <div
                            key={`${logo.id}-${i}`}
                            className="text-white drop-shadow-xl hover:scale-110 transition-transform duration-300"
                        >
                            <Icon size={50} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LogoCarousel;
