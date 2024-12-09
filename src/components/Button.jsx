'use client';
import React from 'react';

const Button = ({ event, text }) => {
    return (
        <button className="text-gray-800 border border-gray-500 py-2 px-8 mt-3 rounded-full hover:bg-gray-600 hover:border-gray-700 hover:text-white transition-all">
            {text}
        </button>
    );
};

export default Button;
