import React, { useEffect, useRef } from 'react';
import QRCodeGenerator from './QRCodeGenerator';

const Tickets = ({ event, user, teamCode, showTicket }) => {
    const modalRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modalRef?.current && !modalRef.current.contains(e.target)) {
            showTicket(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const qrData = {
        name: user?.name,
        event: event?.name,
        teamCode,
        email: user?.email,
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div
                ref={modalRef}
                className="relative w-full max-w-sm sm:max-w-md bg-neutral-900 text-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-800 animate-fadeIn"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-center py-4">
                    <h2 className="text-2xl font-bold tracking-wide p-2">
                        {event?.name}
                    </h2>
                    <p className="text-xs text-gray-200">
                        {new Date(event?.dateTime).toLocaleString()}
                    </p>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-4 text-center">
                    {/* User Info */}
                    <div>
                        <h3 className="text-lg font-semibold">{user?.name}</h3>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                        {user?.phoneNumber && (
                            <p className="text-xs text-gray-500">
                                {user?.phoneNumber}
                            </p>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-neutral-700 my-3" />

                    {/* Team Info */}
                    {teamCode && (
                        <div className="text-sm">
                            <p className="text-gray-400">Team Code</p>
                            <p className="font-mono font-semibold bg-neutral-800 inline-block px-3 py-1 rounded-md mt-1">
                                {teamCode}
                            </p>
                        </div>
                    )}

                    {/* QR Code */}
                    <div className="flex justify-center my-3">
                        <div className="bg-white p-2 rounded-xl shadow-inner">
                            <QRCodeGenerator data={qrData} />
                        </div>
                    </div>

                    {/* Event Venue */}
                    {event?.location && (
                        <div className="space-y-1 text-xs sm:text-sm">
                            <p className="font-semibold text-gray-300 uppercase tracking-wide">
                                Venue
                            </p>
                            <p className="text-gray-400">{event?.location}</p>
                            {event?.locationURL && (
                                <a
                                    href={event?.locationURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-400 underline text-xs sm:text-sm mt-1 inline-block"
                                >
                                    View on Google Maps
                                </a>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="pt-4 border-t border-neutral-700">
                        <p className="text-xs text-gray-500">
                            Thank you for registering! 🎟️
                        </p>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={() => showTicket(null)}
                    className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-full transition-all"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Tickets;
