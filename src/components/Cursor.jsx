'use client';
import React, { useEffect } from 'react';
import { mouseMove } from '../utils/animations';

const Cursor = () => {
    useEffect(() => {
        window.addEventListener('mousemove', mouseMove);
        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, []);
    return (
        <div
            id="cursor"
            className="fixed top-0 left-0 h-[20px] w-[20px] rounded-full bg-gray-100/90 z-50 pointer-events-none hidden md:block lg:block dark:bg-white mix-blend-exclusion"
        />
    );
};

export default Cursor;
