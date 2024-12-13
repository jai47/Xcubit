'use client';
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

const QRCodeGenerator = ({ data }) => {
    const [qrCodeImage, setQrCodeImage] = useState(null);

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const qrData = JSON.stringify(data); // Convert the data to a JSON string
                const qrImage = await QRCode.toDataURL(qrData); // Generate QR code as a Data URL
                setQrCodeImage(qrImage); // Set the Data URL as the QR code image
            } catch (error) {
                console.error('Error generating QR Code:', error);
            }
        };

        generateQRCode();
    }, [data]);

    return (
        <div className="flex justify-center my-4">
            {qrCodeImage ? (
                <Image
                    src={qrCodeImage}
                    alt="QR Code"
                    width={144}
                    height={144}
                    className="rounded"
                />
            ) : (
                <p>Generating QR Code...</p>
            )}
        </div>
    );
};

export default QRCodeGenerator;
