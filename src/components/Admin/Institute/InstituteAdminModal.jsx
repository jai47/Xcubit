'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { MdClose, MdDelete, MdEdit, MdSave } from 'react-icons/md';

const InstituteAdminModal = ({ data, onClose, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...data });
    const [isPdfLoading, setIsPdfLoading] = useState(true);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditToggle = () => {
        if (isEditing) {
            // save updates
            onUpdate && onUpdate(formData);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-neutral-950 rounded-3xl w-4/5 h-4/5 shadow-2xl border border-neutral-800 overflow-hidden relative p-6 flex flex-col gap-6">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                    <h2 className="text-2xl font-bold text-white">
                        {formData.name || 'Institute Details'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <MdClose size={28} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-1 gap-6 overflow-hidden">
                    {/* Left side: Details form */}
                    <div className="w-1/2 flex flex-col gap-4 overflow-y-auto pr-3">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="College Name"
                        />
                        <input
                            name="adminUserEmail"
                            value={formData.adminUserEmail}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="Admin Email"
                        />
                        <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="City"
                        />
                        <input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="State"
                        />
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="Phone"
                        />
                        <input
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="Website"
                        />
                    </div>

                    {/* Right side: PDF Viewer */}
                    <div className="w-1/2 flex flex-col relative">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Contract Document
                        </h3>
                        {data?.contract ? (
                            <div className="relative flex-1 w-full border border-neutral-700 rounded-lg overflow-hidden">
                                {isPdfLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                                <iframe
                                    src={data.contract}
                                    className="flex-1 w-full h-full"
                                    onLoad={() => setIsPdfLoading(false)}
                                />
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-400 border border-dashed border-neutral-700 rounded-lg">
                                No contract uploaded
                            </div>
                        )}
                        <Link
                            href={data?.contract || '#'}
                            target="_blank"
                            className="text-xs text-blue-500 mt-2"
                        >
                            View in other tab
                        </Link>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center border-t border-neutral-800 pt-3">
                    <button
                        onClick={() => onDelete && onDelete(data._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
                    >
                        <MdDelete /> Delete
                    </button>

                    <button
                        onClick={handleEditToggle}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
                    >
                        {isEditing ? <MdSave /> : <MdEdit />}
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstituteAdminModal;
