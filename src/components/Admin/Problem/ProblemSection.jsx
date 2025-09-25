'use client';

import React, { useState, useEffect } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';

const ProblemSection = ({
    problemStatementGET,
    problemStatementPOST,
    problemStatementDELETE,
}) => {
    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        description: '',
        company: '',
        department: '',
        category: 'Software',
        theme: '',
        social: '',
        dataset: '',
        teamMin: 2,
        teamMax: 6,
        tags: '',
    });

    const [problemList, setProblemList] = useState([]);

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const { success, data } = await problemStatementGET();
            if (success) setProblemList(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData._id || !formData.title) return;

        try {
            const payload = {
                _id: formData._id,
                title: formData.title,
                description: formData.description,
                company: formData.company,
                department: formData.department,
                category: formData.category,
                theme: formData.theme,
                social: formData.social ? JSON.parse(formData.social) : {},
                dataset: formData.dataset,
                teamSize: {
                    min: Number(formData.teamMin),
                    max: Number(formData.teamMax),
                },
                tags: formData.tags
                    ? formData.tags.split(',').map((t) => t.trim())
                    : [],
            };

            const { success } = await problemStatementPOST(payload);
            if (success) {
                fetchProblems();
                setFormData({
                    _id: '',
                    title: '',
                    description: '',
                    company: '',
                    department: '',
                    category: 'Software',
                    theme: '',
                    social: '',
                    dataset: '',
                    teamMin: 2,
                    teamMax: 6,
                    tags: '',
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this problem statement?'))
            return;
        try {
            const { success } = await problemStatementDELETE(id);
            if (success) fetchProblems();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-full overflow-auto p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Add a Problem Statement
            </h2>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 grid gap-4 md:grid-cols-2 dark:text-white"
            >
                <input
                    name="_id"
                    type="text"
                    placeholder="Problem ID"
                    value={formData._id}
                    onChange={handleChange}
                    required
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="title"
                    type="text"
                    placeholder="Problem Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <textarea
                    name="description"
                    placeholder="Problem Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="company"
                    type="text"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="department"
                    type="text"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                >
                    <option value="Software">Software</option>
                    <option value="Hardware">Hardware</option>
                </select>

                <input
                    name="theme"
                    type="text"
                    placeholder="Theme"
                    value={formData.theme}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="social"
                    type="text"
                    placeholder='Social (JSON e.g. {"twitter":"...","linkedin":"..."})'
                    value={formData.social}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="dataset"
                    type="text"
                    placeholder="Dataset URL"
                    value={formData.dataset}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <div className="flex gap-2">
                    <input
                        name="teamMin"
                        type="number"
                        placeholder="Min Team Size"
                        value={formData.teamMin}
                        onChange={handleChange}
                        className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    />
                    <input
                        name="teamMax"
                        type="number"
                        placeholder="Max Team Size"
                        value={formData.teamMax}
                        onChange={handleChange}
                        className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    />
                </div>

                <input
                    name="tags"
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="bg-background/55 hover:bg-background/80 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
                    >
                        Add Problem
                    </button>
                </div>
            </form>

            {/* List Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Registered Problem Statements
                </h3>
                <div className="grid md:grid-cols-2 gap-4 overflow-auto">
                    {problemList?.map((problem) => (
                        <div
                            key={problem._id}
                            className="relative p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col gap-2"
                        >
                            {problem.category === 'Software' ? (
                                <FaCheck className="absolute top-3 right-3 text-green-500" />
                            ) : (
                                <RiErrorWarningLine className="absolute top-3 right-3 text-red-500" />
                            )}
                            <span className="font-semibold text-lg">
                                {problem.title}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                {problem.company} ({problem.department})
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Theme: {problem.theme}
                            </span>
                            {problem.tags?.length > 0 && (
                                <span className="text-xs text-gray-400">
                                    Tags: {problem.tags.join(', ')}
                                </span>
                            )}
                            <span className="text-xs text-gray-400">
                                Team Size: {problem.teamSize?.min} -{' '}
                                {problem.teamSize?.max}
                            </span>
                            <button
                                onClick={() => handleDelete(problem._id)}
                                className="mt-2 text-red-500 hover:text-red-700 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProblemSection;
