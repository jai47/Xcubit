'use client';
import gsap from 'gsap';
import React from 'react';

const Button = ({ text, type, onClick, className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-primary text-background border uppercase text-sm border-black py-2 px-8 mt-3 rounded-full hover:bg-main hover:border-primary hover:text-primary transition-all dark:border-white dark:bg-background dark:text-primary ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
