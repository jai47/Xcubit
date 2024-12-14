'use client';
import ImageKit from 'imagekit';
import { IKUpload, ImageKitProvider } from 'imagekitio-next';
import Image from 'next/image';
import { useState, useRef } from 'react';

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

var imagekit = new ImageKit({
    publicKey: publicKey,
    privateKey: privateKey,
    urlEndpoint: urlEndpoint,
});

const authenticator = async () => {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}api/imageAuth`);
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/imageAuth`
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Request failed with status ${response.status}: ${errorText}`
            );
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const ImageUpload = ({ getImageData }) => {
    const Upload = useRef(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageData, setImageData] = useState(null);

    // Progress handler
    const onProgress = (progress) => {
        setUploadProgress(Math.floor((progress.loaded / progress.total) * 100));
    };

    // Success handler
    const onSuccess = (response) => {
        setUploadProgress(0);
        const { url, thumbnailUrl, fileId } = response;
        const newImageData = { url, thumbnailUrl, fileId };
        setImageData(newImageData); // Update state
        getImageData(newImageData); // Pass the data directly
    };

    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            {uploadProgress === 0 && !imageData ? (
                <>
                    <IKUpload
                        useUniqueFileName
                        onSuccess={onSuccess}
                        onUploadProgress={onProgress}
                        style={{ display: 'none' }}
                        ref={Upload}
                        accept="image/*"
                    />
                    <div
                        className="h-48 w-72 flex flex-col items-center justify-center gap-5 cursor-pointer border-2 border-dashed border-gray-300 bg-white p-6 rounded-lg shadow-md hover:bg-gray-50"
                        onClick={(e) => {
                            e.preventDefault();
                            Upload.current.click();
                        }}
                    >
                        <div className="icon flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-20 w-20 fill-gray-500"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                />
                            </svg>
                        </div>
                        <div className="text flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                                Click to upload image
                            </span>
                        </div>
                    </div>
                </>
            ) : uploadProgress > 0 ? (
                <div>
                    <p>Uploading... {uploadProgress}%</p>
                    <progress value={uploadProgress} max="100"></progress>
                </div>
            ) : (
                imageData && (
                    <div>
                        <p>Upload Complete!</p>
                        <Image
                            src={imageData.thumbnailUrl}
                            width={200}
                            height={200}
                            alt="Uploaded Thumbnail"
                        />
                        <p>
                            <a
                                href={imageData.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Full Image
                            </a>
                        </p>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                imagekit.deleteFile(
                                    imageData.fileId,
                                    function (error, result) {
                                        if (error) console.log(error);

                                        result?.$ResponseMetadata.statusCode ===
                                        204
                                            ? setImageData(null)
                                            : alert('Error deleting image');
                                    }
                                );
                            }}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                )
            )}
        </ImageKitProvider>
    );
};

export default ImageUpload;
