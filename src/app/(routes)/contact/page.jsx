'use client';
import Navbar from '@/src/components/layout/NavbarHome';
import Footer from '@/src/components/layout/Footer';
import React from 'react';

const ContactPage = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        query: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col bg-black text-gray-100">
                {/* HEADER SECTION */}
                <section className="flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24 bg-gradient-to-b from-neutral-900 to-black">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Contact Us
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        We’d love to hear from you — whether it’s a question,
                        feedback, or collaboration idea.
                    </p>
                </section>

                {/* CONTACT SECTION */}
                <section className="flex-1 flex items-center justify-center px-6 pb-20">
                    <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-neutral-900/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-neutral-800">
                        {/* LEFT SIDE INFO */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-semibold text-white">
                                Let’s Talk
                            </h2>
                            <p className="text-gray-400">
                                Questions, comments, or suggestions? Fill out
                                the form, and we’ll get back to you shortly.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-white mb-1">
                                        Our Location
                                    </h4>
                                    <p className="text-gray-400">
                                        61-C Rajouri Garden, New Delhi 110027
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-white mb-1">
                                        Phone Number
                                    </h4>
                                    <p className="text-gray-400">
                                        +91-9667576014
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-white mb-1">
                                        Email Address
                                    </h4>
                                    <p className="text-gray-400">
                                        info@xcubit.in <br />
                                        helpdesk@xcubit.in
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE FORM */}
                        <div className="p-6 bg-neutral-950 rounded-xl shadow-md border border-neutral-800">
                            <h3 className="text-xl font-semibold mb-6 text-white">
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
                                        setFormData({
                                            name: '',
                                            email: '',
                                            query: '',
                                        });
                                    } else {
                                        alert('Message Failed to Send');
                                    }
                                }}
                                className="space-y-5"
                            >
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    name="name"
                                    onChange={handleChange}
                                    value={formData.name}
                                    className="w-full p-4 bg-neutral-800 text-gray-100 placeholder-gray-400 rounded-lg border border-neutral-700 focus:border-purple-400 focus:ring-2 focus:ring-main/30 outline-none transition"
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    className="w-full p-4 bg-neutral-800 text-gray-100 placeholder-gray-400 rounded-lg border border-neutral-700 focus:border-purple-400 focus:ring-2 focus:ring-main/30 outline-none transition"
                                    required
                                />
                                <textarea
                                    placeholder="Your Message"
                                    name="query"
                                    onChange={handleChange}
                                    value={formData.query}
                                    className="w-full h-36 p-4 bg-neutral-800 text-gray-100 placeholder-gray-400 rounded-lg border border-neutral-700 focus:border-purple-400 focus:ring-2 focus:ring-main/30 outline-none resize-none transition"
                                    required
                                ></textarea>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-300/50 to-blue-300/50 backdrop-blur-md text-white hover:scale-[99%] transition-all duration-100 font-semibold py-3 rounded-lg"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default ContactPage;
