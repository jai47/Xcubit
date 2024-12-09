import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import React from 'react';

const ContactPage = () => {
    return (
        <div className="w-screen h-screen bg-gray-100">
            <Navbar />
            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-64 flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://vief.vercel.app/static/media/ContactUs.0ec25e8d8f0b13d2b489.jpeg')`, // Replace with the actual path of the image
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <h1 className="relative text-white text-4xl font-bold">
                    Contact Us
                </h1>
            </div>

            {/* Contact Section */}
            <div className="w-screen flex items-center justify-center">
                <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg">
                    {/* Left Section */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Let's talk with us
                        </h2>
                        <p className="text-gray-600">
                            Questions, comments, or suggestions? Simply fill in
                            the form and we'll be in touch shortly.
                        </p>
                        <div className="space-y-4">
                            {/* Location */}
                            <div className="flex items-center space-x-4">
                                <div className="text-purple-500 text-2xl">
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
                            <div className="flex items-center space-x-4">
                                <div className="text-purple-500 text-2xl">
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
                            <div className="flex items-center space-x-4">
                                <div className="text-purple-500 text-2xl">
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

                    {/* Right Section */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg space-y-6">
                        <form className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-gray-600 font-medium">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-gray-600 font-medium">
                                    Type
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            className="form-radio text-blue-500"
                                            defaultChecked
                                        />
                                        <span className="ml-2">Individual</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            className="form-radio text-blue-500"
                                        />
                                        <span className="ml-2">Company</span>
                                    </label>
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-gray-600 font-medium">
                                    Subject
                                </label>
                                <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
                                    <option>Select a subject</option>
                                    <option>General Inquiry</option>
                                    <option>Support</option>
                                    <option>Feedback</option>
                                </select>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-600 font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="example@domain.com"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-gray-600 font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    placeholder="+5677-55-555"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-gray-600 font-medium">
                                    Your Message
                                </label>
                                <textarea
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                    rows="4"
                                    placeholder="Type your message here..."
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
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
