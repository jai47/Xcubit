'use client';

import { useState } from 'react';

export default function TestEmailPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    async function handleSendEmail() {
        setLoading(true);
        setStatus('');

        try {
            const res = await fetch('/api/test-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    type: 'verify',
                    message: {
                        name: 'Jai',
                        verifyLink: 'https://xcubit.in/verify',
                    },
                    subject: 'Test Verification Email',
                }),
            });

            const result = await res.json();
            setStatus(result.message || 'Email sent successfully!');
        } catch (err) {
            console.error(err);
            setStatus('Error sending email');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-10 space-y-4">
            <h1 className="text-2xl font-bold">Test Email Sender</h1>
            <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border px-3 py-2 rounded w-80"
            />
            <button
                onClick={handleSendEmail}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? 'Sending...' : 'Send Test Email'}
            </button>
            {status && <p>{status}</p>}
        </div>
    );
}
