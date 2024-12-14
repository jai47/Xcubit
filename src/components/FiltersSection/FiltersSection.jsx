// components/FiltersSection.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const FiltersSection = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchParameters, setSearchParameters] = useState({
        search: '',
        place: '',
        time: '',
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                let data = await response.json();
                setEvents(data.events);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        const searchName = event.target.name;
        setSearchParameters((prev) => ({
            ...prev,
            [searchName]: searchValue,
        }));

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
        <div className="bg-neutral-800 text-white shadow-lg rounded-lg p-6 flex flex-wrap justify-between items-center max-w-6xl mx-auto -mt-12">
            {/* Search Event Input */}
            <div className="flex-1 sm:flex-auto sm:mr-4 mb-4 sm:mb-0 relative">
                <label className="text-sm text-white mb-2 block">
                    Search Event
                </label>
                <input
                    type="text"
                    name="search"
                    placeholder="Ideathon"
                    value={searchParameters.search}
                    onChange={handleSearchChange}
                    className="bg-neutral-800 border-b border-gray-500 text-white px-4 py-2 focus:outline-none focus:border-white w-full"
                    autoComplete="off"
                />
                {/* Dropdown Menu */}
                {filteredEvents.length > 0 && (
                    <ul className="absolute bg-neutral-700 text-white mt-2 w-full max-h-40 overflow-y-auto shadow-lg rounded-sm z-10">
                        {filteredEvents.map((event) => (
                            <Link
                                key={event._id}
                                href={`/events/${event.name}`}
                            >
                                <li className="px-4 py-4 hover:bg-neutral-600 cursor-pointer border-b border-neutral-600">
                                    {event.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>

            {/* Place Select */}
            <div className="flex-1 sm:flex-auto sm:mr-4 mb-4 sm:mb-0 hidden sm:block">
                <label className="text-sm text-white mb-2 block">Place</label>
                <select
                    onChange={(e) =>
                        setSearchParameters((prev) => ({
                            ...prev,
                            place: e.target.value,
                        }))
                    }
                    className="bg-neutral-800 border-b border-gray-500 text-white px-4 py-2 focus:outline-none focus:border-white w-full"
                >
                    <option value="">Select Place</option>
                    <option value="Faridabad">Faridabad</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Online">Online</option>
                </select>
            </div>

            {/* Time Select */}
            <div className="flex-1 sm:flex-auto mb-4 sm:mb-0 hidden sm:block">
                <label className="text-sm text-white mb-2 block">Time</label>
                <select
                    onChange={(e) =>
                        setSearchParameters((prev) => ({
                            ...prev,
                            time: e.target.value,
                        }))
                    }
                    className="bg-neutral-800 border-b border-gray-500 text-white px-4 py-2 focus:outline-none focus:border-white w-full"
                >
                    <option value="">Select Time</option>
                    <option value="Today">Today</option>
                    <option value="This Week">This Week</option>
                </select>
            </div>
        </div>
    );
};

export default FiltersSection;
