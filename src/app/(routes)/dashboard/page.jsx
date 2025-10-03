import { auth } from '@/src/auth';
import DashboardSectionRenderer from '@/src/components/Dashboard/dashboardSectionRenderer';
import DashboardSideBar from '@/src/components/Dashboard/dashboardSideBar';
import { getUserFromDB } from '@/src/serverAction/userAction';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Dashboard() {
    const session = await auth();
    const profile = await getUserFromDB(session.user.email);

    if (!session) {
        redirect('/api/auth/signin');
    }

    return (
        <>
            {profile && !profile?.verified && (
                <div className="w-full bg-red-500 text-xs text-center p-1">
                    <p>Account not verified</p>
                    <p>Check your email for verification link</p>
                </div>
            )}

            <div className="flex flex-col lg:flex-row h-screen dark:bg-background dark:text-primary">
                <DashboardSideBar profile={profile} session={session} />

                {/* Main Content */}
                <div className="flex-1 pt-10 p-6">
                    <DashboardSectionRenderer
                        profile={profile}
                        session={session}
                    />
                </div>
            </div>
        </>
    );
}
