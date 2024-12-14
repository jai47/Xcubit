import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/Navbar';
import React from 'react';

const ContactPage = () => {
    return (
        <div className="w-screen h-screen bg-gray-100 flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)] lg:h-[calc(100vh-8rem)] flex items-center justify-center"
                // style={{
                //   backgroundImage: `url('https://vief.vercel.app/static/media/ContactUs.0ec25e8d8f0b13d2b489.jpeg')`, // Replace with the actual path of the image
                // }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <h1 className="relative text-white text-3xl mt-6 sm:text-4xl lg:text-5xl font-bold text-center">
                    Contact Us
                </h1>
            </div>

            {/* Contact Section */}
            <div className="flex  bg-black bg-opacity-30 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg">
                    {/* Left Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                            Let&apos;s talk with us
                        </h2>
                        <p className="text-gray-600">
                            Questions, comments, or suggestions? Simply fill in
                            the form, and we&apos;ll be in touch shortly.
                        </p>

                        <div className="space-y-6">
                            {/* Location */}
                            <div className="flex items-start space-x-4">
                                <div className="text-purple-500 text-3xl">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">
                                        Our Location
                                    </h4>
                                    <p className="text-gray-600">
                                        61-C Rajouri Garden, New Delhi-110027
                                    </p>
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="flex items-start space-x-4">
                                <div className="text-purple-500 text-3xl">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">
                                        Phone Number
                                    </h4>
                                    <p className="text-gray-600">
                                        +91-9667576014
                                    </p>
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="flex items-start space-x-4">
                                <div className="text-purple-500 text-3xl">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">
                                        Email Address
                                    </h4>
                                    <p className="text-gray-600">
                                        info@vief.in, helpdesk@vief.in
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section (Optional Form or additional content) */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg space-y-6">
                        {/* You can add a contact form or any other relevant information here */}
                        <h3 className="text-xl font-semibold text-gray-800">
                            Send Us a Message
                        </h3>
                        <form>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full p-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full p-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <textarea
                                    placeholder="Your Message"
                                    className="w-full p-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="w-full bg-purple-500 text-white py-3 rounded-md text-lg font-medium hover:bg-purple-600 transition-all"
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
    );
};

export default ContactPage;
