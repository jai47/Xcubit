'use client';

import { updateCollegeAdmin } from '@/src/serverAction/collegeAction';
import Link from 'next/link';
import React, { useEffect, useState, useTransition } from 'react';
import { FaBan, FaCheck } from 'react-icons/fa';
import { MdClose, MdEdit, MdSave } from 'react-icons/md';
import { toast } from 'react-toastify';

const InstituteAdminModal = ({ data, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isPdfLoading, setIsPdfLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setFormData({ ...data });
    }, [data]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleApprove = () => {
        startTransition(async () => {
            const res = await updateCollegeAdmin(formData._id, {
                approval: true,
            });
            if (res.success) {
                setFormData((prev) => ({ ...prev, approval: true }));
                await fetch('/api/mail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: data.adminUserEmail,
                        type: 'college-approved',
                        message: {
                            name: data.name,
                            email: data.adminUserEmail,
                            contactEmail: 'support@xcubit.in',
                            dashboard: 'https://xcubit.in/institute',
                        },
                        subject: `Congratulations Your institute is approved! ||, ${data.name}`,
                    }),
                });
                toast.success('College approved successfully!');
            } else {
                toast.error(res.message || 'Failed to approve college');
            }
        });
    };
    const handleBan = async () => {
        startTransition(async () => {
            const res = await updateCollegeAdmin(formData._id, {
                approval: false,
            });
            if (res.success) {
                setFormData((prev) => ({ ...prev, approval: false }));
                toast.success('College banned successfully!');
            } else {
                toast.error(res.message || 'Failed to approve college');
            }
        });
    };

    const handleSave = async () => {
        try {
            const res = await updateCollegeAdmin(formData._id, formData);
            if (res.success) {
                toast.success('Saved changes!');
                startTransition(() => setFormData(res.data)); // safe re-render
            } else {
                toast.error(res.message || 'Failed to save data');
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleEditToggle = async () => {
        if (isEditing) {
            // save updates
            await handleSave();
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
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
                            value={formData.name || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="College Name"
                        />
                        <input
                            name="adminUserEmail"
                            value={formData.adminUserEmail || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="Admin Email"
                        />
                        <input
                            name="city"
                            value={formData.city || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="City"
                        />
                        <input
                            name="state"
                            value={formData.state || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="State"
                        />
                        <input
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white disabled:opacity-50"
                            placeholder="Phone"
                        />
                        <input
                            name="website"
                            value={formData.website || ''}
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
                            <>
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
                                <div className="w-full flex justify-between">
                                    <Link
                                        href={data?.contract || '#'}
                                        target="_blank"
                                        className="text-xs text-blue-500 mt-2"
                                    >
                                        View in other tab
                                    </Link>
                                    {isEditing && (
                                        <button
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    contract: '',
                                                });
                                            }}
                                            className="text-xs text-red-500 mt-2 cursor-pointer"
                                        >
                                            Delete contract
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-400 border border-dashed border-neutral-700 rounded-lg">
                                No contract uploaded
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center border-t border-neutral-800 pt-3">
                    <button
                        onClick={handleBan}
                        disabled={!formData?.approval || isPending}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md shadow text-white ${
                            !formData.approval
                                ? 'bg-red-600/60 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700'
                        }`}
                    >
                        <FaBan /> Ban
                    </button>

                    <div className="flex gap-5">
                        <button
                            onClick={handleEditToggle}
                            disabled={isPending}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
                        >
                            {isEditing ? <MdSave /> : <MdEdit />}
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                        <button
                            onClick={handleApprove}
                            disabled={formData.approval || isPending}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md shadow text-white ${
                                formData.approval
                                    ? 'bg-green-600/60 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700'
                            }`}
                        >
                            <FaCheck />
                            {isPending
                                ? 'Approving...'
                                : formData.approval
                                ? 'Approved'
                                : 'Approve'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstituteAdminModal;
