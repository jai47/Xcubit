'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { userEventRegistration } from '@/src/serverAction/userAction';
import useEvent from '@/src/hooks/useEvent';
import Script from 'next/script';
import { redirect, useRouter } from 'next/navigation';
import Loading from '@/src/app/loading';
import QRCode from 'qrcode';
import { useSession } from 'next-auth/react';
import Navbar from '@/src/components/layout/NavbarHome';
import Button from '@/src/components/Button';
import Image from '@/src/components/Image';

function RegistrationForm() {
    const router = useRouter();
    const event = useEvent();
    const { data: session } = useSession();
    const [error, setError] = useState({});
    const [profile, setProfile] = useState('');
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        stateOrProvince: '',
        country: '',
        postalCode: '',
        teamMembers: [],
        linkedInOrGithub: '',
    });

    useEffect(() => {
        if (!session) {
            router.push('/login');
        }
    }, [session, router]);

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
                    setFormData({
                        ...formData,
                        name: userData.user.name,
                        email: userData.user.email,
                        phoneNumber: userData.user.phoneNumber,
                        dateOfBirth: new Date(
                            userData.user.dateOfBirth
                        ).toLocaleDateString('en-CA'),
                        gender: userData.user.gender,
                        address: userData.user.address,
                        city: userData.user.city,
                        stateOrProvince: userData.user.stateOrProvince,
                        country: userData.user.country,
                        linkedInOrGithub: userData.user.linkedInOrGithub,
                        postalCode: userData.user.postalCode,
                    });

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

    if (!session) return null;

    const validateFields = (name, value) => {
        let newError = '';

        switch (name) {
            case 'phoneNumber':
                if (!value.match(/^[0-9]{10}$/))
                    newError = 'Phone number must be 10 digits';
                break;
            case 'dateOfBirth':
                if (new Date(value) > new Date())
                    newError = 'Invalid date of birth';
                break;
            case 'address':
                if (value.length < 10)
                    newError = 'Address must be at least 10 characters';
                break;
            case 'city':
                if (value.length < 3)
                    newError = 'City must be at least 3 characters';
                break;
            case 'stateOrProvince':
                if (value.length < 3)
                    newError = 'State/Province must be at least 3 characters';
                break;
            case 'country':
                if (value.length < 3)
                    newError = 'Country must be at least 3 characters';
                break;
            case 'postalCode':
                if (!value.match(/^[0-9]{6}$/))
                    newError = 'Postal code must be 6 digits';
                break;
            case 'linkedInOrGithub':
                if (
                    !value.match(
                        /^(https?:\/\/)?(www\.)?(linkedin\.com|github\.com)/
                    )
                ) {
                    newError = 'Invalid LinkedIn/GitHub profile';
                }
                break;
        }

        setError((prevError) => ({ ...prevError, [name]: newError }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        validateFields(e.target.name, e.target.value);
    };

    const addTeamMember = () => {
        setFormData((prevData) => ({
            ...prevData,
            teamMembers: [...prevData.teamMembers, { name: '', email: '' }],
        }));
    };

    const updateTeamMember = (index, field, value) => {
        setFormData((prevData) => {
            const updatedTeamMembers = [...prevData.teamMembers];
            updatedTeamMembers[index] = {
                ...updatedTeamMembers[index],
                [field]: value,
            };
            return { ...prevData, teamMembers: updatedTeamMembers };
        });
    };

    const removeTeamMember = (index) => {
        setFormData((prevData) => {
            const updatedTeamMembers = [...prevData.teamMembers];
            updatedTeamMembers.splice(index, 1);
            return { ...prevData, teamMembers: updatedTeamMembers };
        });
    };

    const registerToDB = async (formData, razorpayResponse) => {
        try {
            const res = await userEventRegistration(
                formData.email,
                {
                    events: {
                        id: event?._id.toString(),
                        name: event.name,
                        date: event.start,
                        location: event.location,
                        price: event.price,
                        locationUrl: event.locationUrl,
                        teamMembers: formData.teamMembers,
                        ...(razorpayResponse && {
                            'Order Id': razorpayResponse['Order Id'],
                            'Payment Id': razorpayResponse['Payment Id'],
                        }),
                    },
                },
                formData
            );
            const qrDataURL = await QRCode.toDataURL(
                JSON.stringify({
                    name: formData.name,
                    teamMembers: formData.teamMembers,
                    event: event.name,
                    email: formData.email,
                })
            );
            const response = await fetch(`/api/mail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    subject: `Ticket for ${event.name}`,
                    message: {
                        name: formData.name,
                        event: event?.name,
                        date: event?.start,

                        location: event?.locationURL,
                        contactEmail: formData.email,
                        image: qrDataURL,
                        ...(razorpayResponse && {
                            orderId: razorpayResponse['Order Id'],
                            ticketId: razorpayResponse['Payment Id'],
                        }),
                    },
                    type: 'ticket',
                }),
            });

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
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
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
                    name: formData.name || 'Your Name',
                    email: formData.email || 'email@example.com',
                    contact: formData.phone || '9999999999',
                },
                notes: {
                    address:
                        'Vastav Incubatex & Entrepreneurship Foundation (VIEF)',
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

    const validateForm = () => {
        let valid = true;
        const newError = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newError[key] = 'This field is required';
                valid = false;
            }
        });

        setError(newError);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!event) {
            alert('Event details are not loaded yet. Refresh this page.');
            return;
        }

        if (!validateForm()) return;

        event?.price == '0'
            ? await registerToDB(formData)
            : await handlePayment(event.price, formData);
    };

    return (
        event &&
        !loading && (
            <>
                <Navbar />
                {!profile?.verified ? (
                    <div className="min-h-screen flex items-center justify-center py-10 px-4">
                        email not verified
                    </div>
                ) : (
                    <div className="min-h-screen flex items-center justify-center py-10 mt-10 px-4 dark:bg-background">
                        <Script
                            src="https://checkout.razorpay.com/v1/checkout.js"
                            strategy="afterInteractive"
                        />
                        <div className="w-full max-w-lg shadow-lg rounded-lg p-6 dark:bg-background dark:text-primary dark:shadow-slate-600 mt-10">
                            <h2 className="text-2xl font-bold text-center mb-6">
                                Event Registration for {event?.name}
                            </h2>
                            <Image src={event?.image} alt="Event" />
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block font-medium mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={profile?.name || ''}
                                        readOnly
                                        className="w-full text-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-background dark:text-muted"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block font-medium mb-2"
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
                                        className="w-full text-gray-400 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-background dark:text-muted"
                                    />
                                </div>

                                <InputFeilds
                                    lable="Phone Number"
                                    type="tel"
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    placeholder="Enter your phone number"
                                    change={handleChange}
                                    error={error.phoneNumber}
                                />

                                <InputFeilds
                                    lable="Date of Birth"
                                    type="date"
                                    id="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    placeholder=""
                                    change={handleChange}
                                    error={error.dateOfBirth}
                                />

                                {/* Gender */}
                                <div>
                                    <label
                                        htmlFor="gender"
                                        className="block font-medium mb-2"
                                    >
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-background dark:text-primary"
                                    >
                                        <option value="">
                                            Select your gender
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Non-Binary">
                                            Non-Binary
                                        </option>
                                        <option value="Genderqueer">
                                            Genderqueer
                                        </option>
                                        <option value="Genderfluid">
                                            Genderfluid
                                        </option>
                                        <option value="Agender">Agender</option>
                                        <option value="Bigender">
                                            Bigender
                                        </option>
                                        <option value="Two-Spirit">
                                            Two-Spirit
                                        </option>
                                        <option value="Transgender">
                                            Transgender
                                        </option>
                                        <option value="Demiboy">Demiboy</option>
                                        <option value="Demigirl">
                                            Demigirl
                                        </option>
                                        <option value="Intersex">
                                            Intersex
                                        </option>
                                        <option value="Pangender">
                                            Pangender
                                        </option>
                                        <option value="Androgynous">
                                            Androgynous
                                        </option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer Not to Say">
                                            Prefer Not to Say
                                        </option>
                                    </select>
                                </div>
                                {/* Address */}
                                <InputFeilds
                                    lable="Address"
                                    type="text"
                                    id="address"
                                    value={formData.address}
                                    placeholder="Enter your address"
                                    change={handleChange}
                                    error={error.address}
                                />

                                {/* City */}
                                <InputFeilds
                                    lable="City"
                                    type="text"
                                    id="city"
                                    value={formData.city}
                                    placeholder="Enter your city"
                                    change={handleChange}
                                    error={error.city}
                                />
                                {/* State/Province */}
                                <InputFeilds
                                    lable="State/Province"
                                    type="text"
                                    id="stateOrProvince"
                                    value={formData.stateOrProvince}
                                    placeholder="Enter your state or province"
                                    change={handleChange}
                                    error={error.stateOrProvince}
                                />
                                {/* Country */}
                                <InputFeilds
                                    lable="Country"
                                    type="text"
                                    id="country"
                                    value={formData.country}
                                    placeholder="Enter your country"
                                    change={handleChange}
                                    error={error.country}
                                />
                                {/* Postal Code */}
                                <InputFeilds
                                    lable="Postal Code"
                                    type="text"
                                    id="postalCode"
                                    value={formData.postalCode}
                                    placeholder="Enter your postal code"
                                    change={handleChange}
                                    error={error.postalCode}
                                />
                                {/* Team Members */}
                                <div>
                                    <label className="block font-medium mb-2">
                                        Team Members (if applicable)
                                    </label>
                                    {formData.teamMembers.map(
                                        (member, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center mb-2"
                                            >
                                                <input
                                                    type="text"
                                                    placeholder={`Member ${
                                                        index + 1
                                                    } Name`}
                                                    value={member.name}
                                                    required
                                                    onChange={(e) =>
                                                        updateTeamMember(
                                                            index,
                                                            'name',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 mr-2 dark:bg-background dark:text-primary"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder={`Member ${
                                                        index + 1
                                                    } Email`}
                                                    required
                                                    value={member.email}
                                                    onChange={(e) =>
                                                        updateTeamMember(
                                                            index,
                                                            'email',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 mr-2 dark:bg-background dark:text-primary"
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
                                        )
                                    )}
                                    <button
                                        type="button"
                                        onClick={addTeamMember}
                                        className="text-blue-500 underline text-sm"
                                    >
                                        + Add Team Member
                                    </button>
                                </div>
                                {/* LinkedIn/GitHub */}
                                <InputFeilds
                                    lable="LinkedIn/GitHub Profile (Optional)"
                                    type="url"
                                    id="linkedInOrGithub"
                                    value={formData.linkedInOrGithub}
                                    placeholder="Enter profile link"
                                    change={handleChange}
                                    error={error.linkedInOrGithub}
                                />
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
                                <div className="w-full flex justify-center">
                                    <Button
                                        className="w-full"
                                        type="submit"
                                        text={
                                            event?.price === 0
                                                ? 'Proceed'
                                                : `Pay ₹${event?.price} and Proceed`
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        )
    );
}

const InputFeilds = ({
    lable,
    type,
    id,
    value,
    placeholder,
    change,
    error,
}) => {
    return (
        <div>
            <label htmlFor={id} className="block font-medium mb-2">
                {lable}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={change}
                placeholder={placeholder}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-background dark:text-primary"
            />
            <p className="text-red-500">{error}</p>
        </div>
    );
};

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <RegistrationForm />
        </Suspense>
    );
}
