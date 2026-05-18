'use client';

import React, { useState, useEffect } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { useNationalEvent } from '@/src/context/National/NationalEventContext'; // <- you said this exists
import {
    eventInstituteGET,
    eventInstitutePOST,
} from '@/src/serverAction/eventAction';
import Loading from '@/src/app/loading';
import { generateVerificationTokens } from '@/src/utils/generateVerificationTokens';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import RegisteredTeamsTable from './TeamRegistrationTable';

const CollegeEvent = ({ college }) => {
    const national = useNationalEvent();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    // modal control
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        national: national?._id || '',
        institute: college?._id || '',
        name:
            national?.name +
            ' - ' +
            national?.session.toString() +
            ' x ' +
            college?.name,
        slug:
            (
                national?.name +
                '-' +
                national?.session.toString() +
                ' x ' +
                college?.name
            )
                ?.replace(/\s+/g, '-')
                .toLowerCase() || generateVerificationTokens(),
        shortDescription: '',
        description: '',
        dateTime: '',
        image: '',
        location: '',
        locationURL: '',
    });

    useEffect(() => {
        const checkAndFetch = async () => {
            if (!college?._id || !national?._id) {
                setLoading(false);
                return;
            }

            // ✅ Check if this national is linked to the college
            const isLinked =
                Array.isArray(college.national) &&
                college.national.some((id) => id.toString() === national._id);

            if (!isLinked) {
                setLoading(false);
                return;
            }

            // ✅ Fetch only if linked
            const { success, data } = await eventInstituteGET(
                college._id,
                national._id
            );
            if (success && data) setEvent(data);
            setLoading(false);
        };

        checkAndFetch();
    }, [college, national]);

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
            setFormData({ ...formData, image: data.url });
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleDeleteImage = () => {
        setFormData({ ...formData, image: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, data } = await eventInstitutePOST(formData);
        if (success) {
            setEvent(data);
            setShowModal(false);
            setFormData({
                national: national?._id || '',
                institute: college?._id || '',
                name: '',
                slug: '',
                shortDescription: '',
                description: '',
                dateTime: '',
                image: '',
                location: '',
                locationURL: '',
            });
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="h-full overflow-auto p-6 max-w-5xl mx-auto">
            {/* Already created event */}
            {event ? (
                <div className="space-y-10">
                    {/* Event Details Card */}
                    <div className="p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="lg:w-1/3">
                                <img
                                    src={event.image}
                                    alt={event.name}
                                    className="w-full h-56 object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div className="lg:w-2/3">
                                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                                    {event.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-3 break-words">
                                    {event.shortDescription}
                                </p>
                                <div className="text-sm space-y-1 text-gray-900 dark:text-gray-100">
                                    <p>
                                        <span className="font-medium">
                                            Date:
                                        </span>{' '}
                                        {new Date(
                                            event.dateTime
                                        ).toLocaleString()}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Location:
                                        </span>{' '}
                                        <a
                                            href={event.locationURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purple-500 hover:underline"
                                        >
                                            {event.location}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Registered Teams Section */}
                    <div className="p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-gray-900 dark:text-gray-100">
                            Registered Teams ({event.registered?.length || 0})
                        </h3>

                        {event && event.registered?.length > 0 ? (
                            <div className="mt-10">
                                <RegisteredTeamsTable
                                    registered={event.registered}
                                />
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">
                                No teams have registered yet.
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Your college has not registered any event for{' '}
                        {national?.name} - {national?.session} yet.
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
                    >
                        Create Event
                    </button>
                </div>
            )}

            {/* Modal for creating event */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white dark:bg-gray-900 h-5/6 rounded-xl shadow-xl w-full max-w-3xl p-6 grid gap-4 overflow-scroll"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Create College Event
                            </h3>
                        </div>

                        {/* Event Name */}
                        <div className="md:col-span-2 w-full">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                Event Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                readOnly
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Short Description */}
                        <div className="md:col-span-2 w-full">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                Short Description
                            </label>
                            <textarea
                                name="shortDescription"
                                placeholder="Short Description"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                rows={2}
                                required
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Full Description (ReactQuill) */}
                        <div className="md:col-span-2 w-full">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                Full Description
                            </label>
                            <ReactQuill
                                placeholder="Enter full event description"
                                theme="snow"
                                value={formData.description}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        description: value,
                                    })
                                }
                                className="bg-white text-white dark:bg-gray-800"
                            />
                        </div>

                        {/* Date & Time */}
                        <div className="w-full">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                Event Date & Time
                            </label>
                            <input
                                name="dateTime"
                                type="datetime-local"
                                value={formData.dateTime}
                                onChange={handleChange}
                                required
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Location */}
                        <div className="w-full">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                Location
                            </label>
                            <input
                                name="location"
                                placeholder="Event Location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Location URL */}
                        <div className="w-full">
                            <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                Google Maps URL
                            </label>
                            <input
                                name="locationURL"
                                type="url"
                                placeholder="Google Maps URL"
                                value={formData.locationURL}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="md:col-span-2 w-full">
                            <label className="block cursor-pointer w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:ring-2 hover:ring-purple-500 transition text-center">
                                <div className="flex items-center justify-center gap-2">
                                    {!formData.image && (
                                        <AiOutlineUpload size={24} />
                                    )}
                                    <span>
                                        {formData.image
                                            ? 'Image Selected'
                                            : 'Upload Event Image'}
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
                                <div className="relative w-full flex justify-center items-center mt-2">
                                    <img
                                        src={formData.image}
                                        alt="Event preview"
                                        className="h-32 object-cover rounded-md"
                                    />
                                    <div
                                        onClick={handleDeleteImage}
                                        className="absolute -top-2 -right-2 p-1 rounded-full bg-gray-600 cursor-pointer"
                                    >
                                        <MdOutlineDelete className="text-red-400" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-2 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition"
                            >
                                Create Event
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CollegeEvent;
