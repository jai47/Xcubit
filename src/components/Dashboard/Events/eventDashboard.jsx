import React, { useState } from 'react';
import Button from '../../Button';
import { useSession } from 'next-auth/react';
import { updateTeam } from '@/src/serverAction/teamAction';

const EventDashboard = ({ userTeams }) => {
    const [selectedTeamEvent, setSelectedTeamEvent] = useState(null);
    const [submissions, setSubmissions] = useState({});
    const { data: session } = useSession();

    const handleEventClick = (teamEvent) => {
        setSelectedTeamEvent(teamEvent);
        setSubmissions(teamEvent.team.submission);
    };

    const isLeader =
        session?.user?.email === selectedTeamEvent?.team?.leader?.email;

    const currentDate = new Date();
    const eventDate = selectedTeamEvent
        ? new Date(selectedTeamEvent.event.dateTime)
        : null;

    const isEventDay =
        eventDate && currentDate.toDateString() === eventDate.toDateString();

    const isPastEvent = eventDate && currentDate > eventDate;
    const canEdit = isLeader && isEventDay && !isPastEvent;

    const handleInputChange = (field, value) => {
        setSubmissions((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!selectedTeamEvent) return;

        try {
            const res = await fetch('/api/team/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teamId: selectedTeamEvent.team._id,
                    submission: submissions,
                }),
            });

            const data = await res.json();
            if (data.success) {
                alert('✅ Submission updated successfully!');
                setSelectedTeamEvent((prev) => ({
                    ...prev,
                    team: { ...prev.team, submission: data.data.submission },
                }));
                location.reload();
            } else {
                console.error(`❌ ${data.message}`);
            }
        } catch (err) {
            console.error('Server error during submission');
        }
    };

    return (
        <div className="p-4 sm:p-6 shadow-lg rounded-lg mx-auto w-full max-w-7xl">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6 border-b border-gray-700 pb-2 text-center sm:text-left">
                My Events
            </h2>

            {/* Grid of Events */}
            {userTeams?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userTeams.map((team, idx) => {
                        const event = team?.event;
                        return (
                            <div
                                key={idx}
                                className="group flex flex-col items-center justify-between p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-indigo-500 hover:shadow-indigo-500/20 shadow-md transition-all duration-300 text-white cursor-pointer"
                                onClick={() =>
                                    handleEventClick({ team, event })
                                }
                            >
                                <div className="text-center space-y-2">
                                    <h3 className="text-lg sm:text-xl font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                        {event?.name}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        Status:{' '}
                                        {new Date(event?.dateTime) >
                                        new Date() ? (
                                            <span className="font-medium text-green-400">
                                                Upcoming
                                            </span>
                                        ) : (
                                            <span className="font-medium text-blue-400">
                                                Completed
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(
                                            event?.dateTime
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-gray-400 text-lg mt-6">
                    You haven’t registered for any events yet.
                </p>
            )}

            {/* Modal */}
            {selectedTeamEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="relative bg-neutral-950 text-white max-w-5xl w-full mx-auto rounded-2xl shadow-2xl overflow-hidden border border-neutral-800 animate-fadeIn flex flex-col sm:flex-row">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold text-2xl transition-colors"
                            onClick={() => setSelectedTeamEvent(null)}
                            aria-label="Close Modal"
                        >
                            &times;
                        </button>

                        {/* LEFT SIDE: Event + Team Details */}
                        <div className="w-full sm:w-1/2 bg-neutral-900 p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-neutral-800 overflow-y-auto max-h-[90vh]">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-indigo-400 text-center">
                                {selectedTeamEvent.event.name}
                            </h2>
                            <p className="text-sm text-gray-400 text-center mb-6">
                                {new Date(
                                    selectedTeamEvent.event.dateTime
                                ).toLocaleString()}
                            </p>

                            <div className="space-y-6">
                                {/* Event Details */}
                                <div>
                                    <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                                        Event Details
                                    </h3>
                                    <p>
                                        <span className="font-medium text-gray-300">
                                            Location:
                                        </span>{' '}
                                        {selectedTeamEvent.event.location}
                                    </p>
                                    {selectedTeamEvent.event.locationURL && (
                                        <a
                                            href={
                                                selectedTeamEvent.event
                                                    .locationURL
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-400 underline text-sm hover:text-indigo-300 transition-colors"
                                        >
                                            View on Google Maps
                                        </a>
                                    )}
                                </div>

                                {/* Team Info */}
                                <div>
                                    <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                                        Team Information
                                    </h3>
                                    <p>
                                        <span className="font-medium text-gray-300">
                                            Team Name:
                                        </span>{' '}
                                        {selectedTeamEvent.team.name}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-300">
                                            Team Leader:
                                        </span>{' '}
                                        {selectedTeamEvent?.team?.leader?.name}{' '}
                                        (
                                        {selectedTeamEvent?.team?.leader?.email}
                                        )
                                    </p>
                                    <div className="mt-2">
                                        <p className="font-medium text-gray-300">
                                            Team Members:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-400 space-y-1">
                                            {selectedTeamEvent.team.members.map(
                                                (member, i) => (
                                                    <li key={i}>
                                                        {member.name} (
                                                        {member.email})
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Submissions */}
                        <div className="w-full sm:w-1/2 bg-neutral-950 p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
                            <h3 className="text-xl font-semibold mb-4 text-indigo-300 text-center">
                                Project Submissions
                            </h3>

                            {['text', 'video', 'document', 'repo'].map(
                                (field) => (
                                    <div key={field} className="mb-4">
                                        <label className="block font-medium capitalize mb-1 text-gray-300">
                                            {field} link:
                                        </label>
                                        <input
                                            type="url"
                                            value={submissions[field] || ''}
                                            disabled={!canEdit}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    field,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Enter ${field} link`}
                                            className={`w-full mt-1 p-3 border rounded-lg text-sm focus:outline-none transition-all duration-200 ${
                                                canEdit
                                                    ? 'border-gray-700 bg-neutral-900 focus:border-indigo-500'
                                                    : 'bg-neutral-800 border-neutral-700 text-gray-500 cursor-not-allowed'
                                            }`}
                                        />
                                    </div>
                                )
                            )}

                            {canEdit ? (
                                <div className="w-full h-fit flex justify-end">
                                    <Button
                                        text="Submit"
                                        onClick={handleSubmit}
                                        className="w-1/4 mt-4 border border-gray-800 bg-neutral-900 hover:bg-indigo-950 py-3 rounded-xl font-semibold transition-all duration-300"
                                    />
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 text-center mt-4 italic">
                                    {isPastEvent
                                        ? '⏳ Submissions are closed for this event.'
                                        : isLeader
                                        ? '📅 You can upload on the day of the event.'
                                        : '👤 Only the team leader can submit.'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDashboard;
