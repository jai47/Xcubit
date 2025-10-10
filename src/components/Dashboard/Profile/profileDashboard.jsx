'use client';
import React from 'react';

const ProfileDashboard = ({ session, profile }) => {
    return (
        <div className="p-6 sm:p-8 rounded-2xl mx-auto w-full shadow-lg border border-neutral-800 bg-neutral-950 text-neutral-200">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-6 border-b border-neutral-700 pb-3 text-center md:text-left text-white">
                Profile
            </h2>

            {/* Profile Info */}
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                    <ProfileItem label="Name" value={session?.user?.name} />
                    <ProfileItem label="Email" value={session?.user?.email} />
                    {profile?.phone && (
                        <ProfileItem label="Phone" value={profile?.phone} />
                    )}
                    {profile?.address && (
                        <ProfileItem label="Address" value={profile?.address} />
                    )}
                    {profile?.city && (
                        <ProfileItem label="City" value={profile?.city} />
                    )}
                    {profile?.state && (
                        <ProfileItem
                            label="State/Province"
                            value={profile?.state}
                        />
                    )}
                    {profile?.postalCode && (
                        <ProfileItem
                            label="Postal Code"
                            value={profile?.postalCode}
                        />
                    )}
                    {profile?.country && (
                        <ProfileItem label="Country" value={profile?.country} />
                    )}
                    {profile?.dateOfBirth && (
                        <ProfileItem
                            label="Date of Birth"
                            value={new Date(
                                profile?.dateOfBirth
                            ).toDateString()}
                        />
                    )}
                    {profile?.gender && (
                        <ProfileItem label="Gender" value={profile?.gender} />
                    )}
                    {profile?.linkedInOrGithub && (
                        <div className="text-md">
                            <strong className="font-semibold text-white">
                                LinkedIn/GitHub:
                            </strong>{' '}
                            <a
                                href={profile?.linkedInOrGithub}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 hover:underline transition-all"
                            >
                                {profile?.linkedInOrGithub.includes('github')
                                    ? 'GitHub Profile'
                                    : 'LinkedIn Profile'}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProfileItem = ({ label, value }) => (
    <p className="sm:text-lg text-neutral-300">
        <strong className="font-semibold text-white">{label}:</strong>{' '}
        <span className="text-neutral-400 break-words">{value}</span>
    </p>
);

export default ProfileDashboard;
