'use client';

import { updateCollege } from '@/src/serverAction/collegeAction';
import React, { useState, useRef, useTransition } from 'react';
import { HiOutlineCamera } from 'react-icons/hi';
import { toast } from 'react-toastify';

const CollegeInfo = ({ college }) => {
    const [isPending, startTransition] = useTransition();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: college.name || '',
        logo: college.logo || '',
        address: college.address || '',
        city: college.city || '',
        state: college.state || '',
        phone: college.phone || '',
        website: college.website || '',
        adminUserEmail: college.adminUserEmail || '',
    });

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData({
            name: college.name || '',
            logo: college.logo || '',
            address: college.address || '',
            city: college.city || '',
            state: college.state || '',
            phone: college.phone || '',
            website: college.website || '',
            adminUserEmail: college.adminUserEmail || '',
        });
        setIsEditing(false);
        setError('');
        setSuccess('');
    };

    const handleSave = async () => {
        setError('');
        setSuccess('');

        try {
            startTransition(async () => {
                const res = await updateCollege(
                    college.adminUserEmail,
                    formData
                );
                if (res.success) {
                    setSuccess('College information updated successfully!');
                    setIsEditing(false);
                    toast.success('saved changes!');
                } else {
                    toast.error(res.message || 'Failed to save data');
                }
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setError('');
        try {
            // Delete old image if exists
            if (formData.logo) {
                const urlParts = formData.logo.split('/');
                const filename = urlParts[urlParts.length - 1];
                console.log(filename);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/delete/${filename}`,
                    {
                        method: 'DELETE',
                    }
                );
                if (!res.ok) {
                    throw new Error('Failed to delete old image');
                }
                console.log('Old image deleted');
            }

            // Upload new image
            const formDataObj = new FormData();
            formDataObj.append('file', file);

            const uploadRes = await fetch(
                `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/upload`,
                {
                    method: 'POST',
                    body: formDataObj,
                }
            );

            if (!uploadRes.ok) {
                throw new Error('Failed to upload new image');
            }

            const uploadData = await uploadRes.json();

            setFormData((prev) => ({
                ...prev,
                logo: uploadData.url,
            }));

            setSuccess('Logo updated successfully!');
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="max-w-3xl mx-auto border border-gray-700 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg mt-8">
            <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    College Information
                </h2>
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Edit
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={isPending}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-6 mb-6 relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 relative cursor-pointer">
                    <img
                        src={formData.logo || '/default-logo.png'}
                        alt={`${formData.name} logo`}
                        className={`w-full h-full object-cover ${
                            uploading ? 'opacity-50' : 'opacity-100'
                        }`}
                        onClick={isEditing ? triggerFileInput : undefined}
                    />
                    {isEditing && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                            <HiOutlineCamera
                                size={24}
                                className="text-white hover:text-blue-400 cursor-pointer"
                                onClick={triggerFileInput}
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {formData.name}
                    </h3>
                    {college.verified && (
                        <span className="text-sm bg-green-500 text-white px-3 py-1 rounded-full mt-1 inline-block">
                            Verified
                        </span>
                    )}
                </div>
            </div>

            <form className="space-y-4">
                <InputField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
                <InputField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputField
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <InputField
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                    <InputField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </div>
                <InputField
                    label="Email (cannot be changed)"
                    name="adminUserEmail"
                    value={formData.adminUserEmail}
                    onChange={() => {}}
                    disabled={true}
                />
                <InputField
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    {error && (
                        <p className="text-red-600 dark:text-red-400 mb-2">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="text-green-600 dark:text-green-400 mb-2">
                            {success}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

const InputField = ({ label, name, value, onChange, disabled }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
        </label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                disabled
                    ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                    : ''
            }`}
        />
    </div>
);

export default CollegeInfo;
