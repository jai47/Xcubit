'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getEventBySlug } from '@/src/serverAction/eventAction';
import { getUserFromDB } from '@/src/serverAction/userAction';
import { createTeam, joinTeam } from '@/src/serverAction/teamAction';
import Navbar from '@/src/components/layout/NavbarHome';
import Button from '@/src/components/Button';
import Loading from '@/src/app/loading';
import useEvent from '@/src/hooks/useEvent';

function RegistrationForm() {
    const router = useRouter();

    const { data: session } = useSession();
    const event = useEvent();

    const [user, setUser] = useState(null);
    const [teamCode, setTeamCode] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch User
    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchUser = async () => {
            setLoading(true);
            try {
                const user = await getUserFromDB(session.user.email);
                setUser(user);
            } catch (err) {
                console.error('Error fetching user:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [session]);

    if (!session) return null;

    // Check profile completeness
    const isProfileComplete = (user) => {
        const requiredFields = [
            'name',
            'phoneNumber',
            'dateOfBirth',
            'gender',
            'address',
            'city',
            'stateOrProvince',
            'country',
            'postalCode',
        ];
        return requiredFields.every((field) => user?.[field]);
    };

    const handleCreateTeam = async () => {
        try {
            const res = await createTeam({
                eventId: event._id,
                leaderId: user._id,
                name: `${user.name.split(' ')[0]}'s Team`,
            });
            if (res.success) {
                alert(
                    `Team created successfully! Share code: ${res.team.teamCode}`
                );
                router.push(`/dashboard?section=My+Teams`);
            } else {
                alert(res.message || 'Failed to create team');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleJoinTeam = async () => {
        try {
            const res = await joinTeam({ teamCode, userId: user._id });
            if (res.success) {
                alert('Joined team successfully!');
                router.push(`/dashboard?section=My+Teams`);
            } else {
                alert(res.message || 'Failed to join team');
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            <Navbar />
            {!event ? (
                <div className="min-h-screen flex items-center justify-center">
                    Event not found
                </div>
            ) : !isProfileComplete(user) ? (
                <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-neutral-950">
                    <h2 className="text-xl font-bold text-white">
                        Profile Incomplete
                    </h2>
                    <p className="mt-2 text-gray-500">
                        Please complete your profile before registering in this
                        event.
                    </p>
                    <Button
                        text="Complete Profile"
                        onClick={() => router.push('/profile')}
                        className="mt-4"
                    />
                </div>
            ) : (
                <div className="min-h-screen flex flex-col items-center justify-center p-4">
                    <h2 className="text-2xl font-bold text-center">
                        Register for {event.name}
                    </h2>

                    {/* If already in a team for this event */}
                    {user?.teams?.some((team) => team.event === event._id) ? (
                        <div className="mt-6 text-center">
                            <p className="text-green-500">
                                ✅ You are already registered in a team for this
                                event.
                            </p>
                            <Button
                                text="Go to Dashboard"
                                onClick={() =>
                                    router.push('/dashboard?section=My+Teams')
                                }
                                className="mt-4"
                            />
                        </div>
                    ) : (
                        <div className="mt-6 w-full max-w-md space-y-6">
                            <Button
                                text="Create New Team"
                                onClick={handleCreateTeam}
                                className="w-full"
                            />
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter Team Code"
                                    value={teamCode}
                                    onChange={(e) =>
                                        setTeamCode(e.target.value)
                                    }
                                    className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                                />
                                <Button
                                    text="Join Team"
                                    onClick={handleJoinTeam}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <RegistrationForm />
        </Suspense>
    );
}
