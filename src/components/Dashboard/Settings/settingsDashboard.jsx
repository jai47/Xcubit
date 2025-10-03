import React, { useState } from 'react';
import { updateForgotPasswordToken } from '@/src/serverAction/userAction';

const SettingsDashboard = ({ profile, session }) => {
    const [showModal, setShowModal] = useState({
        visible: false,
        message: '',
    });
    return (
        <div className="p-6   shadow-lg rounded-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2  ">
                Settings
            </h2>
            <div className="space-y-6">
                {/* Notifications Toggle */}
                <div className="flex justify-between items-center p-4   border border-gray-200 rounded-lg shadow-md">
                    <p className="text-lg font-medium  ">Email Notifications</p>
                    <label className="relative flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="flex justify-start items-center  px-1 w-10 h-6 bg-gray-300 rounded-full shadow-inner peer-checked:bg-slate-800 peer-checked:justify-end transition duration-200">
                            <div className="w-4 h-4 bg-white rounded-full shadow-sm shadow-slate-400 transform peer-checked:translate-x-4 transition duration-200"></div>
                        </div>
                    </label>
                </div>
                <div className="flex justify-between items-center p-4   border border-gray-200 rounded-lg shadow-md">
                    <p className="text-lg font-medium  ">Clear Bookmarks</p>
                    <label className="relative flex items-center cursor-pointer">
                        <button
                            className="w-full h-[50px] bg-main text-white px-10 rounded-full transition-all duration-300 dark:bg-background dark:hover:bg-main dark:border dark:border-primary"
                            onClick={() => {
                                try {
                                    document.cookie =
                                        'bookmarks=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                                    alert('Bookmarks cleared');
                                } catch (error) {
                                    alert('Error clearing bookmarks:', error);
                                }
                            }}
                        >
                            Clear
                        </button>
                    </label>
                </div>
                {/* Change Password Button */}
                {showModal?.visible && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-10">
                        <div className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-md">
                            {/* Close Button */}
                            <button
                                onClick={() =>
                                    setShowModal({
                                        visible: false,
                                        message: '',
                                    })
                                }
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            {/* Modal Content */}
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Password Reset Link Sent!
                                </h2>
                                <p className="text-gray-600">
                                    {showModal?.message}
                                </p>
                                <button
                                    onClick={() =>
                                        setShowModal({
                                            visible: false,
                                            message: '',
                                        })
                                    }
                                    className="mt-6 px-4 py-2 bg-blue-600   rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex w-full justify-end gap-3">
                    {/* Resend Verification Email */}
                    {profile && !profile?.verified && (
                        <button
                            onClick={async () => {
                                if (timer > 0) return; // Prevent clicking while timer is active
                                try {
                                    await fetch(
                                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mail`,
                                        {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type':
                                                    'application/json',
                                            },
                                            body: JSON.stringify({
                                                email: profile.email,
                                                subject: `Welcome to the community, ${profile.name}`,
                                                message: {
                                                    name: profile.name,
                                                    verifyLink: `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${profile.verifyToken}`,
                                                    contactEmail:
                                                        'helpdesk@xcubit.in',
                                                },
                                                type: 'verify',
                                            }),
                                        }
                                    );
                                    setShowModal({
                                        visible: true,
                                        message:
                                            'A verification link has been sent to your registered email. Please check your inbox and follow the instructions.',
                                    });
                                    startTimer(); // Start the timer
                                } catch (error) {
                                    setShowModal({
                                        visible: true,
                                        message: error.message,
                                    });
                                }
                            }}
                            className={`text-green-600 border border-green-600 font-medium px-6 py-3 rounded-full ${
                                timer === 0
                                    ? 'hover:bg-green-300 transition duration-200'
                                    : 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={timer > 0} // Disable button if timer is active
                        >
                            {timer > 0
                                ? `Resend in ${timer}s`
                                : 'Send Verify Link Again'}
                        </button>
                    )}
                    <button
                        onClick={async () => {
                            try {
                                const { msg, sucess } =
                                    await updateForgotPasswordToken(
                                        session?.user?.email
                                    );

                                if (!sucess) {
                                    setShowModal({
                                        visible: true,
                                        message: msg,
                                    });
                                    return;
                                }
                                setShowModal({
                                    visible: true,
                                    message: msg,
                                });
                            } catch (error) {
                                setShowModal({
                                    visible: true,
                                    message: error.message,
                                });
                            }
                        }}
                        className="text-red-600 border border-red-600 font-medium px-6 py-3 rounded-full hover:bg-red-100 transition duration-200"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsDashboard;
