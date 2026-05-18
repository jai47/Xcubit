'use client';

import React, { useState, useEffect } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { RiErrorWarningLine } from 'react-icons/ri';
import { MdOutlineDelete } from 'react-icons/md';
import InstituteAdminModal from './InstituteAdminModal';

const CollegeSection = ({ fetchAllInstitutes, createNewCollege }) => {
    const [showModal, setShowModal] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        adminUserEmail: '',
        logo: '', // changed from '' to null to hold file
        address: '',
        city: '',
        state: '',
        phone: '',
        website: '',
    });
    const [collegeList, setCollegeList] = useState([]);

    useEffect(() => {
        fetchColleges();
    }, []);

    const fetchColleges = async () => {
        try {
            const { success, data, message } = await fetchAllInstitutes();
            setCollegeList(data);
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
                    body: formDataObj, // FormData automatically sets headers
                }
            );

            if (!res.ok) {
                throw new Error('File upload failed');
            }

            const data = await res.json();

            setFormData({ ...formData, logo: data.url });
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.adminUserEmail) {
            return;
        }

        try {
            const { success, data, message } = await createNewCollege(formData);

            setFormData({
                name: '',
                adminUserEmail: '',
                logo: '',
                address: '',
                city: '',
                state: '',
                phone: '',
                website: '',
            });

            if (success) {
                fetchColleges();
                if (data.adminUserEmail) {
                    const res = await fetch('/api/mail', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: data.adminUserEmail,
                            type: 'college-registration',
                            message: {
                                name: data.name,
                                verifyLink: `${process.env.NEXT_PUBLIC_BASE_URL}/verify/college/${data.verifyToken}`,
                                email: data.adminUserEmail,
                                contactEmail: 'support@xcubit.in',
                                loginLink: 'https://xcubit.in/login',
                            },
                            subject: `Welcome to the community, ${data.name}`,
                        }),
                    });
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-full overflow-auto p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Register a College
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 grid gap-4 md:grid-cols-2 dark:text-white"
            >
                <div className="md:col-span-2">
                    <input
                        name="name"
                        type="text"
                        placeholder="College Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                <div>
                    <input
                        name="address"
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <input
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <input
                        name="city"
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div>
                    <input
                        name="state"
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Email input instead of dropdown */}
                <div className="md:col-span-2">
                    <input
                        name="adminUserEmail"
                        type="email"
                        placeholder="Admin Email"
                        value={formData.adminUserEmail}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>
                <div className="md:col-span-1">
                    <label className="block cursor-pointer w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:ring-2 hover:ring-primary transition">
                        <div className="flex items-center gap-2 justify-center">
                            {!formData.logo && <AiOutlineUpload size={24} />}
                            <span>
                                {formData.logo
                                    ? 'Logo selected'
                                    : 'Choose college logo'}
                            </span>
                        </div>
                        <input
                            name="logo"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            required
                            disabled={formData.logo}
                        />
                    </label>
                    {formData.logo && (
                        <div className="relative w-full flex justify-center items-center mt-2">
                            <img
                                src={formData.logo}
                                alt="Logo preview"
                                className="object-cover rounded-md"
                            />
                            <div
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    try {
                                        const urlParts =
                                            formData.logo.split('/');
                                        const filename =
                                            urlParts[urlParts.length - 1];
                                        const res = await fetch(
                                            `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/delete/${filename}`,
                                            {
                                                method: 'DELETE',
                                            }
                                        );
                                        if (!res.ok) {
                                            throw new Error(
                                                'Failed to delete file from server'
                                            );
                                        }
                                        console.log('File deleted from server');
                                        setFormData({ ...formData, logo: '' });
                                    } catch (error) {
                                        console.error(
                                            'Error deleting logo:',
                                            error
                                        );
                                    }
                                }}
                                className="absolute -top-1 -right-1 p-1 rounded-full bg-gray-600"
                            >
                                <MdOutlineDelete className="text-red-400" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="md:col-span-1">
                    <input
                        name="website"
                        type="text"
                        placeholder="Website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="bg-background/55 hover:bg-background/80 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
                    >
                        Register College
                    </button>
                </div>
            </form>

            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Registered Colleges
                </h3>
                <div className="grid md:grid-cols-2 gap-4 overflow-auto">
                    {collegeList?.map((college) => (
                        <div
                            key={college._id}
                            className="relative p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center gap-4"
                            onClick={() => setShowModal(college)}
                        >
                            {college.verified ? (
                                <FaCheck className="absolute top-3 right-3 text-green-500" />
                            ) : (
                                <RiErrorWarningLine className="absolute top-3 right-3 text-red-500" />
                            )}
                            {/* Logo Section */}
                            <div className="w-20 h-20 flex-shrink-0">
                                <img
                                    src={college.logo || '/default-logo.png'} // fallback logo if none provided
                                    alt={college.name}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                                    {college.name}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {college.adminUserEmail}
                                </span>
                                {college.city && college.state && (
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {college.city}, {college.state}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                <InstituteAdminModal
                    data={showModal}
                    onClose={() => {
                        setShowModal(null);
                    }}
                />
            )}
        </div>
    );
};

export default CollegeSection;
