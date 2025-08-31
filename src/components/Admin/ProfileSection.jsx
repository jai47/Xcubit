import React from 'react';

const ProfileSection = ({ currentUser }) => {
    if (!currentUser) {
        return (
            <div className="flex items-center justify-center w-full h-full p-5 text-gray-200">
                <p className="text-lg">Loading profile...</p>
            </div>
        );
    }

    const {
        name,
        email,
        role,
        verified,
        address,
        city,
        country,
        dateOfBirth,
        gender,
        linkedInOrGithub,
        phoneNumber,
        postalCode,
        stateOrProvince,
    } = currentUser;

    return (
        <div className="w-full h-full p-8 text-gray-800 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden">
                <div className=" bg-gray-50 dark:bg-gray-700  text-gray-700 dark:text-gray-400 p-6">
                    <h1 className="text-4xl font-bold mb-2">
                        Welcome,{' '}
                        <span
                            className="text-primary"
                            style={{
                                backgroundImage:
                                    'linear-gradient(-45deg,#a855f7, #ec4899)',
                                color: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {name}
                        </span>
                    </h1>
                    <p className="text-lg">{email}</p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-500 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            Personal Details
                        </h2>
                        <p>
                            <strong>Role:</strong> {role}
                        </p>
                        <p>
                            <strong>Verified:</strong>{' '}
                            {verified ? (
                                <span className="text-green-500 font-semibold">
                                    Yes
                                </span>
                            ) : (
                                <span className="text-red-500 font-semibold">
                                    No
                                </span>
                            )}
                        </p>
                        <p>
                            <strong>Date of Birth:</strong>{' '}
                            {new Date(dateOfBirth).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Gender:</strong> {gender}
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            Contact Details
                        </h2>
                        <p>
                            <strong>Phone:</strong> {phoneNumber}
                        </p>
                        <p>
                            <strong>Address:</strong> {address}
                        </p>
                        <p>
                            <strong>City:</strong> {city}, {stateOrProvince}
                        </p>
                        <p>
                            <strong>Postal Code:</strong> {postalCode}
                        </p>
                        <p>
                            <strong>Country:</strong> {country}
                        </p>
                    </div>
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            LinkedIn/GitHub
                        </h2>
                        {linkedInOrGithub ? (
                            <a
                                href={linkedInOrGithub}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-medium underline"
                            >
                                {linkedInOrGithub}
                            </a>
                        ) : (
                            <p>No LinkedIn/GitHub profile provided.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
