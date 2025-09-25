'use client';

import React, { useState, useEffect } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

const SponsorSection = ({ sponsorAdminGET, sponsorAdminPOST }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        logo: '',
        partnerShip: '',
        category: 'silver',
        tags: '',
        social: '{"linkedin":"","twitter":""}',
    });

    const [sponsorList, setSponsorList] = useState([]);

    useEffect(() => {
        fetchSponsors();
    }, []);

    const fetchSponsors = async () => {
        try {
            const { success, data, message } = await sponsorAdminGET();
            if (success) {
                setSponsorList(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
            setFormData({ ...formData, logo: data.url });
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleDeleteLogo = async () => {
        try {
            const urlParts = formData.logo.split('/');
            const filename = urlParts[urlParts.length - 1];
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_IMAGE_SERVER}localhost:8080/delete/${filename}`,
                {
                    method: 'DELETE',
                }
            );

            if (!res.ok) throw new Error('Failed to delete file');

            setFormData({ ...formData, logo: '' });
        } catch (err) {
            console.error('Delete logo error:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) return;

        try {
            const payload = {
                ...formData,
                tags: formData.tags
                    ? formData.tags.split(',').map((t) => t.trim())
                    : [],
                social: formData.social ? JSON.parse(formData.social) : {},
            };

            const data = await sponsorAdminPOST(payload); // ✅ no res.json()

            if (data.success) {
                fetchSponsors();
                setFormData({
                    name: '',
                    description: '',
                    logo: '',
                    partnerShip: '',
                    category: 'silver',
                    tags: '',
                    social: '{"linkedin":"","twitter":""}',
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-full overflow-auto p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Register a Sponsor
            </h2>

            {/* Sponsor Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 grid gap-4 md:grid-cols-2 dark:text-white"
            >
                <input
                    name="name"
                    type="text"
                    placeholder="Sponsor Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Sponsor Description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="partnerShip"
                    type="text"
                    placeholder="Partnership Type (e.g. Media Partner)"
                    value={formData.partnerShip}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                >
                    <option value="title">Title</option>
                    <option value="platinum">Platinum</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                </select>

                <input
                    name="tags"
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={formData.tags}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="social"
                    type="text"
                    placeholder='Social Links (JSON e.g. {"linkedin":"...","twitter":"..."})'
                    value={formData.social}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                {/* Logo Upload */}
                <div className="md:col-span-2">
                    <label className="block cursor-pointer w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:ring-2 hover:ring-primary transition">
                        <div className="flex items-center gap-2 justify-center">
                            {!formData.logo && <AiOutlineUpload size={24} />}
                            <span>
                                {formData.logo
                                    ? 'Logo selected'
                                    : 'Choose Sponsor Logo'}
                            </span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={formData.logo}
                        />
                    </label>
                    {formData.logo && (
                        <div className="relative w-full flex justify-center items-center mt-2">
                            <img
                                src={formData.logo}
                                alt="Logo preview"
                                className="object-cover h-24 rounded-md"
                            />
                            <div
                                onClick={handleDeleteLogo}
                                className="absolute -top-1 -right-1 p-1 rounded-full bg-gray-600 cursor-pointer"
                            >
                                <MdOutlineDelete className="text-red-400" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="bg-background/55 hover:bg-background/80 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
                    >
                        Register Sponsor
                    </button>
                </div>
            </form>

            {/* Sponsors List */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Registered Sponsors
                </h3>
                <div className="grid md:grid-cols-2 gap-4 overflow-auto">
                    {sponsorList?.map((sponsor) => (
                        <div
                            key={sponsor._id}
                            className="relative p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-4"
                        >
                            {/* Logo */}
                            <div className="w-20 h-20 flex-shrink-0">
                                <img
                                    src={sponsor.logo || '/default-logo.png'}
                                    alt={sponsor.name}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-lg">
                                    {sponsor.name}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {sponsor.partnerShip} • {sponsor.category}
                                </span>
                                {sponsor.description && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {sponsor.description}
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

export default SponsorSection;
