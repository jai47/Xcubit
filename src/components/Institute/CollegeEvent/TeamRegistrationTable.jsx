'use client';

import React, { useState, useMemo } from 'react';

const RegisteredTeamsTable = ({ registered }) => {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [expandedRows, setExpandedRows] = useState({});
    const [search, setSearch] = useState('');

    const toggleRow = (id) => {
        setExpandedRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const allSubmitted = (submission) =>
        Object.values(submission).every((v) => v === true);

    const extractYouTubeId = (url) => {
        const regExp =
            /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    };

    const filteredTeams = useMemo(() => {
        if (!search) return registered;
        const lowerSearch = search.toLowerCase();

        return registered.filter((team) => {
            const leaderName = team.leader?.name?.toLowerCase() || '';
            const leaderEmail = team.leader?.email?.toLowerCase() || '';
            const teamName = team.name?.toLowerCase() || '';
            const memberNames =
                team.members?.map((m) => m.name.toLowerCase()) || [];
            const memberEmails =
                team.members?.map((m) => m.email.toLowerCase()) || [];

            return (
                teamName.includes(lowerSearch) ||
                leaderName.includes(lowerSearch) ||
                leaderEmail.includes(lowerSearch) ||
                memberNames.some((name) => name.includes(lowerSearch)) ||
                memberEmails.some((email) => email.includes(lowerSearch))
            );
        });
    }, [search, registered]);

    return (
        <div className="overflow-x-auto bg-gray-900 text-gray-100 rounded-lg shadow-md p-3">
            {/* Search bar */}
            <div className="mb-4 flex justify-end">
                <input
                    type="text"
                    placeholder="Search by team, leader or member (name/email)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-3/4 md:w-1/2 p-2 rounded border border-gray-700 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none"
                />
            </div>

            {/* Responsive table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse sm:table-auto">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="p-3 border-b border-gray-700 text-left text-sm sm:text-base">
                                Team Name
                            </th>
                            <th className="p-3 border-b border-gray-700 text-left text-sm sm:text-base">
                                Leader
                            </th>
                            <th className="p-3 border-b border-gray-700 text-left text-sm sm:text-base">
                                Members
                            </th>
                            <th className="p-3 border-b border-gray-700 text-left text-sm sm:text-base">
                                Submission
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeams.length > 0 ? (
                            filteredTeams.map((team) => (
                                <React.Fragment key={team._id}>
                                    <tr
                                        onClick={() => toggleRow(team._id)}
                                        className="hover:bg-gray-700 cursor-pointer transition-colors"
                                    >
                                        <td className="p-3 border-b border-gray-700 break-words">
                                            {team.name}
                                        </td>
                                        <td className="p-3 border-b border-gray-700 break-words">
                                            {team.leader?.name} (
                                            {team.leader?.email})
                                        </td>
                                        <td className="p-3 border-b border-gray-700">
                                            {team.members?.length}/
                                            {team.maxMembers || 5}
                                        </td>
                                        <td className="p-3 border-b border-gray-700">
                                            {(() => {
                                                const submissions =
                                                    team.submission || {};
                                                const total =
                                                    Object.keys(submissions)
                                                        .length || 0;
                                                const completed =
                                                    Object.values(
                                                        submissions
                                                    ).filter(Boolean).length ||
                                                    0;

                                                return (
                                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                                        <span className="text-sm">
                                                            Submission (
                                                            {completed}/{total})
                                                        </span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // prevent row toggle
                                                                setSelectedTeam(
                                                                    team
                                                                );
                                                            }}
                                                            className="text-indigo-400 text-sm hover:text-indigo-300 underline"
                                                        >
                                                            View Submission
                                                        </button>
                                                    </div>
                                                );
                                            })()}
                                        </td>
                                    </tr>

                                    {expandedRows[team._id] && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="bg-gray-800 px-3 py-4"
                                            >
                                                <div className="flex flex-col gap-3 sm:flex-row sm:gap-6 flex-wrap">
                                                    <div className="flex-1 min-w-[200px]">
                                                        <span className="font-semibold">
                                                            Members:
                                                        </span>
                                                        <ul className="list-disc list-inside text-gray-300 break-words">
                                                            {team.members?.map(
                                                                (m) => (
                                                                    <li
                                                                        key={
                                                                            m._id
                                                                        }
                                                                    >
                                                                        {m.name}{' '}
                                                                        -{' '}
                                                                        <span className="text-gray-400 text-xs">
                                                                            {
                                                                                m.email
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                    <div className="flex-1 min-w-[200px]">
                                                        <span className="font-semibold">
                                                            Submission Status:
                                                        </span>
                                                        <ul className="list-disc list-inside text-gray-300 break-words">
                                                            {Object.entries(
                                                                team.submission
                                                            ).map(
                                                                ([
                                                                    type,
                                                                    done,
                                                                ]) => (
                                                                    <li
                                                                        key={
                                                                            type
                                                                        }
                                                                    >
                                                                        {type.toUpperCase()}
                                                                        :{' '}
                                                                        {done
                                                                            ? '✅'
                                                                            : '❌'}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-4 text-center text-gray-400"
                                >
                                    No teams match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedTeam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="relative bg-neutral-950 text-white max-w-5xl w-full mx-auto rounded-2xl shadow-2xl overflow-hidden border border-neutral-800 animate-in flex flex-col sm:flex-row">
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold text-2xl transition-colors"
                            onClick={() => setSelectedTeam(null)}
                            aria-label="Close Modal"
                        >
                            &times;
                        </button>

                        {/* LEFT SIDE: Team Info */}
                        <div className="w-full sm:w-2/5 bg-neutral-900 p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-neutral-800 overflow-y-auto max-h-[90vh]">
                            <h2 className="text-2xl font-bold mb-3 text-indigo-400 text-center">
                                {selectedTeam.name}
                            </h2>
                            <p className="text-sm text-gray-400 text-center mb-6">
                                Leader: {selectedTeam.leader?.name} (
                                {selectedTeam.leader?.email})
                            </p>
                            <p className="font-semibold mb-2">Team Members:</p>
                            <ul className="list-disc list-inside text-gray-300">
                                {selectedTeam.members?.map((member) => (
                                    <li key={member._id}>
                                        {member.name} ({member.email})
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* RIGHT SIDE: Submissions */}
                        <div className="w-full sm:w-3/5 bg-neutral-950 p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
                            <h3 className="text-xl font-semibold mb-4 text-indigo-300 text-center">
                                Project Submissions
                            </h3>

                            {Object.entries(selectedTeam.submission).map(
                                ([type, link]) => (
                                    <div key={type} className="mb-6">
                                        <h4 className="font-semibold capitalize mb-2 text-gray-300">
                                            {type}
                                        </h4>

                                        {/* Text Submission */}
                                        {type === 'text' && (
                                            <p className="text-gray-400 bg-neutral-900 p-3 rounded-lg border border-neutral-800 whitespace-pre-wrap">
                                                {link || 'No text submission'}
                                            </p>
                                        )}

                                        {/* Video Submission */}
                                        {type === 'video' && link && (
                                            <div className="relative w-full aspect-video border border-neutral-800 rounded-lg overflow-hidden">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${extractYouTubeId(
                                                        link
                                                    )}`}
                                                    className="w-full h-full"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        )}
                                        {type === 'video' && !link && (
                                            <p className="text-gray-500 italic">
                                                No video submitted
                                            </p>
                                        )}

                                        {/* Document Submission */}
                                        {type === 'document' && link && (
                                            <div className="relative w-full h-72 border border-neutral-800 rounded-lg overflow-hidden">
                                                <iframe
                                                    src={link}
                                                    className="w-full h-full"
                                                ></iframe>
                                            </div>
                                        )}
                                        {type === 'document' && !link && (
                                            <p className="text-gray-500 italic">
                                                No document uploaded
                                            </p>
                                        )}

                                        {/* Repo Submission */}
                                        {type === 'repo' && link && (
                                            <a
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-400 underline hover:text-indigo-300"
                                            >
                                                Open Repository
                                            </a>
                                        )}
                                        {type === 'repo' && !link && (
                                            <p className="text-gray-500 italic">
                                                No repository link provided
                                            </p>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisteredTeamsTable;
