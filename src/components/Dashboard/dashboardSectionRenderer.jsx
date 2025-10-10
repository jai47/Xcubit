'use client';
import React, { useEffect, useState } from 'react';
import ProfileDashboard from './Profile/profileDashboard';
import TicketDashboard from './Tickets/ticketDashboard';
import EventDashboard from './Events/eventDashboard';
import BookmarkDashboard from './Bookmarks/bookmarkDashboard';
import SettingsDashboard from './Settings/settingsDashboard';
import { useSearchParams } from 'next/navigation';

const DashboardSectionRenderer = ({ profile, session, userTeams }) => {
    const searchParams = useSearchParams();
    const querySection = searchParams.get('section') || 'Profile';
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

    switch (querySection) {
        case 'Profile':
            return <ProfileDashboard session={session} profile={profile} />;

        case 'My Tickets':
            return <TicketDashboard profile={profile} userTeams={userTeams} />;

        case 'My Events':
            return <EventDashboard userTeams={userTeams} />;

        case 'Bookmarks':
            return <BookmarkDashboard bookmarkedEvents={bookmarkedEvents} />;

        case 'Settings':
            return <SettingsDashboard profile={profile} session={session} />;

        default:
            return <ProfileDashboard session={session} profile={profile} />;
    }
};

export default DashboardSectionRenderer;
