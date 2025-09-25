'use client';

import React, { useState } from 'react';
import ProblemModal from './ProblemModal';

export default function ProblemTable({ initialProblems }) {
    const [problems, setProblems] = useState(initialProblems);
    const [search, setSearch] = useState('');
    const [selectedProblem, setSelectedProblem] = useState(null);

    const handleSearch = (e) => {
        const q = e.target.value.toLowerCase();
        setSearch(q);

        if (!q) {
            setProblems(initialProblems);
            return;
        }

        const filtered = initialProblems.filter((p) =>
            Object.values(p).some((val) =>
                val?.toString().toLowerCase().includes(q)
            )
        );
        setProblems(filtered);
    };

    return (
        <div className="bg-neutral-950 p-6 rounded-2xl shadow-lg">
            <input
                type="text"
                placeholder="Search by any field..."
                value={search}
                onChange={handleSearch}
                className="w-full p-3 mb-6 rounded-xl border border-neutral-800 bg-neutral-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />

            <div className="overflow-x-auto rounded-xl border border-neutral-800">
                <table className="min-w-full border-collapse text-white">
                    <thead className="bg-neutral-900/50 backdrop-blur-sm">
                        <tr>
                            <th className="p-3 border-b border-neutral-800 text-left">
                                ID
                            </th>
                            <th className="p-3 border-b border-neutral-800 text-left">
                                Title
                            </th>
                            <th className="p-3 border-b border-neutral-800 text-left">
                                Company
                            </th>
                            <th className="p-3 border-b border-neutral-800 text-left">
                                Category
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem) => (
                            <tr
                                key={problem._id}
                                className="cursor-pointer hover:bg-neutral-900/70 transition-all"
                                onClick={() => setSelectedProblem(problem)}
                            >
                                <td className="p-3 border-b border-neutral-800">
                                    {problem._id}
                                </td>
                                <td className="p-3 border-b border-neutral-800">
                                    {problem.title}
                                </td>
                                <td className="p-3 border-b border-neutral-800">
                                    {problem.company}
                                </td>
                                <td className="p-3 border-b border-neutral-800 text-indigo-400 font-semibold">
                                    {problem.category}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedProblem && (
                <ProblemModal
                    problem={selectedProblem}
                    onClose={() => setSelectedProblem(null)}
                />
            )}
        </div>
    );
}
