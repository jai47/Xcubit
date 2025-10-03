'use client';

import React, { useEffect, useState } from 'react';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';

const NationalEventSection = ({
    nationalEventAdminGET,
    nationalEventAdminPOST,
    nationalEventAdminPUT,
}) => {
    const [formData, setFormData] = useState({
        name: '',
        session: '',
        date: '',
        shortDescription: '',
        description: '',
        banner: '',
        venue: { name: '', address: '', locationURL: '' },
        timeline: [],
    });

    const [timelineItem, setTimelineItem] = useState({
        title: '',
        date: '',
        blocks: [],
    });

    const [eventList, setEventList] = useState([]);
    const [editingEventId, setEditingEventId] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const { success, data } = await nationalEventAdminGET();
        if (success) setEventList(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleVenueChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            venue: { ...formData.venue, [name]: value },
        });
    };

    // ✅ Add block to timeline item
    const addBlockToTimelineItem = async () => {
        if (!timelineItem.newBlockValue) return;

        let blockValue = timelineItem.newBlockValue;

        if (timelineItem.newBlockType === 'list') {
            blockValue = blockValue.split('\n');
        }

        const newBlock = {
            type: timelineItem.newBlockType || 'text',
            value: blockValue,
        };

        setTimelineItem({
            ...timelineItem,
            blocks: [...(timelineItem.blocks || []), newBlock],
            newBlockValue: '',
        });
    };

    const handleDeleteLogo = async () => {
        try {
            const urlParts = formData.banner.split('/');
            const filename = urlParts[urlParts.length - 1];
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/delete/${filename}`,
                {
                    method: 'DELETE',
                }
            );

            if (!res.ok) throw new Error('Failed to delete file');

            setFormData({ ...formData, banner: '' });
        } catch (err) {
            console.error('Delete logo error:', err);
        }
    };

    const cleanFormDataForDB = (data) => {
        return {
            ...data,
            timeline: data.timeline.map((item) => ({
                title: item.title,
                date: item.date,
                blocks: item.blocks.map((block) => ({
                    type: block.type,
                    value: block.value,
                })),
            })),
        };
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.session) return;

        const cleanedData = cleanFormDataForDB(formData); // ✅ clean timeline

        let response;
        if (editingEventId) {
            response = await nationalEventAdminPUT(editingEventId, cleanedData);
        } else {
            response = await nationalEventAdminPOST(cleanedData);
        }

        if (response.success) {
            fetchEvents();
            setFormData({
                name: '',
                session: '',
                date: '',
                venue: { name: '', address: '', locationURL: '' },
                timeline: [],
            });
            setEditingEventId(null);
        }
    };

    const handleEdit = (event) => {
        setFormData(event);
        setEditingEventId(event._id);
    };

    return (
        <div className="h-full overflow-auto p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Manage National Events
            </h2>

            {/* Event Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 grid gap-4 md:grid-cols-2 dark:text-white"
            >
                {/* Event Fields */}
                <input
                    name="name"
                    type="text"
                    placeholder="Event Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    required
                />

                <input
                    name="session"
                    type="text"
                    placeholder="Session (e.g. 2026)"
                    value={formData.session}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                    required
                />

                <input
                    name="date"
                    type="date"
                    value={formData.date?.split('T')[0] || ''}
                    onChange={handleChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="shortDescription"
                    type="text"
                    value={formData?.shortDescription || ''}
                    onChange={handleChange}
                    placeholder="Short Description"
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <input
                    name="description"
                    type="text"
                    value={formData?.description || ''}
                    onChange={handleChange}
                    placeholder="Description"
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        {formData.banner
                            ? '✅ Banner uploaded'
                            : '📤 Click to upload banner'}
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
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
                                if (!res.ok) throw new Error('Upload failed');
                                const data = await res.json();
                                setFormData({
                                    ...formData,
                                    banner: data.url,
                                });
                            } catch (err) {
                                console.error('Upload error:', err);
                            }
                        }}
                    />
                </label>
                {formData.banner && (
                    <div className="w-full h-full relative">
                        <div
                            onClick={handleDeleteLogo}
                            className="absolute -top-1 -right-1 p-1 rounded-full bg-gray-600 cursor-pointer"
                        >
                            <MdOutlineDelete className="text-red-400" />
                        </div>
                        <img src={formData.banner} alt="" />
                    </div>
                )}

                {/* Venue */}
                <input
                    name="name"
                    type="text"
                    placeholder="Venue Name"
                    value={formData.venue.name}
                    onChange={handleVenueChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />
                <input
                    name="address"
                    type="text"
                    placeholder="Venue Address"
                    value={formData.venue.address}
                    onChange={handleVenueChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />
                <input
                    name="locationURL"
                    type="text"
                    placeholder="Venue Location URL"
                    value={formData.venue.locationURL}
                    onChange={handleVenueChange}
                    className="md:col-span-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                />

                {/* Timeline Section */}
                <div className="md:col-span-2 border-t pt-4">
                    <h4 className="font-bold text-lg mb-2">Timeline</h4>

                    {/* Add Timeline Item */}
                    <div className="space-y-3 mb-6 p-3 border rounded-lg">
                        <input
                            type="text"
                            placeholder="Timeline Title"
                            value={timelineItem.title || ''}
                            onChange={(e) =>
                                setTimelineItem({
                                    ...timelineItem,
                                    title: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded-lg dark:bg-gray-800"
                        />

                        <input
                            type="date"
                            value={timelineItem.date || ''}
                            onChange={(e) =>
                                setTimelineItem({
                                    ...timelineItem,
                                    date: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded-lg dark:bg-gray-800"
                        />

                        {/* Block adder */}
                        <div className="space-y-2">
                            <select
                                value={timelineItem.newBlockType || 'text'}
                                onChange={(e) =>
                                    setTimelineItem({
                                        ...timelineItem,
                                        newBlockType: e.target.value,
                                    })
                                }
                                className="p-2 border rounded-lg dark:bg-gray-800"
                            >
                                <option value="text">Text</option>
                                <option value="image">Image</option>
                                <option value="list">List</option>
                            </select>

                            {timelineItem.newBlockType === 'text' && (
                                <input
                                    type="text"
                                    placeholder="Block text"
                                    value={timelineItem.newBlockValue || ''}
                                    onChange={(e) =>
                                        setTimelineItem({
                                            ...timelineItem,
                                            newBlockValue: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-lg dark:bg-gray-800"
                                />
                            )}

                            {timelineItem.newBlockType === 'image' && (
                                <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {timelineItem.newBlockValue
                                            ? '✅ Image uploaded'
                                            : '📤 Click to upload image'}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={async (e) => {
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
                                                if (!res.ok)
                                                    throw new Error(
                                                        'Upload failed'
                                                    );
                                                const data = await res.json();
                                                setTimelineItem({
                                                    ...timelineItem,
                                                    newBlockValue: data.url,
                                                });
                                            } catch (err) {
                                                console.error(
                                                    'Upload error:',
                                                    err
                                                );
                                            }
                                        }}
                                    />
                                </label>
                            )}

                            {timelineItem.newBlockType === 'list' && (
                                <textarea
                                    placeholder="Enter list items (one per line)"
                                    value={timelineItem.newBlockValue || ''}
                                    onChange={(e) =>
                                        setTimelineItem({
                                            ...timelineItem,
                                            newBlockValue: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-lg dark:bg-gray-800"
                                />
                            )}

                            <button
                                type="button"
                                onClick={addBlockToTimelineItem}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-3"
                            >
                                Add Block
                            </button>
                        </div>

                        {/* Preview Blocks */}
                        <div className="space-y-1">
                            {timelineItem.blocks?.map((block, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
                                >
                                    <span>
                                        {block.type === 'text' && block.value}
                                        {block.type === 'image' && (
                                            <img
                                                src={block.value}
                                                className="h-12"
                                            />
                                        )}
                                        {block.type === 'list' && (
                                            <ul className="list-disc pl-4 text-sm">
                                                {block.value.map((li, j) => (
                                                    <li key={j}>{li}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setTimelineItem({
                                                ...timelineItem,
                                                blocks: timelineItem.blocks.filter(
                                                    (_, idx) => idx !== i
                                                ),
                                            })
                                        }
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                if (!timelineItem.title || !timelineItem.date)
                                    return;
                                setFormData({
                                    ...formData,
                                    timeline: [
                                        ...formData.timeline,
                                        timelineItem,
                                    ],
                                });
                                setTimelineItem({
                                    title: '',
                                    date: '',
                                    blocks: [],
                                });
                            }}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                            Add Timeline Item
                        </button>
                    </div>

                    {/* Preview All Timeline Items */}
                    <div className="space-y-3">
                        {formData.timeline.map((item, idx) => (
                            <div
                                key={idx}
                                className="p-3 border rounded-lg bg-gray-100 dark:bg-gray-800"
                            >
                                <h5 className="font-bold">{item.title}</h5>
                                <p className="text-xs">
                                    {new Date(item.date).toDateString()}
                                </p>

                                <div className="mt-2 space-y-1">
                                    {item.blocks?.map((block, i) => (
                                        <div key={i}>
                                            {block.type === 'text' && (
                                                <p className="text-sm">
                                                    {block.value}
                                                </p>
                                            )}
                                            {block.type === 'image' && (
                                                <img
                                                    src={block.value}
                                                    className="h-20"
                                                />
                                            )}
                                            {block.type === 'list' && (
                                                <ul className="list-disc pl-4 text-sm">
                                                    {block.value.map(
                                                        (li, j) => (
                                                            <li key={j}>
                                                                {li}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setFormData({
                                            ...formData,
                                            timeline: formData.timeline.filter(
                                                (_, i) => i !== idx
                                            ),
                                        });
                                    }}
                                    className="text-red-500 mt-2"
                                >
                                    Delete Timeline Item
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2 flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-background/55 hover:bg-background/80 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
                    >
                        {editingEventId ? 'Update Event' : 'Create Event'}
                    </button>
                </div>
            </form>

            {/* Events List */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Registered Events
                </h3>
                <div className="grid md:grid-cols-2 gap-4 overflow-auto">
                    {eventList?.map((event) => (
                        <div
                            key={event._id}
                            className="relative p-4 rounded-xl shadow border bg-gray-50 dark:bg-gray-800"
                        >
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-lg">
                                    {event.name} ({event.session})
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {event.date
                                        ? new Date(event.date).toDateString()
                                        : 'No Date'}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {event.venue?.name} • {event.venue?.address}
                                </span>
                                <a
                                    href={event.venue?.locationURL}
                                    className="text-blue-500 text-xs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {event.venue?.locationURL}
                                </a>
                            </div>

                            {/* Show timeline items */}
                            <div className="mt-2 space-y-3">
                                {event.timeline?.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-2 border rounded bg-gray-100 dark:bg-gray-700"
                                    >
                                        <h5 className="font-semibold text-sm">
                                            {item.title}
                                        </h5>
                                        <p className="text-xs">
                                            {new Date(item.date).toDateString()}
                                        </p>
                                        <div className="mt-1 space-y-1">
                                            {item.blocks?.map((block, i) => (
                                                <div key={i}>
                                                    {block.type === 'text' && (
                                                        <p className="text-sm">
                                                            {block.value}
                                                        </p>
                                                    )}
                                                    {block.type === 'image' && (
                                                        <img
                                                            src={block.value}
                                                            className="h-16"
                                                        />
                                                    )}
                                                    {block.type === 'list' && (
                                                        <ul className="list-disc pl-4 text-sm">
                                                            {block.value.map(
                                                                (li, j) => (
                                                                    <li key={j}>
                                                                        {li}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handleEdit(event)}
                                className="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                            >
                                <MdOutlineEdit className="text-gray-700 dark:text-gray-200" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NationalEventSection;
