'use client';
import ImageUpload from '@/src/components/ImageUpload';
import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/NavbarHome';
import Preview from '@/src/components/Preview/Preview';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const Page = () => {
    const { data: session } = useSession();
    const [showPreview, setShowPreview] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const ref = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        shortDescription: '',
        description: '',
        start: '',
        end: '',
        time: '',
        image: '',
        fileId: '',
        thumbnail: '',
        location: '',
        locationURL: '',
        eventType: '',
        price: '',
        maxParticipation: '',
        prizePool: '',
        sponsors: [],
        featureGuests: [],
    });

    const [errors, setErrors] = useState({
        name: '',
        category: '',
        description: '',
        start: '',
        end: '',
        time: '',
        location: '',
        locationURL: '',
        eventType: '',
        price: '',
        maxParticipation: '',
        image: '',
        thumbnail: '',
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                let data = await response.json();
                data = data.events?.map((event) => event.name);
                setAllEvents(data);
            } catch (error) {
                console.error('Failed to fetch events:', error);
                setError(error.message);
            }
        };

        fetchEvents();
    }, []);

    if (session?.role !== 'admin') {
        return redirect('/api/auth/signin');
    }

    const getImageData = (data) => {
        setFormData((prev) => ({
            ...prev,
            image: data.url,
            thumbnail: data.thumbnailUrl,
            fileId: data.fileId,
        }));
    };

    const getFeatureGuestImageData = (data, index) => {
        const updatedGuests = [...formData.featureGuests];
        updatedGuests[index].image = data.url;
        updatedGuests[index].thumbnail = data.thumbnailUrl;
        updatedGuests[index].fileId = data.fileId;
        setFormData({
            ...formData,
            featureGuests: updatedGuests,
        });
    };

    const validateField = (field, value) => {
        let error = '';

        value = value.trim();

        if (field === 'name' && allEvents.includes(value)) {
            error = 'Event with this name already exists';
        }

        if (field === 'name') {
            // Check for special characters
            const specialCharRegex = /[^a-zA-Z0-9\s]/;
            if (specialCharRegex.test(value)) {
                error = 'Name cannot contain special characters';
            } else if (allEvents.includes(value)) {
                error = 'Event with this name already exists';
            }
        }

        if (!value && field !== 'image') {
            error = 'This field is required';
        }

        if (field === 'category' && value === 'Select') {
            error = 'Please select a category';
        }

        if (field === 'image' && !formData.image) {
            error = 'Image is required';
        }

        if (
            formData.eventType === 'paid' &&
            field === 'price' &&
            value &&
            isNaN(parseFloat(value))
        ) {
            error = 'Price must be a valid number';
        }

        if (field === 'start' || field === 'end') {
            const start =
                field === 'start' ? new Date(value) : new Date(formData.start);
            const end =
                field === 'end' ? new Date(value) : new Date(formData.end);

            if (start && end && start > end) {
                error =
                    field === 'start'
                        ? 'Start date must be before end date'
                        : 'End date must be after start date';
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'eventType' && value === 'free') {
            setFormData((prev) => ({
                ...prev,
                price: '0',
            }));
        }
        // Update field value
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Validate the updated field
        validateField(name, value);
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        setFormData((prev) => ({
            ...prev,
            name: prev.name.trim(),
            shortDescription: prev.shortDescription.trim(),
            location: prev.location.trim(),
            locationURL: prev.locationURL.trim(),
        }));

        if (allEvents.includes(formData.name)) {
            newErrors.name = 'Event with this name already exists';
            isValid = false;
        }

        // Validate all fields
        Object.keys(formData).forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
                isValid = false;
            }
        });

        // Image validation
        if (!formData.image) {
            newErrors.image = 'Image is required';
            isValid = false;
        }

        // Update errors
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            let response = await fetch('/api/create-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            response = await response.json();
            if (response.success) {
                alert('Event created successfully');
                setFormData({});
                setShowPreview(false);
                ref.current.reset();
                redirect('/admin/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 mt-10">
                {/* Page Title */}
                <div className="w-4/5 mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        Create Event
                    </h1>
                </div>

                <form
                    ref={ref}
                    onSubmit={handleSubmit}
                    className="w-4/5 bg-white shadow-md rounded-lg p-8 space-y-8"
                >
                    {/* Form */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Event Title */}
                        <div className="col-span-2">
                            <label
                                htmlFor="name"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Event Title
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Title"
                                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        </div>

                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Event Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                            >
                                <option value="">Select</option>
                                <option value="Hackathon">Hackathon</option>
                                <option value="Ideathon">Ideathon</option>
                                <option value="Tech talk">Tech talk</option>
                            </select>
                            <p className="text-red-500 text-sm">
                                {errors.category}
                            </p>
                        </div>
                    </div>
                    {/* Short Description */}
                    <div>
                        <label
                            htmlFor="shortDescription"
                            className="block text-lg font-medium text-gray-700"
                        >
                            Short Description
                        </label>
                        <textarea
                            id="shortDescription"
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleChange}
                            maxLength="40"
                            placeholder="Enter a short description (30-40 characters)"
                            rows="1"
                            className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                        ></textarea>
                        <p className="text-red-500 text-sm">
                            {formData.shortDescription?.length < 30
                                ? 'Description must be at least 30 characters.'
                                : errors.shortDescription}
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-lg font-medium text-gray-700"
                        >
                            About The Event
                        </label>
                        <ReactQuill
                            placeholder="Enter a description"
                            theme="snow"
                            onChange={(prev) => {
                                setFormData({ ...formData, description: prev });
                            }}
                            value={formData.description}
                        />
                        <p className="text-red-500 text-sm">
                            {errors.description}
                        </p>
                    </div>

                    {/* Dates and Time */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                            <label
                                htmlFor="start"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="start"
                                name="start"
                                value={formData.start}
                                onChange={handleChange}
                                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.start}
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="end"
                                className="block text-lg font-medium text-gray-700"
                            >
                                End Date
                            </label>
                            <input
                                type="date"
                                id="end"
                                name="end"
                                value={formData.end}
                                onChange={handleChange}
                                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                            />
                            <p className="text-red-500 text-sm">{errors.end}</p>
                        </div>
                        <div>
                            <label
                                htmlFor="time"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.time}
                            </p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="location"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter location"
                                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.location}
                            </p>
                        </div>
                        <div>
                            <label
                                htmlFor="locationURL"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Location URL
                            </label>
                            <input
                                type="url"
                                id="locationURL"
                                name="locationURL"
                                value={formData.locationURL}
                                onChange={handleChange}
                                placeholder="Enter location URL"
                                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.locationURL}
                            </p>
                        </div>
                    </div>

                    {/* Event Type */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="eventType"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Event Type
                            </label>
                            <select
                                name="eventType"
                                id="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                            >
                                <option value="">Select</option>
                                <option value="paid">Ticketed Event</option>
                                <option value="free">Free Event</option>
                            </select>
                            <p className="text-red-500 text-sm">
                                {errors.eventType}
                            </p>
                        </div>
                        {formData.eventType === 'paid' && (
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block text-lg font-medium text-gray-700"
                                >
                                    Ticket Price
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                                />
                                <p className="text-red-500 text-sm">
                                    {errors.price}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Maximum Participation */}
                        <div>
                            <label
                                htmlFor="maxParticipation"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Maximum Entries
                            </label>
                            <input
                                type="number"
                                id="maxParticipation"
                                name="maxParticipation"
                                value={formData.maxParticipation}
                                onChange={(e) => {
                                    if (
                                        parseInt(e.target.value) >= 1 ||
                                        e.target.value === ''
                                    )
                                        handleChange(e);
                                }}
                                min="1"
                                placeholder="Enter maximum entries (minimum 1)"
                                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.maxParticipation}
                            </p>
                        </div>

                        {/* Prize Pool */}
                        <div>
                            <label
                                htmlFor="prizePool"
                                className="block text-lg font-medium text-gray-700"
                            >
                                Prize Pool (in INR)
                            </label>
                            <input
                                type="number"
                                id="prizePool"
                                name="prizePool"
                                value={formData.prizePool}
                                onChange={(e) => {
                                    if (
                                        parseInt(e.target.value) >= 0 ||
                                        e.target.value === ''
                                    )
                                        handleChange(e);
                                }}
                                min="0"
                                placeholder="Enter the prize pool amount (minimum 0)"
                                className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-background"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.prizePool}
                            </p>
                        </div>
                    </div>

                    {/* Sponsors Upload */}
                    <div>
                        <label
                            htmlFor="sponsors"
                            className="block text-lg font-semibold text-gray-800 mb-4"
                        >
                            Upload Sponsors
                        </label>

                        {/* Sponsors Upload Form */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {formData.sponsors?.map((sponsor, index) => (
                                <div
                                    key={index}
                                    className="relative bg-white shadow-md rounded-lg p-6 border border-gray-200"
                                >
                                    {/* Remove Sponsor Button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updatedSponsors =
                                                formData.sponsors.filter(
                                                    (_, i) => i !== index
                                                );
                                            setFormData({
                                                ...formData,
                                                sponsors: updatedSponsors,
                                            });
                                        }}
                                        className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
                                    >
                                        ✕
                                    </button>

                                    {/* Sponsor Image Upload */}
                                    <div className="mb-4">
                                        <ImageUpload
                                            theme="small"
                                            getImageData={(data) => {
                                                const updatedSponsors = [
                                                    ...formData.sponsors,
                                                ];
                                                updatedSponsors[index] = {
                                                    ...updatedSponsors[index],
                                                    image: data,
                                                };
                                                setFormData({
                                                    ...formData,
                                                    sponsors: updatedSponsors,
                                                });
                                            }}
                                        />
                                    </div>

                                    {/* Sponsor Name */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor={`sponsorName-${index}`}
                                            className="block text-sm font-medium text-gray-600"
                                        >
                                            Sponsor Name
                                        </label>
                                        <input
                                            type="text"
                                            id={`sponsorName-${index}`}
                                            name={`sponsorName-${index}`}
                                            value={sponsor.name || ''}
                                            onChange={(e) => {
                                                const updatedSponsors = [
                                                    ...formData.sponsors,
                                                ];
                                                updatedSponsors[index] = {
                                                    ...updatedSponsors[index],
                                                    name: e.target.value,
                                                };
                                                setFormData({
                                                    ...formData,
                                                    sponsors: updatedSponsors,
                                                });
                                            }}
                                            placeholder="Enter sponsor name"
                                            className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Sponsor Website Link */}
                                    <div>
                                        <label
                                            htmlFor={`sponsorLink-${index}`}
                                            className="block text-sm font-medium text-gray-600"
                                        >
                                            Sponsor Website Link
                                        </label>
                                        <input
                                            type="url"
                                            id={`sponsorLink-${index}`}
                                            name={`sponsorLink-${index}`}
                                            value={sponsor.link || ''}
                                            onChange={(e) => {
                                                const updatedSponsors = [
                                                    ...formData.sponsors,
                                                ];
                                                updatedSponsors[index] = {
                                                    ...updatedSponsors[index],
                                                    link: e.target.value,
                                                };
                                                setFormData({
                                                    ...formData,
                                                    sponsors: updatedSponsors,
                                                });
                                            }}
                                            placeholder="Enter sponsor website link"
                                            className="mt-2 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add Sponsor Button */}
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        sponsors: [
                                            ...formData.sponsors,
                                            { name: '', link: '', image: null },
                                        ],
                                    });
                                }}
                                className="bg-main text-white px-6 py-2 rounded-lg shadow hover:bg-primary hover:text-background border transition"
                            >
                                + Add Sponsor
                            </button>
                        </div>

                        <p className="text-red-500 text-sm mt-2">
                            {errors.sponsors}
                        </p>
                    </div>

                    {/* Feature Guests */}
                    <div>
                        <label
                            htmlFor="featureGuests"
                            className="block text-lg font-medium text-gray-700 mb-4"
                        >
                            Feature Guests
                        </label>

                        {/* Guest Details Form */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {formData.featureGuests?.map((guest, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg bg-white shadow-lg p-6 flex flex-col space-y-4"
                                >
                                    {/* Guest Image Upload */}
                                    <div>
                                        <ImageUpload
                                            theme="small"
                                            getImageData={(data) => {
                                                getFeatureGuestImageData(
                                                    data,
                                                    index
                                                );
                                            }}
                                        />
                                    </div>

                                    {/* Guest Name */}
                                    <div>
                                        <label
                                            htmlFor={`guestName-${index}`}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Guest Name
                                        </label>
                                        <input
                                            type="text"
                                            id={`guestName-${index}`}
                                            name={`guestName-${index}`}
                                            value={guest.name}
                                            onChange={(e) => {
                                                const updatedGuests = [
                                                    ...formData.featureGuests,
                                                ];
                                                updatedGuests[index].name =
                                                    e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    featureGuests:
                                                        updatedGuests,
                                                });
                                            }}
                                            placeholder="Enter guest name"
                                            className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Guest Role */}
                                    <div>
                                        <label
                                            htmlFor={`guestRole-${index}`}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            id={`guestRole-${index}`}
                                            name={`guestRole-${index}`}
                                            value={guest.role}
                                            onChange={(e) => {
                                                const updatedGuests = [
                                                    ...formData.featureGuests,
                                                ];
                                                updatedGuests[index].role =
                                                    e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    featureGuests:
                                                        updatedGuests,
                                                });
                                            }}
                                            placeholder="Eg. Speaker, Judge, Mentor"
                                            className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Guest Designation */}
                                    <div>
                                        <label
                                            htmlFor={`guestDesignation-${index}`}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Designation
                                        </label>
                                        <input
                                            type="text"
                                            id={`guestDesignation-${index}`}
                                            name={`guestDesignation-${index}`}
                                            value={guest.designation}
                                            onChange={(e) => {
                                                const updatedGuests = [
                                                    ...formData.featureGuests,
                                                ];
                                                updatedGuests[
                                                    index
                                                ].designation = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    featureGuests:
                                                        updatedGuests,
                                                });
                                            }}
                                            placeholder="Enter guest designation"
                                            className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Guest Social Links */}
                                    <div>
                                        <label
                                            htmlFor={`guestSocialLinks-${index}`}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Social Links
                                        </label>
                                        <input
                                            type="text"
                                            id={`guestSocialLinks-${index}`}
                                            name={`guestSocialLinks-${index}`}
                                            value={guest.socialLinks}
                                            onChange={(e) => {
                                                const updatedGuests = [
                                                    ...formData.featureGuests,
                                                ];
                                                updatedGuests[
                                                    index
                                                ].socialLinks = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    featureGuests:
                                                        updatedGuests,
                                                });
                                            }}
                                            placeholder="Enter social media links (e.g., LinkedIn, Twitter)"
                                            className="mt-1 w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    {/* Remove Guest */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updatedGuests =
                                                formData.featureGuests.filter(
                                                    (_, i) => i !== index
                                                );
                                            setFormData({
                                                ...formData,
                                                featureGuests: updatedGuests,
                                            });
                                        }}
                                        className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-primary hover:text-background border transition"
                                    >
                                        Remove Guest
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Add Guest Button */}
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    ...formData,
                                    featureGuests: [
                                        ...formData.featureGuests,
                                        {
                                            name: '',
                                            role: '',
                                            designation: '',
                                            socialLinks: '',
                                            image: null,
                                        },
                                    ],
                                });
                            }}
                            className="mt-4 bg-main text-white px-6 py-2 rounded-lg shadow hover:bg-primary hover:text-background border transition"
                        >
                            Add Guest
                        </button>

                        <p className="text-red-500 text-sm mt-2">
                            {errors.featureGuests}
                        </p>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-lg font-medium text-gray-700"
                        >
                            Upload Banner
                        </label>
                        <ImageUpload getImageData={getImageData} />
                        <p className="text-red-500 text-sm">{errors.image}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                if (!validateForm()) return;
                                setShowPreview(true);
                            }}
                            className="bg-main text-white px-6 py-3 rounded-lg hover:bg-primary hover:text-background border"
                        >
                            Preview
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                        >
                            Publish Event
                        </button>
                    </div>

                    {showPreview && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-6 shadow-lg w-4/5 h-4/5">
                                <Preview data={formData} />
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        onClick={() => setShowPreview(false)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    >
                                        Make Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            <Footer />
        </>
    );
};

export default Page;
