'use client';

import React, { useState, useEffect } from 'react';
import { FaUserTie, FaTrash, FaImage } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';

const SpeakerSection = ({ speakerAdminGET, speakerAdminPOST }) => {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        banner: '',
        designation: '',
        organization: '',
        description: '',
        email: '',
        role: 'Speaker',
        socialLinks: '{"linkedin":"","twitter":""}',
        topic: '',
        sessionTime: '',
        eventName: '',
    });

    const [speakerList, setSpeakerList] = useState([]);

    useEffect(() => {
        fetchSpeakers();
    }, []);

    const fetchSpeakers = async () => {
        try {
            const { success, data, message } = await speakerAdminGET();
            setSpeakerList(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    console.log(formData);
    // Generic upload handler (works for both image & banner)
    const handleFileChange = async (e, field) => {
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
            setFormData((prev) => ({ ...prev, [field]: data.url }));
        } catch (err) {
            console.error('Upload failed:', err);
        }
    };

    const deleteUploadedFile = async (url, field) => {
        try {
            const urlParts = url.split('/');
            const filename = urlParts[urlParts.length - 1];
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/delete/${filename}`,
                {
                    method: 'DELETE',
                }
            );

            if (!res.ok) throw new Error('Failed to delete file');

            setFormData((prev) => ({ ...prev, [field]: '' }));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;

        try {
            const payload = {
                ...formData,
                socialLinks: formData.socialLinks
                    ? JSON.parse(formData.socialLinks)
                    : {},
                sessionTime: formData.sessionTime
                    ? new Date(formData.sessionTime)
                    : null,
            };

            const { success, data, message } = await speakerAdminPOST(payload);

            if (success) {
                fetchSpeakers();
                setFormData({
                    name: '',
                    image: '',
                    banner: '',
                    designation: '',
                    organization: '',
                    description: '',
                    email: '',
                    role: 'Speaker',
                    socialLinks: '{"linkedin":"","twitter":""}',
                    topic: '',
                    sessionTime: '',
                    eventName: '',
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this speaker?')) return;

        try {
            const res = await fetch(`/api/admin/speakers/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (data.success) {
                setSpeakerList((prev) =>
                    prev.filter((speaker) => speaker._id !== id)
                );
            }
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    return (
        <div className="h-full overflow-auto p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Add a Speaker
            </h2>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 grid gap-4 md:grid-cols-2 dark:text-white"
            >
                <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

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

                <textarea
                    name="description"
                    placeholder="Short Bio"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                {/* Image Upload */}
                <div>
                    <label className="block cursor-pointer w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:ring-2 hover:ring-primary transition">
                        <div className="flex items-center gap-2 justify-center">
                            {!formData.image && <FaUserTie size={20} />}
                            <span>
                                {formData.image
                                    ? 'Profile Image Selected'
                                    : 'Choose Profile Image'}
                            </span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'image')}
                            className="hidden"
                            disabled={formData.image}
                        />
                    </label>
                    {formData.image && (
                        <div className="relative mt-2 flex justify-center">
                            <img
                                src={formData.image}
                                alt="Preview"
                                className="object-cover w-24 h-24 rounded-full border"
                            />
                            <div
                                onClick={() =>
                                    deleteUploadedFile(formData.image, 'image')
                                }
                                className="absolute -top-1 -right-1 p-1 rounded-full bg-gray-600 cursor-pointer"
                            >
                                <MdOutlineDelete className="text-red-400" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Banner Upload */}
                <div>
                    <label className="block cursor-pointer w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:ring-2 hover:ring-primary transition">
                        <div className="flex items-center gap-2 justify-center">
                            {!formData.banner && <FaImage size={20} />}
                            <span>
                                {formData.banner
                                    ? 'Banner Selected'
                                    : 'Choose Banner Image'}
                            </span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'banner')}
                            className="hidden"
                            disabled={formData.banner}
                        />
                    </label>
                    {formData.banner && (
                        <div className="relative mt-2 flex justify-center">
                            <img
                                src={formData.banner}
                                alt="Banner Preview"
                                className="object-cover w-full h-32 rounded-lg border"
                            />
                            <div
                                onClick={() =>
                                    deleteUploadedFile(
                                        formData.banner,
                                        'banner'
                                    )
                                }
                                className="absolute -top-1 -right-1 p-1 rounded-full bg-gray-600 cursor-pointer"
                            >
                                <MdOutlineDelete className="text-red-400" />
                            </div>
                        </div>
                    )}
                </div>

                <input
                    name="topic"
                    type="text"
                    placeholder="Talk Topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="eventName"
                    type="text"
                    placeholder="Event/Session Name"
                    value={formData.eventName}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="sessionTime"
                    type="datetime-local"
                    value={formData.sessionTime}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="socialLinks"
                    type="text"
                    placeholder='Social Links (JSON e.g. {"linkedin":"...","twitter":"..."})'
                    value={formData.socialLinks}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="bg-background/55 hover:bg-background/80 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
                    >
                        Add Speaker
                    </button>
                </div>
            </form>

            {/* List Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Registered Speakers
                </h3>
                <div className="grid md:grid-cols-2 gap-4 overflow-auto">
                    {speakerList?.map((speaker) => (
                        <div
                            key={speaker._id}
                            className="relative p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex flex-col gap-2"
                        >
                            {speaker.banner && (
                                <img
                                    src={speaker.banner}
                                    alt="Banner"
                                    className="w-full h-24 object-cover rounded-md mb-2"
                                />
                            )}
                            {speaker.image ? (
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="w-16 h-16 rounded-full object-cover border mb-2"
                                />
                            ) : (
                                <FaUserTie className="w-12 h-12 text-gray-400 mb-2" />
                            )}
                            <span className="font-semibold text-lg">
                                {speaker.name}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                {speaker.designation} @ {speaker.organization}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Topic: {speaker.topic}
                            </span>
                            {speaker.eventName && (
                                <span className="text-xs text-gray-400">
                                    Event: {speaker.eventName}
                                </span>
                            )}
                            {speaker.sessionTime && (
                                <span className="text-xs text-gray-400">
                                    Time:{' '}
                                    {new Date(
                                        speaker.sessionTime
                                    ).toLocaleString()}
                                </span>
                            )}

                            {/* Delete button */}
                            <button
                                onClick={() => handleDelete(speaker._id)}
                                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                            >
                                <FaTrash className="text-white" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpeakerSection;
