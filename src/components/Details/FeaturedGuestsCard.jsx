// FeaturedGuestsCard.js
import Image from 'next/image';
import React from 'react';
import { CiLinkedin } from 'react-icons/ci';
const FeaturedGuestsCard = ({ image, name, title, bio, socialLinks, role }) => {
    return (
        <div className="p-6 rounded-lg flex items-center gap-6 shadow-sm cursor-pointer bg-slate-50 dark:bg-muted">
            <Image
                src={image || '/default-guest-image.jpg'} // Default image if not available
                alt={name}
                width={80}
                height={80}
                className="w-20 h-20 sm:w-20 sm:h-20 rounded-full object-cover hover:scale-105 duration-300"
            />
            <div className="w-full">
                <h4 className="text-base sm:text-lg font-bold text-background border-b dark:broder-background">
                    {name}
                </h4>
                <p className="text-sm text-background mb-4">{role}</p>
                <p className="text-sm text-background">{title}</p>
                <p className="text-sm text-background mt-3">{bio}</p>
                <div className="flex justify-center items-center gap-1 mt-2">
                    <CiLinkedin sixe={30} className="text-blue-700" />
                    <a
                        href={socialLinks}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FeaturedGuestsCard;
