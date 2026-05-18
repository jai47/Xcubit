import { auth } from '@/src/auth';
import DashboardSectionRenderer from '@/src/components/Dashboard/dashboardSectionRenderer';
import DashboardSideBar from '@/src/components/Dashboard/dashboardSideBar';
import { teamAndEventUserGET } from '@/src/serverAction/teamAction';
import { getUserFromDB } from '@/src/serverAction/userAction';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Dashboard() {
    const session = await auth();
    const profile = await getUserFromDB(session?.user?.email);
    const userTeams = await teamAndEventUserGET(profile);

    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <>
            {profile && !profile?.verified && (
                <div className="w-full bg-red-500 text-xs text-center p-1 text-white">
                    <p>Account not verified</p>
                    <p>Check your email for verification link</p>
                </div>
            )}

            <div className="flex flex-col lg:flex-row h-screen dark:bg-background dark:text-primary">
                <DashboardSideBar profile={profile} session={session} />

                {/* Main Content */}
                <div className="flex-1 pt-10 p-6 bg-neutral-950 overflow-scroll">
                    <DashboardSectionRenderer
                        profile={profile}
                        session={session}
                        userTeams={userTeams?.data || null}
                    />
                </div>
            </div>
        </>
    );
}
