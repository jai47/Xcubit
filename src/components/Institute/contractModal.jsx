'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

const ContractModal = ({ email, updateCollegeContract, onClose }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a valid PDF file.');
            return;
        }

        try {
            setIsUploading(true);

            // 1. Upload to file server
            const formData = new FormData();
            formData.append('file', file);

            let res = await fetch(
                `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!res.ok) throw new Error('Upload failed');
            res = await res.json();

            const fileUrl = res.url;
            console.log('Uploaded PDF URL:', fileUrl);

            // 2. Update college document in DB
            const { success, data, message } = await updateCollegeContract(
                email,
                fileUrl
            );
            if (!success) {
                throw new Error(message || 'Failed to update college');
            }

            if (success) {
                alert(message);
                // ✅ Close modal after success
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            alert('Error uploading contract.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1]">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Agreement Required
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    Please upload your agreement before continuing.
                </p>

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="block w-full text-sm text-gray-700 dark:text-gray-300 
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-md file:border-0
                               file:text-sm file:font-semibold
                               file:bg-indigo-600 file:text-white
                               hover:file:bg-indigo-700
                               cursor-pointer"
                />

                {isUploading && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                        Uploading...
                    </p>
                )}
                <div className="w-full flex item-end justify-end">
                    <Link
                        href="tel:+918791156079" // replace with your number
                        className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                               bg-green-600 text-white text-sm font-medium shadow-md 
                               hover:bg-green-700 transition-colors"
                    >
                        <FaPhoneAlt size={14} />
                        Call Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContractModal;
