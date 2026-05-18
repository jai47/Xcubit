'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { updateTeamEntry } from '@/src/serverAction/teamAction';

export default function ScannerPage() {
    const [scanResult, setScanResult] = useState(null);
    const [status, setStatus] = useState('');
    const [teamData, setTeamData] = useState(null);
    const [isScanning, setIsScanning] = useState(true);
    const scannerRef = useRef(null);

    // Initialize scanner once
    useEffect(() => {
        if (!scannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                'reader',
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false
            );
            scannerRef.current = scanner;
        }

        if (isScanning && scannerRef.current) {
            scannerRef.current.render(handleScanSuccess, handleScanError);
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(() => {});
            }
        };
    }, [isScanning]);

    // Handle QR scan
    const handleScanSuccess = async (decodedText) => {
        if (!decodedText || !isScanning) return; // prevent multiple scans

        setIsScanning(false); // pause scanning
        setStatus('Processing...');

        let parsedData;
        try {
            parsedData = JSON.parse(decodedText); // QR string → JSON
        } catch (err) {
            setStatus('⚠️ Invalid QR Code format');
            return;
        }
        setScanResult(parsedData);

        try {
            // Call server action
            const res = await updateTeamEntry({
                teamId: parsedData.teamCode,
                nationals: parsedData.nationals || false,
                nationalId: parsedData.nationalId || null,
            });

            if (res.success) {
                setTeamData(
                    res.data ? JSON.parse(JSON.stringify(res.data)) : parsedData
                );
                setStatus('✅ Entry marked successfully');
            } else {
                setTeamData(parsedData); // fallback display
                setStatus(`⚠️ ${res.message}`);
            }
        } catch (err) {
            console.error(err);
            setStatus('⚠️ Failed to update entry');
            setTeamData(parsedData);
        }

        // Clear camera feed
        if (scannerRef.current) {
            scannerRef.current.clear().catch(() => {});
        }
    };

    // Handle QR scan errors
    const handleScanError = (err) => {
        if (
            err?.includes('NotFoundException') ||
            err?.includes('no QR code found')
        )
            return;
        console.warn('QR scan error:', err);
    };

    // Resume scanning
    const handleResume = () => {
        setScanResult(null);
        setTeamData(null);
        setStatus('');
        setIsScanning(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
            <h1 className="text-2xl font-bold mb-6">Team Entry Scanner</h1>

            {isScanning ? (
                <div className="w-full max-w-md text-center">
                    <div
                        id="reader"
                        className="mx-auto border-4 border-dashed border-gray-600 rounded-lg"
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            aspectRatio: '1/1',
                        }}
                    ></div>
                    <p className="mt-3 text-gray-400 text-sm">
                        Point your camera at the QR code
                    </p>
                </div>
            ) : (
                <div className="w-full max-w-md text-center">
                    <p className="text-lg font-semibold mb-4">{status}</p>

                    {teamData && (
                        <div className="bg-neutral-900 p-4 rounded-lg border border-white/10 text-left">
                            <h2 className="text-xl font-bold mb-2">
                                {teamData.name}
                            </h2>
                            <p className="text-sm text-gray-400 mb-2">
                                <strong>Event:</strong>{' '}
                                {teamData.event?.name ||
                                    teamData.event ||
                                    parsedData?.event}
                            </p>
                            <h3 className="font-semibold text-gray-300 mb-1">
                                Members:
                            </h3>
                            <ul className="space-y-1 text-sm text-gray-300">
                                {teamData.members?.length
                                    ? teamData.members.map((m, idx) => (
                                          <li key={idx}>
                                              • {m.name} ({m.email})
                                          </li>
                                      ))
                                    : teamData.email && (
                                          <li>
                                              • {teamData.name} (
                                              {teamData.email})
                                          </li>
                                      )}
                            </ul>
                        </div>
                    )}

                    <button
                        onClick={handleResume}
                        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                    >
                        Resume Scanning
                    </button>
                </div>
            )}
        </div>
    );
}
