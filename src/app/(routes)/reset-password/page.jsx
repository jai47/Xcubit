'use client';
import React, { useState, Suspense } from 'react';
import { updatePassword } from '@/src/serverAction/userAction';
import { useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const tokens = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Success or error

    async function handleSubmit(event) {
        event.preventDefault();

        // Validate input
        if (!password || !confirm) {
            setMessageType('error');
            setMessage('Please fill out both fields.');
            return;
        }
        if (password !== confirm) {
            setMessageType('error');
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const success = await updatePassword(
                encodeURIComponent(tokens),
                password
            );
            if (success) {
                setMessageType('success');
                setMessage('Password updated successfully.');
            } else {
                setMessageType('error');
                setMessage('The token is invalid or expired.');
            }
        } catch (error) {
            setMessageType('error');
            setMessage('An error occurred. Please try again later.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Update Password
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirm"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirm"
                            id="confirm"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="Re-enter password"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update Password
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-center text-sm ${
                            messageType === 'success'
                                ? 'text-green-600'
                                : 'text-red-600'
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
