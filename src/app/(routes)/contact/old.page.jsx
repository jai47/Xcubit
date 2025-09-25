'use client';
import Navbar from '@/src/components/layout/NavbarHome';
import Footer from '@/src/components/layout/Footer';
import React from 'react';

const ContactPage = () => {
    const [formData, setFormData] = React.useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <Navbar />
            <div className="w-screen h-screen flex flex-col pt-20 dark:bg-background dark:text-primary">
                <div className="relative bg-center h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] lg:h-[calc(100vh-8rem)] flex items-center justify-center">
                    <div className="absolute inset-0 "></div>
                    <h1 className="relative text-3xl mt-6 sm:text-4xl lg:text-5xl font-bold text-center">
                        Contact Us
                    </h1>
                </div>

                <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8  p-8 rounded-lg shadow-lg">
                        <div className="space-y-6">
                            <h2 className="text-2xl sm:text-3xl font-semibold">
                                Let&apos;s talk with us
                            </h2>
                            <p>
                                Questions, comments, or suggestions? Simply fill
                                in the form, and we&apos;ll be in touch shortly.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div>
                                        <h4 className="font-semibold">
                                            Our Location
                                        </h4>
                                        <p>
                                            61-C Rajouri Garden, New
                                            Delhi-110027
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div>
                                        <h4 className="font-semibold">
                                            Phone Number
                                        </h4>
                                        <p>+91-9667576014</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div>
                                        <h4 className="font-semibold">
                                            Email Address
                                        </h4>
                                        <p>info@vief.in, helpdesk@vief.in</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-lg shadow-lg space-y-6 dark:bg-muted">
                            <h3 className="text-xl font-semibold">
                                Send Us a Message
                            </h3>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
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
                                        setFormData({});
                                    } else {
                                        alert('Message Failed to Send');
                                    }
                                }}
                            >
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        name="name"
                                        onChange={handleChange}
                                        value={formData.name}
                                        className="w-full p-4 bg-white border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        name="email"
                                        onChange={handleChange}
                                        value={formData.email}
                                        className="w-full p-4 bg-white border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                    <textarea
                                        placeholder="Your Message"
                                        name="query"
                                        onChange={handleChange}
                                        value={formData.message}
                                        className="w-full p-4 bg-white border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="w-full bg-main text-white py-3 rounded-md text-lg font-medium hover:bg-main transition-all"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default ContactPage;
