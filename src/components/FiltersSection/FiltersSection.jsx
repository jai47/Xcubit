'use client';

import { useEffect, useState, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { GoArrowUpRight } from 'react-icons/go';
import Link from 'next/link';
import gsap from 'gsap';

const FiltersSection = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchParameters, setSearchParameters] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data = await response.json();
                setEvents(data.events);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleSearchClick = () => {
        setIsSearching((prev) => !prev);

        if (!isSearching) {
            gsap.to(inputRef.current, {
                width: '90%',
                opacity: 1,
                duration: 0.3,
                ease: 'power4.out',
            });
        } else {
            setFilteredEvents([]);
            setSearchParameters('');
            gsap.to(inputRef.current, {
                width: '0',
                opacity: 0,
                duration: 0.3,
                ease: 'power4.out',
            });
        }
    };

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setSearchParameters(searchValue);

        if (searchValue) {
            const matchingEvents = events.filter((e) =>
                e.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredEvents(matchingEvents);
        } else {
            setFilteredEvents([]);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full max-w-screen-sm h-16 pr-2 z-10 dark:bg-background dark:text-primary">
            <div className="flex w-full items-center justify-end gap-2">
                <div
                    ref={inputRef}
                    className="w-0 opacity-0 overflow-hidden transition-all duration-300"
                >
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        value={searchParameters}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 text-background border border-black focus:outline-none focus:border-black"
                        autoComplete="off"
                    />
                    {filteredEvents.length > 0 && (
                        <ul className="absolute border mt-2 max-h-40 w-full overflow-y-auto">
                            {filteredEvents.map((event) => (
                                <Link
                                    key={event._id}
                                    href={`/events/${event.name}`}
                                >
                                    <li className="flex items-center justify-between px-4 py-4 bg-primary hover:bg-slate-50 cursor-pointer border-b dark:bg-background dark:hover:bg-slate-800">
                                        {event.name}
                                        <GoArrowUpRight />
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="cursor-pointer" onClick={handleSearchClick}>
                    <CiSearch size={35} />
                </div>
            </div>
        </div>
    );
};

export default FiltersSection;
