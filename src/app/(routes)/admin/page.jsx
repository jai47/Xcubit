import { auth } from '@/src/auth';
import React from 'react';
import { redirect } from 'next/navigation';

import Sidebar from '@/src/components/Admin/sidebar';
import AdminRenderSection from '@/src/components/Admin/adminRenderSection';
import AdminNavbar from '@/src/components/Admin/adminNavbar';
import { eventGET } from '@/src/serverAction/eventAction';
import { getAllUsers, getUserFromDB } from '@/src/serverAction/userAction';
import { getAllQuery } from '@/src/serverAction/queryAction';

const AdminDashboard = async () => {
    const session = await auth();

    if (!session?.user?.email) {
        return redirect('login');
    }
    const user = await getUserFromDB(session?.user?.email);
    if (user.role !== 'admin') {
        redirect('/login');
    }

    let users = {};
    let events = {};
    let query = {};

    const eventsRes = await eventGET();
    events = eventsRes.data;

    const usersRes = await getAllUsers();
    users = usersRes.data;

    const queryRes = await getAllQuery();
    if (queryRes.success) query = queryRes.data;

    return (
        <div>
            {/* Navbar */}
            <AdminNavbar events={events} users={users} query={query} />

            {/* Main Layout */}
            <main
                className="flex h-screen"
                style={{ height: 'calc(100vh - 4rem)' }}
            >
                {/*Sidebar*/}
                <Sidebar query={query} />

                {/* Section */}
                <AdminRenderSection
                    events={events}
                    users={users}
                    query={query}
                />
            </main>
        </div>
    );
};

export default AdminDashboard;
