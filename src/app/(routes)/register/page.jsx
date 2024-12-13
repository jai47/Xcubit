//
//
//  USE SWR for data fetching
//
// components/RegistrationForm.jsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { userEventRegistration } from '@/serverAction/userAction';
import useEvent from '@/hooks/useEvent';
import useSessionData from '@/hooks/useSessionData';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';

function RegistrationForm() {
    const router = useRouter();
    const ref = React.useRef();
    const event = useEvent();
    const session = useSessionData();
    const [teamMembers, setTeamMembers] = useState([]);
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user || !event) return;

        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/getUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: session.user.email }),
                });

                if (!response.ok) throw new Error('Failed to fetch user data');

                const userData = await response.json();
                const matchingEvent = userData.user.events.find(
                    (e) => e.name === event?.name
                );
                if (matchingEvent) {
                    router.push(
                        `/dashboard?section=My+Tickets&ticket=${event.name}`
                    );
                } else {
                    setProfile(userData.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [session, event, router]);

    const addTeamMember = () => {
        setTeamMembers([...teamMembers, '']);
    };

    const updateTeamMember = (index, value) => {
        const updatedTeamMembers = [...teamMembers];
        updatedTeamMembers[index] = value;
        setTeamMembers(updatedTeamMembers);
    };

    const removeTeamMember = (index) => {
        const updatedTeamMembers = [...teamMembers];
        updatedTeamMembers.splice(index, 1);
        setTeamMembers(updatedTeamMembers);
    };

    const registerToDB = async (formData, razorpayResponse) => {
        try {
            await userEventRegistration(
                formData.get('email'),
                {
                    events: {
                        id: event._id.toString(),
                        name: event.name,
                        date: event.start,
                        description: event.description,
                        location: event.location,
                        price: event.price,
                        locationUrl: event.locationUrl,
                        teamMembers,
                        ...(razorpayResponse && {
                            'Order Id': razorpayResponse['Order Id'],
                            'Payment Id': razorpayResponse['Payment Id'],
                        }),
                    },
                },
                { ...Object.fromEntries(formData) }
            );
            const newUrl = `/dashboard?section=My+Tickets&ticket=${event.name}`;
            router.push(newUrl);
            alert('Registration successful!');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Failed to register. Please try again.');
        }
    };

    const handlePayment = async (amount, formData) => {
        try {
            if (!window.Razorpay) {
                console.error('Razorpay script not loaded');
                return;
            }
            //create order
            const response = await fetch('/api/payment', {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: amount * 100, currency: 'INR' }),
            });

            if (!response.ok) {
                console.error('Response not OK:', response);
                throw new Error('Failed to create order');
            }

            const data = await response.json();
            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                name: 'Vief',
                description: 'Test Transaction',
                order_id: data.order.id,
                handler: async function (response) {
                    await registerToDB(formData, {
                        'Payment Id': response.razorpay_payment_id,
                        'Order Id': response.razorpay_order_id,
                    });
                },
                prefill: {
                    name: profile?.name || 'Your Name',
                    email: profile?.email || 'email@example.com',
                    contact: profile?.phone || '9999999999',
                },
                notes: {
                    address: 'Hello World',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (e) {
            console.error('Error creating order:', e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!event) {
            alert('Event details are not loaded yet. Refresh this page.');
            return;
        }

        const formData = new FormData(ref.current);
        event?.price == '0'
            ? await registerToDB(formData)
            : await handlePayment(event.price, formData);
    };

    return (
        event &&
        !loading && (
            <>
                <Navbar user={session?.user} />
                {!profile?.verified ? (
                    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
                        email not verified
                    </div>
                ) : (
                    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
                        <Script
                            src="https://checkout.razorpay.com/v1/checkout.js"
                            strategy="afterInteractive"
                        />
                        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                                Event Registration for {event?.name}
                            </h2>
                            <form
                                ref={ref}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div>Rupees {event?.price}</div>
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={profile?.name}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={profile?.email}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label
                                        htmlFor="dob"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label
                                        htmlFor="gender"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        <option value="">
                                            Select your gender
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Address */}
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Address
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        placeholder="Enter your address"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    ></textarea>
                                </div>

                                {/* City */}
                                <div>
                                    <label
                                        htmlFor="city"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="Enter your city"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {/* State/Province */}
                                <div>
                                    <label
                                        htmlFor="state"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        State/Province
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        placeholder="Enter your state or province"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label
                                        htmlFor="country"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        placeholder="Enter your country"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {/* Postal Code */}
                                <div>
                                    <label
                                        htmlFor="postalCode"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        placeholder="Enter your postal code"
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {/* Team Members */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Team Members (if applicable)
                                    </label>
                                    {teamMembers.map((member, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center mb-2"
                                        >
                                            <input
                                                type="text"
                                                placeholder={`Member ${
                                                    index + 1
                                                }`}
                                                value={member}
                                                onChange={(e) =>
                                                    updateTeamMember(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 mr-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTeamMember(index)
                                                }
                                                className="text-red-500 hover:text-red-700 transition duration-300 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addTeamMember}
                                        className="text-blue-500 underline text-sm"
                                    >
                                        + Add Team Member
                                    </button>
                                </div>

                                {/* LinkedIn/GitHub */}
                                <div>
                                    <label
                                        htmlFor="profile"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        LinkedIn/GitHub Profile (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        id="profile"
                                        name="profile"
                                        placeholder="Enter profile link"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>

                                {/* Terms and Conditions */}
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="terms"
                                            required
                                            className="mr-2"
                                        />
                                        I agree to the terms and conditions.
                                    </label>
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                                    >
                                        Submit & Proceed
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        )
    );
}

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <RegistrationForm />
        </Suspense>
    );
}
