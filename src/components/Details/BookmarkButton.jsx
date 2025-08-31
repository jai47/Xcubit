'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const BookmarkButton = ({ cookie, value }) => {
    const { data: session } = useSession();
    const [isChecked, setIsChecked] = useState(false);

    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(
            JSON.stringify(value)
        )}; expires=${date.toUTCString()}; path=/`;
    };

    const getCookie = (name) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find((row) => row.startsWith(`${name}=`));
        return cookie
            ? JSON.parse(decodeURIComponent(cookie.split('=')[1]))
            : [];
    };

    useEffect(() => {
        if (cookie) {
            const savedValues = getCookie(cookie);
            if (!session) {
                setIsChecked(false);
                return;
            }
            setIsChecked(savedValues.includes(value));
        }
    }, [cookie, value]);

    const handleToggle = () => {
        if (!session) {
            alert('Please sign in to bookmark this event.');
            return;
        }
        if (cookie) {
            const savedValues = getCookie(cookie);
            let updatedValues;

            if (isChecked) {
                // Remove the value from the cookie array
                updatedValues = savedValues.filter((item) => item !== value);
            } else {
                // Add the value to the cookie array
                updatedValues = [...savedValues, value];
            }

            setCookie(cookie, updatedValues, 365);
            setIsChecked(!isChecked);
        }
    };

    return (
        <label
            className="relative flex items-center justify-center w-6 h-6 cursor-pointer"
            title="Bookmark"
        >
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
                className="hidden"
            />
            <div
                className={`relative w-6 h-6 flex items-center justify-center transition-colors duration-200 ${
                    isChecked
                        ? 'fill-yellow-500'
                        : 'fill-gray-500 hover:fill-gray-600'
                }`}
            >
                {/* SVG Bookmark */}
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                </svg>

                {/* Circle Effect */}
                <span
                    className={`absolute rounded-full border border-yellow-500 opacity-0 transition-all duration-300 ${
                        isChecked ? 'animate-expand' : ''
                    }`}
                ></span>

                {/* Exploding Effect */}
                <span
                    className={`absolute w-2.5 h-2.5 rounded-full shadow-circle transition-transform duration-300 ${
                        isChecked ? 'animate-explode' : 'scale-0'
                    }`}
                ></span>
            </div>
        </label>
    );
};

export default BookmarkButton;
