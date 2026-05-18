'use client';
import React, { useEffect, useState } from 'react';
import { useNationalEvent } from '@/src/context/National/NationalEventContext';
import { eventInstituteGET } from '@/src/serverAction/eventAction';
import { sendTeamsToNational } from '@/src/serverAction/nationalAction';

import { RxReload } from 'react-icons/rx';

const CollegeSubmitTeams = ({ college }) => {
    const national = useNationalEvent();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [search, setSearch] = useState('');
    const [windowStatus, setWindowStatus] = useState('closed');
    const [statusMessage, setStatusMessage] = useState('');
    const [hardReload, setHardReload] = useState(false);

    // Fetch college event data
    useEffect(() => {
        const checkAndFetch = async () => {
            if (!college?._id || !national?._id) {
                setLoading(false);
                return;
            }

            const isLinked =
                Array.isArray(college.national) &&
                college.national.some((id) => id.toString() === national._id);

            if (!isLinked) {
                setLoading(false);
                return;
            }

            const { success, data } = await eventInstituteGET(
                college._id,
                national._id,
                hardReload // this now works
            );

            if (success && data) setEvent(data);
            setLoading(false);
            setHardReload(false); // reset after reload
        };

        checkAndFetch();
    }, [college, national, hardReload]); // include hardReload

    // Determine submission window
    useEffect(() => {
        if (!national) return;
        const now = new Date();
        const submissionStart = new Date(national.submissionDate);
        const submissionEnd = new Date(national.submissionDeadline);

        if (now < submissionStart) {
            setWindowStatus('before');
            setStatusMessage(
                `🕓 Submission window opens on ${submissionStart.toLocaleString()}`
            );
        } else if (now > submissionEnd) {
            setWindowStatus('after');
            setStatusMessage(
                `🚫 Submission window closed on ${submissionEnd.toLocaleString()}`
            );
        } else {
            setWindowStatus('open');
            setStatusMessage(
                `✅ Submissions open until ${submissionEnd.toLocaleString()}`
            );
        }
    }, [national]);

    // Auto-select teams already submitted to national
    useEffect(() => {
        if (event?.registered) {
            const preselected = event.registered
                .filter(
                    (team) =>
                        team.national?.toString?.() === national._id.toString()
                )
                .map((t) => t._id);
            setSelectedTeams(preselected);
        }
    }, [event, national]);

    const handleSelect = (teamId) => {
        setSelectedTeams((prev) =>
            prev.includes(teamId)
                ? prev.filter((id) => id !== teamId)
                : [...prev, teamId]
        );
    };

    const handleSendToNational = async () => {
        if (selectedTeams.length === 0) {
            alert('⚠️ Please select at least one team.');
            return;
        }

        const res = await sendTeamsToNational({
            nationalId: national._id,
            teamIds: selectedTeams,
            collegeId: college._id,
        });

        if (res.success) {
            alert(`✅ ${res.message}`);
        } else {
            alert(`❌ ${res.message}`);
        }
    };

    if (loading) return <p className="text-gray-400">Loading teams...</p>;
    if (!event) return <p className="text-gray-400">No event data found.</p>;

    const filteredTeams = event.registered?.filter((team) =>
        team.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 space-y-5 relative">
            {/* Header & Status */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    Submit Teams to National Event
                </h2>
                <p
                    className={`mt-2 text-sm ${
                        windowStatus === 'open'
                            ? 'text-green-400'
                            : windowStatus === 'before'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                    }`}
                >
                    {statusMessage}
                </p>
            </div>
            <div
                className="text-white absolute top-2 right-5 cursor-pointer"
                onClick={() => {
                    if (loading) return;
                    setHardReload(true);
                    setLoading(true);
                }}
            >
                <RxReload
                    className={`transition-transform ${
                        hardReload ? 'animate-spin text-yellow-400' : ''
                    }`}
                />
            </div>

            {/* Submission Table */}
            {windowStatus === 'open' ? (
                <>
                    {/* Search + Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                        <input
                            type="text"
                            placeholder="🔍 Search teams..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:max-w-xs px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <button
                            onClick={handleSendToNational}
                            disabled={selectedTeams.length === 0}
                            className={`px-4 py-2 rounded-md text-white font-medium transition-all ${
                                selectedTeams.length > 0
                                    ? 'bg-indigo-600 hover:bg-indigo-700'
                                    : 'bg-gray-500 cursor-not-allowed'
                            }`}
                        >
                            Send to National ({selectedTeams.length})
                        </button>
                    </div>

                    {/* Teams Table */}
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-left border-collapse border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                            <thead className="bg-gray-100 dark:bg-gray-900">
                                <tr>
                                    <th className="p-3 border-b border-gray-300 dark:border-gray-700">
                                        Select
                                    </th>
                                    <th className="p-3 border-b">Team Name</th>
                                    <th className="p-3 border-b">Leader</th>
                                    <th className="p-3 border-b">Members</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTeams?.map((team) => (
                                    <tr
                                        key={team._id}
                                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition ${
                                            team.national?.toString?.() ===
                                            national._id.toString()
                                                ? 'bg-green-50 dark:bg-green-900'
                                                : ''
                                        }`}
                                    >
                                        <td className="p-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedTeams.includes(
                                                    team._id
                                                )}
                                                onChange={() =>
                                                    handleSelect(team._id)
                                                }
                                                className="w-4 h-4 accent-indigo-500"
                                            />
                                        </td>
                                        <td className="p-3 font-medium flex items-center gap-2">
                                            {team.name}
                                            {team.national?.toString?.() ===
                                                national._id.toString() && (
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                    Submitted
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3">
                                            {team.leader?.name || '—'}
                                        </td>
                                        <td className="p-3 text-sm text-gray-400">
                                            {team.members
                                                ?.map((m) => m.name)
                                                .join(', ') || '—'}
                                        </td>
                                    </tr>
                                ))}
                                {filteredTeams?.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center p-4 text-gray-500 dark:text-gray-400"
                                        >
                                            No teams found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="p-6 text-center border border-dashed border-gray-400 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-gray-600 dark:text-gray-400">
                        {statusMessage}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                        You will be able to submit teams once the submission
                        window is open.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CollegeSubmitTeams;
