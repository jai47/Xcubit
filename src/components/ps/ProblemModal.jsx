'use client';

import React from 'react';
import Image from 'next/image';

export default function ProblemModal({ problem, onClose }) {
    if (!problem) return null;

    // Convert problem object into key-value pairs for table display
    const entries = [
        ['ID', problem._id],
        ['Title', problem.title],
        ['Description', problem.description],
        ['Company', problem.company],
        ['Department', problem.department],
        ['Category', problem.category],
        ['Theme', problem.theme],
        ['Dataset', problem.dataset],
        ['Team Size', `${problem.teamSize?.min} - ${problem.teamSize?.max}`],
        ['Tags', problem.tags?.join(', ') || '-'],
        ['Links', problem.social ? JSON.stringify(problem.social) : '-'],
    ];

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-neutral-950 rounded-3xl w-full max-w-3xl shadow-2xl border border-neutral-800 overflow-hidden relative">
                {/* Header with logo + close button */}
                <div className="flex items-center justify-between bg-neutral-900 px-6 py-4 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo/logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="rounded-md"
                        />
                        <h3 className="text-xl font-bold text-white">
                            Problem Statement Details
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white font-bold text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Table */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <table className="min-w-full border border-neutral-800 rounded-lg divide-y divide-neutral-800">
                        <tbody>
                            {entries.map(([key, value], idx) => (
                                <tr
                                    key={idx}
                                    className={
                                        idx % 2 === 0
                                            ? 'bg-neutral-900'
                                            : 'bg-neutral-950'
                                    }
                                >
                                    <td className="px-4 py-3 font-semibold text-indigo-400 whitespace-nowrap border-b border-neutral-800">
                                        {key}
                                    </td>
                                    <td className="px-4 py-3 text-gray-300 border-b border-neutral-800">
                                        {value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
