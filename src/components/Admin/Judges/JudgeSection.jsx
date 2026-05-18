'use client';

import React, { useState, useEffect } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaCheck, FaTrashAlt } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const JudgeSection = ({ judgeAdminGET, judgeAdminPOST, judgeAdminDELETE }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        image: '',
        designation: '',
        organization: '',
        description: '',
        expertise: '',
        role: 'Judge',
        linkedin: '',
        twitter: '',
    });

    const [judgeList, setJudgeList] = useState([]);

    useEffect(() => {
        fetchJudges();
    }, []);

    const fetchJudges = async () => {
        try {
            const { success, data, message } = await judgeAdminGET();
            if (success) setJudgeList(data);
            else console.error(message);
        } catch (err) {
            console.error('Error fetching judges:', err);
        }
    };

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataObj = new FormData();
        formDataObj.append('file', file);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/upload`,
                {
                    method: 'POST',
                    body: formDataObj,
                }
            );

            if (!res.ok) throw new Error('File upload failed');
            const data = await res.json();
            setFormData({ ...formData, image: data.url });
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const deleteUploadedFile = async () => {
        if (!formData.image) return;
        try {
            const urlParts = formData.image.split('/');
            const filename = urlParts[urlParts.length - 1];
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/delete/${filename}`,
                {
                    method: 'DELETE',
                }
            );
            if (!res.ok) throw new Error('Failed to delete');
            setFormData({ ...formData, image: '' });
        } catch (err) {
            toast.error('Delete failed:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;

        try {
            const payload = {
                ...formData,
                expertise: formData.expertise
                    ? formData.expertise.split(',').map((e) => e.trim())
                    : [],
                socialLinks: {
                    linkedin: formData.linkedin,
                    twitter: formData.twitter,
                },
            };

            const { success, data, message } = await judgeAdminPOST(payload);

            if (success) {
                fetchJudges();
                setFormData({
                    name: '',
                    email: '',
                    image: '',
                    designation: '',
                    organization: '',
                    description: '',
                    expertise: '',
                    role: 'Judge',
                    linkedin: '',
                    twitter: '',
                });
            } else console.error(message);
        } catch (err) {
            console.error('Error submitting judge:', err);
        }
    };

    const handleDelete = async (judge) => {
        if (!confirm('Are you sure you want to delete this judge?')) return;

        if (judge?.image) {
            try {
                const urlParts = judge.image?.split('/');
                const filename = urlParts[urlParts.length - 1];
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/delete/${filename}`,
                    {
                        method: 'DELETE',
                    }
                );
                if (!res.ok)
                    toast.error(
                        'Failed to delete image, tring to delete judge'
                    );
            } catch (err) {
                toast.error('Delete failed:', err);
            }
        }

        const res = await judgeAdminDELETE(judge._id);
        if (res.success) {
            toast.success(res.message);
            window.location.reload();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="h-full overflow-auto p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Register a Judge / Mentor
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 grid gap-4 md:grid-cols-2 dark:text-white"
            >
                {/* Name */}
                <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                {/* Email */}
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                {/* Designation & Organization */}
                <input
                    name="designation"
                    type="text"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />
                <input
                    name="organization"
                    type="text"
                    placeholder="Organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                {/* Role */}
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                >
                    <option value="Judge">Judge</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Evaluator">Evaluator</option>
                    <option value="Speaker">Speaker</option>
                </select>

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Short Bio / Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                {/* Expertise */}
                <input
                    name="expertise"
                    type="text"
                    placeholder="Expertise (comma-separated)"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                {/* Social Links */}
                <input
                    name="linkedin"
                    type="url"
                    placeholder="LinkedIn URL"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />
                <input
                    name="twitter"
                    type="url"
                    placeholder="Twitter URL"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                {/* Image Upload */}
                <label className="block cursor-pointer w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 md:col-span-2">
                    <div className="flex items-center gap-2 justify-center">
                        {!formData.image && <AiOutlineUpload size={24} />}
                        <span>
                            {formData.image
                                ? 'Image selected'
                                : 'Choose Judge Image'}
                        </span>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={formData.image}
                    />
                </label>
                {formData.image && (
                    <div className="relative w-32 h-32 mx-auto">
                        <img
                            src={formData.image}
                            alt="Preview"
                            className="object-cover w-full h-full rounded-md"
                        />
                        <div
                            onClick={deleteUploadedFile}
                            className="absolute -top-2 -right-2 p-1 rounded-full bg-gray-600 cursor-pointer"
                        >
                            <MdOutlineDelete className="text-red-400" />
                        </div>
                    </div>
                )}

                {/* Submit */}
                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="bg-background/55 hover:bg-background/80 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
                    >
                        Register Judge
                    </button>
                </div>
            </form>

            {/* List Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Registered Judges
                </h3>
                <div className="grid md:grid-cols-2 gap-4 overflow-auto">
                    {judgeList?.map((judge) => (
                        <div
                            key={judge._id}
                            className="relative p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-start gap-4"
                        >
                            <FaTrashAlt
                                className="absolute top-3 right-3 text-red-500 cursor-pointer"
                                onClick={() => handleDelete(judge)}
                            />
                            <div className="w-20 h-20 flex-shrink-0">
                                <img
                                    src={judge.image || '/default-avatar.png'}
                                    alt={judge.name}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-lg text-white">
                                    {judge.name}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {judge.designation} @ {judge.organization}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {judge.role}
                                </span>
                                {judge.expertise?.length > 0 && (
                                    <span className="text-xs text-gray-400">
                                        Expertise: {judge.expertise.join(', ')}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JudgeSection;
