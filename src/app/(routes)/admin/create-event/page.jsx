'use client';
import ImageUpload from '@/components/ImageUpload';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import useSessionData from '@/hooks/useSessionData';
import React, { useRef, useState } from 'react';

const page = () => {
    const session = useSessionData();
    const ref = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        start: '',
        end: '',
        duration: '',
        time: '',
        location: '',
        locationURL: '',
        eventType: '',
        price: '',
        maxParticipation: '',
        image: '',
        fileId: '',
        thumbnail: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        category: '',
        description: '',
        start: '',
        end: '',
        duration: '',
        time: '',
        location: '',
        locationURL: '',
        eventType: '',
        price: '',
        maxParticipation: '',
        image: '',
        thumbnail: '',
    });

    const getImageData = (data) => {
        setFormData((prev) => ({
            ...prev,
            image: data.url,
            thumbnail: data.thumbnailUrl,
            fileId: data.fileId,
        }));
    };

    const validateField = (field, value) => {
        let error = '';

        if (!value && field !== 'image') {
            error = 'This field is required';
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
            let response = fetch('/api/create-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({});
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar user={session?.user} />
            <div className="min-h-screen bg-white flex flex-col items-center py-10">
                {/* Page Title */}
                <h1 className="text-4xl font-bold mb-6 text-gray-800 ">
                    Create Event
                </h1>

                <form
                    ref={ref}
                    onSubmit={handleSubmit}
                    className="w-full max-w-3xl bg-white rounded-lg p-6 space-y-6"
                >
                    {/* Form */}
                    {/* Event Title */}
                    <div className="grid grid-cols-2 gap-3 items-center">
                        <label
                            className="text-lg font-medium text-gray-700"
                            htmlFor="name"
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
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                        />
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    </div>

                    {/* Category */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label
                            className="text-lg font-medium text-gray-700"
                            htmlFor="category"
                        >
                            Event Category
                        </label>
                        <select
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                        >
                            <option value="">Select</option>
                            <option value="Hackthon">Hackthon</option>
                            <option value="Ideathon">Ideathon</option>
                            <option value="Tech talk">Tech talk</option>
                        </select>
                        <p className="text-red-500 text-sm">
                            {errors.category}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label
                            className="text-lg font-medium text-gray-700"
                            htmlFor="description"
                        >
                            About The Event
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter a description"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300 resize-none"
                            rows="2"
                        ></textarea>
                        <p className="text-red-500 text-sm">
                            {errors.description}
                        </p>
                    </div>

                    {/* Dates and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-2">
                            <label
                                className="text-lg font-medium text-gray-700"
                                htmlFor="start"
                            >
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="start"
                                name="start"
                                value={formData.start}
                                onChange={handleChange}
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.start}
                            </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label
                                className="text-lg font-medium text-gray-700"
                                htmlFor="end"
                            >
                                End Date
                            </label>
                            <input
                                type="date"
                                id="end"
                                name="end"
                                value={formData.end}
                                onChange={handleChange}
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                            />
                            <p className="text-red-500 text-sm">{errors.end}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label
                                className="text-lg font-medium text-gray-700"
                                htmlFor="time"
                            >
                                Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.time}
                            </p>
                        </div>
                    </div>

                    {/* Other Details */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label
                            className="text-lg font-medium text-gray-700"
                            htmlFor="duration"
                        >
                            Run Time
                        </label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            placeholder="Enter duration"
                            value={formData.duration}
                            onChange={handleChange}
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.duration}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label
                            className="text-lg font-medium text-gray-700"
                            htmlFor="location"
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
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.location}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label
                            className="text-lg font-medium text-gray-700"
                            htmlFor="locationURL"
                        >
                            Location URL
                        </label>
                        <input
                            type="text"
                            id="locationURL"
                            name="locationURL"
                            value={formData.locationURL}
                            onChange={handleChange}
                            placeholder="Enter location URL"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.locationURL}
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 items-center">
                        <div className="flex flex-col space-y-2">
                            <label
                                className="text-lg font-medium text-gray-700"
                                htmlFor="eventType"
                            >
                                Event Type
                            </label>
                            <select
                                name="eventType"
                                id="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
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
                            <div className="flex flex-col space-y-2">
                                <label
                                    className="text-lg font-medium text-gray-700"
                                    htmlFor="price"
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
                                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                                />
                                <p className="text-red-500 text-sm">
                                    {errors.price}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col space-y-2">
                            <label
                                className="text-lg font-medium text-gray-700"
                                htmlFor="maxParticipation"
                            >
                                Maximum Participation
                            </label>
                            <input
                                type="text"
                                id="maxParticipation"
                                name="maxParticipation"
                                value={formData.maxParticipation}
                                onChange={handleChange}
                                placeholder="Enter max participants"
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-red-300"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.maxParticipation}
                            </p>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="flex flex-col space-y-2">
                        <label
                            className="text-lg font-medium text-gray-700"
                            htmlFor="image"
                        >
                            Upload Banner
                        </label>
                        <ImageUpload getImageData={getImageData} />
                        <p className="text-red-500 text-sm">{errors.image}</p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Publish
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default page;
