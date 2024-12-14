'use client';
import ImageUpload from '@/src/components/ImageUpload';
import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/Navbar';
import Preview from '@/src/components/Preview/Preview';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const Page = () => {
    const { data: session } = useSession();
    const [showPreview, setShowPreview] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
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
                data = data.events.map((event) => event.name);
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

    const validateField = (field, value) => {
        let error = '';

        if (field === 'name' && allEvents.includes(value)) {
            error = 'Event with this name already exists';
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
            let response = fetch('/api/create-event', {
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
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white flex flex-col items-center py-10">
                {/* Page Title */}
                <div className="w-4/5 ">
                    <h1 className="text-4xl font-bold mb-6 text-gray-800 ">
                        Create Event
                    </h1>
                </div>

                <form
                    ref={ref}
                    onSubmit={handleSubmit}
                    className="w-4/5 bg-white rounded-lg p-6 space-y-9"
                >
                    {/* Form */}
                    {/* Event Title */}
                    <div className="w-3/4 flex flex-col gap-8">
                        {/* Event Title */}
                        <div className="w-full flex flex-col">
                            <div className="w-full flex gap-10 items-center">
                                <label
                                    className="w-[20%] text-lg font-medium text-gray-700"
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
                                    className="w-[70%] border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                                />
                            </div>
                            <p className="text-red-500 text-sm mt-2 w-[70%] ml-auto">
                                {errors.name}
                            </p>
                        </div>

                        {/* Category */}
                        <div className="w-full flex flex-col">
                            <div className="w-full flex gap-10 items-center">
                                <label
                                    className="w-[20%] text-lg font-medium text-gray-700"
                                    htmlFor="category"
                                >
                                    Event Category
                                </label>
                                <select
                                    name="category"
                                    id="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-[70%] border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                                >
                                    <option value="">Select</option>
                                    <option value="Hackthon">Hackthon</option>
                                    <option value="Ideathon">Ideathon</option>
                                    <option value="Tech talk">Tech talk</option>
                                </select>
                            </div>
                            <p className="text-red-500 text-sm mt-2 w-[70%] ml-auto">
                                {errors.category}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="w-full flex flex-col">
                            <div className="w-full flex gap-10 items-start">
                                <label
                                    className="w-[20%] text-lg font-medium text-gray-700"
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
                                    className="w-[70%] border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                                    rows="7"
                                ></textarea>
                            </div>
                            <p className="text-red-500 text-sm mt-2 w-[70%] ml-auto">
                                {errors.description}
                            </p>
                        </div>
                    </div>
                    {/* Dates and Time */}
                    <div className="w-full flex gap-4 pt-10">
                        <div className="w-[20%] flex flex-col space-y-2">
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
                                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.start}
                            </p>
                        </div>
                        <div className="w-[20%] flex flex-col space-y-2">
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
                                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                            />
                            <p className="text-red-500 text-sm">{errors.end}</p>
                        </div>
                        <div className="w-[20%] flex flex-col space-y-2">
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
                                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.time}
                            </p>
                        </div>
                        <div className="w-[20%] flex flex-col space-y-2">
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
                                placeholder="Eg. 12 Hours"
                                value={formData.duration}
                                onChange={handleChange}
                                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                            />
                            <p className="text-red-500 text-sm">
                                {errors.duration}
                            </p>
                        </div>
                    </div>
                    {/* Other Details */}
                    <div className="w-3/4 flex flex-col gap-8">
                        <div className="w-full flex flex-col">
                            <div className="w-full flex gap-10 items-start">
                                <label
                                    className="w-[20%] text-lg font-medium text-gray-700"
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
                                    className="w-[70%] border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                                />
                            </div>
                            <p className="text-red-500 text-sm mt-2 w-[70%] ml-auto">
                                {errors.location}
                            </p>
                        </div>
                        <div className="w-full flex flex-col">
                            <div className=" w-full flex gap-10 items-start">
                                <label
                                    className="w-[20%] text-lg font-medium text-gray-700"
                                    htmlFor="locationURL"
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
                                    className="w-[70%] border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                                />
                            </div>
                            <p className="text-red-500 text-sm mt-2 w-[70%] ml-auto">
                                {errors.locationURL}
                            </p>
                        </div>
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
                                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
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
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                                />
                                <p className="text-red-500 text-sm">
                                    {errors.price}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="w-[20%] flex flex-col space-y-2">
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
                            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring focus:ring-red-300"
                        />
                        <p className="text-red-500 text-sm">
                            {errors.maxParticipation}
                        </p>
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
                    <div className="flex justify-end">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                if (!validateForm()) return;
                                setShowPreview(true);
                            }}
                            className="bg-neutral-500 text-white px-9 py-3 rounded-full hover:bg-neutral-900 transition duration-100"
                        >
                            Preview
                        </button>
                    </div>
                    {showPreview && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                            <div className="flex flex-col justify-center items-center bg-white  rounded-lg shadow-lg h-[90%] w-[90%] overflow-auto">
                                <Preview data={formData} />
                                <div className="w-full flex justify-end gap-6 mr-8  p-8">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowPreview(false);
                                        }}
                                        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        Make Changes
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
                                    >
                                        Publish Event
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
