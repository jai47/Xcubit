'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const EventInputHorizontal = ({ name, icon, alt, placeholder, type }) => {
    const [input, setInput] = useState('');
    return (
        <div>
            <label htmlFor="event">{name.toUpperCase()}</label>
            <div>
                <Image src={icon} width={10} height={10} alt={alt} />
                <input type={type} placeholder={placeholder} />
            </div>
        </div>
    );
};

export default EventInputHorizontal;
