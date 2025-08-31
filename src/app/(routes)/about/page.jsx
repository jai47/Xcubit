import React from 'react';
import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/NavbarHome';
import Head from 'next/head';
import Link from 'next/link';

const AboutUs = () => {
    return (
        <>
            <Head>
                <title>
                    About Us | Xcubit - Revolutionizing Ticketing and Event
                    Management
                </title>
                <meta
                    name="description"
                    content="Learn about Xcubit, a cutting-edge platform designed to simplify ticketing and event management. Discover our features, benefits, and how we empower events globally."
                />
                <meta
                    name="keywords"
                    content="Xcubit, event management, ticketing, event registration, ticketing platform, secure payments, real-time analytics, VIEF"
                />
                <meta name="author" content="Xcubit" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta property="og:title" content="About Us | Xcubit" />
                <meta
                    property="og:description"
                    content="Xcubit simplifies ticketing and event management with secure solutions and real-time analytics. Learn how we help organizers and attendees worldwide."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://xcubit.in/about" />
                <meta
                    property="og:image"
                    content="https://xcubit.in/images/logo/logo.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us | Xcubit" />
                <meta
                    name="twitter:description"
                    content="Xcubit offers seamless ticketing and event management solutions to empower events globally. Explore how we can help you."
                />
                <meta
                    name="twitter:image"
                    content="https://xcubit.in/logo/logo.png"
                />
                <link rel="canonical" href="https://xcubit.in/about" />
            </Head>
            <Navbar />
            <div className="min-h-screen text-background flex flex-col justify-start items-center pt-16 pb-12 w-full overflow-x-hidden dark:bg-background dark:text-primary">
                {/* Title Section */}
                <div className="text-left mb-12 px-6 lg:px-12 w-full max-w-6xl">
                    <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                        About Us
                    </h1>
                    <div className="h-[4px] w-24 bg-background dark:bg-main"></div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col items-start px-6 lg:px-12 max-w-6xl space-y-6 text-left">
                    {/* Xcubit Intro */}
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide mb-4">
                        Xcubit: Revolutionizing Ticketing and Event Management
                    </h2>
                    <p className="text-lg sm:text-xl leading-relaxed">
                        Xcubit is a cutting-edge platform designed to simplify
                        ticketing and event management. Whether you are
                        organizing a conference, seminar, concert, or any other
                        event, Xcubit offers seamless solutions to handle
                        registrations, ticketing, and guest management
                        efficiently.
                    </p>
                    <p className="text-lg sm:text-xl leading-relaxed">
                        Our platform provides intuitive tools for event
                        organizers to create customized ticket options, track
                        sales, and optimize event logistics.
                    </p>

                    {/* Why Choose Xcubit */}
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide mb-4">
                        Why Choose Xcubit?
                    </h2>
                    <ul className="list-disc ml-6 space-y-2 text-lg sm:text-xl leading-relaxed">
                        <li>
                            <strong>User-Friendly Interface:</strong> Designed
                            with simplicity in mind, Xcubit ensures that both
                            event organizers and attendees have a hassle-free
                            experience.
                        </li>
                        <li>
                            <strong>Customizable Ticketing Solutions:</strong>{' '}
                            Create tailored tickets, set pricing, and offer
                            special packages that suit your event&apos;s needs.
                        </li>
                        <li>
                            <strong>Secure Transactions:</strong> Xcubit ensures
                            secure payments, protecting both the event
                            organizers and attendees.
                        </li>
                        <li>
                            <strong>Real-Time Analytics:</strong> Gain valuable
                            insights into ticket sales, attendance, and
                            engagement metrics to make informed decisions.
                        </li>
                        <li>
                            <strong>Mobile-Friendly:</strong> Attendees can
                            easily access tickets on mobile devices, making
                            entry and event management seamless.
                        </li>
                        <li>
                            <strong>Integration Options:</strong> Connect Xcubit
                            with your existing systems, such as email marketing,
                            CRM, and social media channels for enhanced
                            functionality.
                        </li>
                    </ul>

                    {/* About Xcubit */}
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide mb-4">
                        About Xcubit
                    </h2>
                    <p className="text-lg sm:text-xl leading-relaxed">
                        Xcubit is a platform that provides easy ticket
                        registration for events and activities happening around
                        the world. Whether it’s a conference, concert, seminar,
                        or any other event, Xcubit makes it simple for
                        organizers and attendees to connect through seamless
                        ticketing solutions.
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-wide mt-4">
                        What We Do
                    </h3>
                    <ul className="list-disc ml-6 space-y-2 text-lg sm:text-xl leading-relaxed">
                        <li>
                            Ticket Registration: Organize and manage ticket
                            sales for events.
                        </li>
                        <li>
                            Global Reach: Support for events happening anywhere
                            in the world.
                        </li>
                        <li>
                            Simple and Secure: Easy registration with secure
                            payment options.
                        </li>
                    </ul>

                    {/* Connection to VIEF */}
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide mb-4">
                        Xcubit and VIEF
                    </h2>
                    <p className="text-lg sm:text-xl leading-relaxed">
                        As part of Vastav Incubatex & Entrepreneurship
                        Foundation (VIEF), Xcubit benefits from their expertise
                        and support in innovation, networking, and growth,
                        helping to bring a better experience to event organizers
                        and attendees.
                    </p>

                    {/* CTA Button */}
                    <Link
                        href="/contact"
                        className="px-5 bg-main text-white py-2 rounded-full transition-all duration-300 dark:bg-background dark:hover:bg-main dark:border dark:border-primary"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AboutUs;
