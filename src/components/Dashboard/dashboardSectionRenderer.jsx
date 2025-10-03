'use client';
import React, { useEffect, useState } from 'react';
import ProfileDashboard from './Profile/profileDashboard';
import TicketDashboard from './Tickets/ticketDashboard';
import EventDashboard from './Events/eventDashboard';
import BookmarkDashboard from './Bookmarks/bookmarkDashboard';
import SettingsDashboard from './Settings/settingsDashboard';
import { useSearchParams } from 'next/navigation';

const DashboardSectionRenderer = ({ profile, session }) => {
    const searchParams = useSearchParams();
    const querySection = searchParams.get('section') || 'Profile';
    const ticketQuery = searchParams.get('ticket');

    const [timer, setTimer] = useState(0);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

    useEffect(() => {
        // Define an async function within the effect
        const setEventTicket = async () => {
            try {
                if (
                    querySection == 'My Tickets' &&
                    ticketQuery &&
                    userData.user?.events
                ) {
                    const matchingEvent = userData.user.events.find(
                        (event) => event.name === ticketQuery
                    );
                    if (matchingEvent) {
                        setSelectedEvent(matchingEvent); // Preselect the ticket
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                // Access cookies only on the client side
                const cookie = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('bookmarks'));
                const events = cookie
                    ? JSON.parse(decodeURIComponent(cookie.split('=')[1]))
                    : [];
                setBookmarkedEvents(events);
            }
        };

        // Call the async function
        setEventTicket();
    }, [querySection, ticketQuery]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const showTicket = (value) => {
        setSelectedEvent(value); // Correctly toggle visibility
    };

    const startTimer = () => {
        setTimer(60);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };
    switch (querySection) {
        case 'Profile':
            return <ProfileDashboard session={session} profile={profile} />;

        case 'My Tickets':
            return (
                <TicketDashboard
                    profile={profile}
                    selectedEvent={selectedEvent}
                />
            );

        case 'My Events':
            return <EventDashboard profile={profile} />;

        case 'Bookmarks':
            return <BookmarkDashboard bookmarkedEvents={bookmarkedEvents} />;

        case 'Settings':
            return <SettingsDashboard profile={profile} session={session} />;

        default:
            return <ProfileDashboard session={session} profile={profile} />;
    }
};

export default DashboardSectionRenderer;
