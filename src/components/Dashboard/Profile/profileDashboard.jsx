import React from 'react';

const ProfileDashboard = ({ session, profile }) => {
    console.log(profile, session);
    return (
        <div className="p-6 shadow-lg rounded-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Profile</h2>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                    <p className="  text-md">
                        <strong className="font-semibold">Name:</strong>{' '}
                        {session?.user?.name}
                    </p>
                    <p className="  text-md">
                        <strong className="font-semibold">Email:</strong>{' '}
                        {session?.user?.email}
                    </p>
                    {profile?.phone && (
                        <p className="text-md">
                            <strong className="font-semibold">Phone:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile?.phone}
                                    onChange={handleInputChange}
                                    className="border rounded px-2 py-1 w-full"
                                />
                            ) : (
                                profile?.phone
                            )}
                        </p>
                    )}
                    {profile?.address && (
                        <p className="text-md">
                            <strong className="font-semibold">Address:</strong>{' '}
                            {profile?.address}
                        </p>
                    )}
                    {profile?.city && (
                        <p className="text-md">
                            <strong className="font-semibold">City:</strong>{' '}
                            {profile?.city}
                        </p>
                    )}
                    {profile?.state && (
                        <p className="text-md">
                            <strong className="font-semibold">
                                State/Province:
                            </strong>{' '}
                            {profile?.state}
                        </p>
                    )}
                    {profile?.postalCode && (
                        <p className="  text-md">
                            <strong className="font-semibold">
                                Postal Code:
                            </strong>{' '}
                            {profile?.postalCode}
                        </p>
                    )}
                    {profile?.country && (
                        <p className="  text-md">
                            <strong className="font-semibold">Country:</strong>{' '}
                            {profile?.country}
                        </p>
                    )}
                    {profile?.dateOfBirth && (
                        <p className="  text-md">
                            <strong className="font-semibold">
                                Date of Birth:
                            </strong>{' '}
                            {new Date(profile?.dateOfBirth).toDateString(
                                'hi-IN'
                            )}
                        </p>
                    )}
                    {profile?.gender && (
                        <p className="  text-md">
                            <strong className="font-semibold">Gender:</strong>{' '}
                            {profile?.gender}
                        </p>
                    )}
                    {profile?.linkedInOrGithub && (
                        <p className="  text-md">
                            <strong className="font-semibold">
                                LinkedIn/GitHub:
                            </strong>{' '}
                            <a
                                href={profile?.linkedInOrGithub}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                LinkedIn Profile
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;
