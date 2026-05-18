'use client';
import gsap from 'gsap';
import React from 'react';

const Button = ({ text, type, onClick, className }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${
                className || 'bg-green-500 px-2 py-1 rounded-full text-sm'
            }`}
        >
            {text}
        </button>
    );
};

export default Button;
