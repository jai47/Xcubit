'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiSend as Send, FiX as X } from 'react-icons/fi';
import { AiOutlineInfoCircle as Info } from 'react-icons/ai';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { BsMailbox } from 'react-icons/bs';
import { MdDriveFileRenameOutline } from 'react-icons/md';

const FloatingAiAssistant = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        query: '',
    });
    const maxChars = 250;
    const chatRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'query' && value.length > maxChars) return;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.query.trim()) return;

        let res = await fetch('/api/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        res = await res.json();
        if (res.success) {
            alert('Message Sent Successfully');
        } else {
            alert('Message Failed to Send');
        }
        setFormData({ email: '', query: '', name: '' });
        setIsChatOpen(false);
    };

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (
                chatRef.current &&
                !chatRef.current.contains(e.target) &&
                !e.target.closest('.floating-ai-button')
            ) {
                setIsChatOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating AI Button */}
            <button
                className={`floating-ai-button relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isChatOpen ? 'rotate-90' : ''
                }`}
                onClick={() => setIsChatOpen(!isChatOpen)}
                style={{
                    background:
                        'linear-gradient(135deg, rgba(99,102,241,0.8), rgba(168,85,247,0.8))',
                    boxShadow:
                        '0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(109, 40, 217, 0.3)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                {/* Glow layers */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30" />
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <div className="relative z-10">
                    {isChatOpen ? (
                        <X className="text-white/90" />
                    ) : (
                        <IoChatbubbleEllipses className="w-8 h-8 text-white" />
                    )}
                </div>
                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500" />
            </button>

            {/* Chat Box */}
            {isChatOpen && (
                <div
                    ref={chatRef}
                    className="absolute bottom-20 right-0 max-w-[500px] w-[90vw] flex flex-col rounded-3xl bg-gradient-to-br from-zinc-800/75 to-zinc-900/90 border border-zinc-500/50 shadow-2xl backdrop-blur-lg animate-[popIn_0.3s_ease-out]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pt-4 pb-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-medium text-zinc-400">
                                Contact Support
                            </span>
                        </div>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
                        >
                            <X className="w-4 h-4 text-zinc-400" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        {/* Email Input */}
                        <div className="flex items-center gap-2 px-6 py-3 border-b border-zinc-700/40">
                            <MdDriveFileRenameOutline className="w-4 h-4 text-zinc-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="w-full bg-transparent outline-none text-sm text-zinc-200 placeholder-zinc-500"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex items-center gap-2 px-6 py-3 border-b border-zinc-700/40">
                            <BsMailbox className="w-4 h-4 text-zinc-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your email address"
                                className="w-full bg-transparent outline-none text-sm text-zinc-200 placeholder-zinc-500"
                                required
                            />
                        </div>
                        {/* query */}
                        <div className="relative">
                            <textarea
                                name="query"
                                rows={4}
                                value={formData.query}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-transparent outline-none resize-none text-base min-h-[120px] text-zinc-100 placeholder-zinc-500"
                                placeholder="Write your query or message here..."
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-800/5 to-transparent pointer-events-none" />
                        </div>

                        {/* Controls */}
                        <div className="px-4 pb-4">
                            <div className="flex items-center justify-end gap-3">
                                <div className="text-xs font-medium text-zinc-500">
                                    {formData.query.length}/{maxChars}
                                </div>
                                <button
                                    type="submit"
                                    disabled={
                                        !formData.query.trim() ||
                                        !formData.email ||
                                        !formData.name
                                    }
                                    className="group relative p-3 bg-gradient-to-r from-red-600 to-red-500 rounded-xl text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-red-500/30 active:scale-95 disabled:opacity-50"
                                >
                                    <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12 group-hover:scale-110 transition-all" />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-50 blur-lg transition-opacity" />
                                </button>
                            </div>

                            {/* Footer Info */}
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/50 text-xs text-zinc-500 gap-6">
                                <div className="flex items-center gap-2">
                                    <Info className="w-3 h-3" />
                                    <span>
                                        We usually reply within 24 hours.
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    <span>Support team online</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Animations */}
            <style jsx>{`
                @keyframes popIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.8) translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                .floating-ai-button:hover {
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 0 30px rgba(139, 92, 246, 0.9),
                        0 0 50px rgba(124, 58, 237, 0.7),
                        0 0 70px rgba(109, 40, 217, 0.5);
                }
            `}</style>
        </div>
    );
};

export { FloatingAiAssistant };
