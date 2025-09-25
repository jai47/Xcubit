import React from 'react';
import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/NavbarHome';
import Head from 'next/head';
import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';
import { GlowCard } from '@/src/components/Home/GlowCards';
// import { GlowCard } from './GlowCards';

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

            <div className="min-h-screen w-full bg-black text-white pt-32 pb-12 flex flex-col items-center">
                {/* Hero Section */}
                <h1 className="text-4xl sm:text-6xl font-bold">About Us</h1>
                <div className="w-full max-w-6xl mx-auto mt-10 px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left Image */}
                    <div className="flex justify-center">
                        <img
                            src="/team.png"
                            alt="Team working"
                            className="rounded-2xl shadow-lg max-h-[400px] object-cover"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="space-y-6 text-left">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Xcubit is a cutting-edge platform designed to
                            simplify ticketing and event management. Whether you
                            are organizing a conference, seminar, concert, or
                            any other event, Xcubit offers seamless solutions to
                            handle registrations, ticketing, and guest
                            management efficiently.
                        </p>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Our platform provides intuitive tools for event
                            organizers to create customized ticket options,
                            track sales, and optimize event logistics.
                        </p>
                        <div className="">
                            <Link
                                href="/contact"
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full text-white font-semibold shadow-lg hover:from-purple-500 hover:to-purple-700 transition"
                            >
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </div>

                <section className="py-16 pt-24 bg-black">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        {/* Heading */}
                        <h3 className="text-3xl sm:text-4xl font-bold tracking-wide mb-4 text-purple-400">
                            What We Do
                        </h3>
                        <p className="text-lg sm:text-xl text-gray-300 mb-12">
                            We specialize in creating seamless event management
                            solutions that simplify ticketing, expand global
                            reach, and ensure secure participation.
                        </p>

                        {/* 👉 Simple cards here */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Card 1 */}
                            <div className="rounded-xl p-6 bg-white/5 shadow-md hover:bg-white/10 transition">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mb-4">
                                    🎟️
                                </div>
                                <h3 className="text-lg font-semibold text-white/80 mb-2">
                                    Ticket Registration
                                </h3>
                                <p className="text-gray-400 text-sm text-left">
                                    Organize and manage ticket sales for events
                                    with ease and reliability.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="rounded-xl p-6 bg-white/5 shadow-md hover:bg-white/10 transition">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mb-4">
                                    🌍
                                </div>
                                <h3 className="text-lg font-semibold text-white/80 mb-2">
                                    Global Reach
                                </h3>
                                <p className="text-gray-400 text-sm text-left">
                                    Support events happening anywhere in the
                                    world with multilingual access.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="rounded-xl p-6 bg-white/5 shadow-md hover:bg-white/10 transition">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 mb-4">
                                    🔒
                                </div>
                                <h3 className="text-lg font-semibold text-white/80 mb-2">
                                    Simple & Secure
                                </h3>
                                <p className="text-gray-400 text-sm text-left">
                                    Easy registration process with multiple
                                    payment methods and top-notch security.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 👉 Why Choose Xcubit section with GlowCards */}
                <section className="py-16 bg-black text-white">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        {/* Heading */}
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-wide mb-4 text-purple-400">
                            Why Choose Xcubit?
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 mb-12">
                            We stand out from the competition by delivering
                            event management solutions that prioritize
                            simplicity, security, and flexibility.
                        </p>

                        <div className="w-full max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                            {/* Card 1 */}
                            <GlowCard>
                                <div className="p-6 rounded-2xl">
                                    <div className="text-4xl mb-3">🎨</div>
                                    <h4 className="text-2xl font-semibold mb-2">
                                        User-Friendly Interface
                                    </h4>
                                    <p className="text-gray-300">
                                        Designed with simplicity in mind, Xcubit
                                        ensures hassle-free event setup for both
                                        organizers and attendees.
                                    </p>
                                </div>
                            </GlowCard>

                            {/* Card 2 */}
                            <GlowCard>
                                <div className="p-6 rounded-2xl">
                                    <div className="text-4xl mb-3">🎟️</div>
                                    <h4 className="text-2xl font-semibold mb-2">
                                        Customizable Ticketing
                                    </h4>
                                    <p className="text-gray-300">
                                        Create tailored tickets, set flexible
                                        pricing, and offer special packages that
                                        suit your event&apos;s needs.
                                    </p>
                                </div>
                            </GlowCard>

                            {/* Card 3 */}
                            <GlowCard>
                                <div className="p-6 rounded-2xl">
                                    <div className="text-4xl mb-3">🔒</div>
                                    <h4 className="text-2xl font-semibold mb-2">
                                        Secure Transactions
                                    </h4>
                                    <p className="text-gray-300">
                                        Secure payment processing to protect
                                        both event organizers and attendees.
                                    </p>
                                </div>
                            </GlowCard>

                            {/* Card 4 */}
                            <GlowCard>
                                <div className="p-6 rounded-2xl">
                                    <div className="text-4xl mb-3">📊</div>
                                    <h4 className="text-2xl font-semibold mb-2">
                                        Real-Time Analytics
                                    </h4>
                                    <p className="text-gray-300">
                                        Track ticket sales, attendance, and
                                        engagement insights to make data-driven
                                        decisions.
                                    </p>
                                </div>
                            </GlowCard>

                            {/* Card 5 */}
                            <GlowCard>
                                <div className="p-6 rounded-2xl">
                                    <div className="text-4xl mb-3">📱</div>
                                    <h4 className="text-2xl font-semibold mb-2">
                                        Mobile-Friendly
                                    </h4>
                                    <p className="text-gray-300">
                                        Attendees can easily access tickets on
                                        their mobile devices for seamless entry
                                        and event participation.
                                    </p>
                                </div>
                            </GlowCard>

                            {/* Card 6 */}
                            <GlowCard>
                                <div className="p-6 rounded-2xl">
                                    <div className="text-4xl mb-3">🔗</div>
                                    <h4 className="text-2xl font-semibold mb-2">
                                        Integration Options
                                    </h4>
                                    <p className="text-gray-300">
                                        Connect Xcubit with your CRM, email
                                        marketing, and social media platforms
                                        for enhanced functionality.
                                    </p>
                                </div>
                            </GlowCard>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <div className="mt-16 w-full max-w-4xl">
                    <div
                        className="flex flex-col sm:flex-row justify-between items-center 
                  bg-black border border-purple-600 rounded-2xl px-8 py-6 
                  shadow-lg divide-y sm:divide-y-0 sm:divide-x divide-purple-700/40"
                    >
                        {/* Projects */}
                        <div className="flex-1 text-center px-6 py-4">
                            <h3 className="text-3xl font-bold text-purple-500">
                                200+
                            </h3>
                            <p className="text-gray-300">Projects Completed</p>
                        </div>
                        {/* Clients */}
                        <div className="flex-1 text-center px-6 py-4">
                            <h3 className="text-3xl font-bold text-purple-500">
                                150+
                            </h3>
                            <p className="text-gray-300">Satisfied Clients</p>
                        </div>
                        {/* Awards */}
                        <div className="flex-1 text-center px-6 py-4">
                            <h3 className="text-3xl font-bold text-purple-500">
                                50+
                            </h3>
                            <p className="text-gray-300">Industry Awards</p>
                        </div>
                    </div>
                </div>

                {/* Founder Section */}
                <div className="mt-20 w-full max-w-6xl flex flex-col md:flex-row items-center gap-8">
                    <img
                        src="/founder.jpg"
                        alt="Founder"
                        className="w-[350px] h-[350px] object-cover rounded-2xl shadow-lg"
                    />
                    <div className="text-left">
                        <h2 className="text-3xl font-semibold mb-4">
                            Our Vision – Message From Founder
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            As part of Vastav Incubatex & Entrepreneurship
                            Foundation (VIEF), Xcubit benefits from their
                            expertise and support in innovation, networking, and
                            growth, helping to bring a better experience to
                            event organizers and attendees.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mt-20 w-full max-w-6xl text-center">
                    <h2 className="text-4xl font-semibold mb-10">Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Mr. Venkatesh Bharti',
                                role: 'CEO & Founder',
                                img: '/team/founder.jpg',
                            },
                            {
                                name: 'Ms. Deepa Kohli',
                                role: 'Marketing Executive',
                                img: '/team/deepa.png',
                            },
                            {
                                name: 'Mr. Himanshu',
                                role: 'Business & Devvelopment Lead',
                                img: '/team/dalal.png',
                            },
                            {
                                name: 'Mr. Jai Mishra',
                                role: 'Operation Lead',
                                img: '/team/jai.jpg',
                            },
                            {
                                name: 'Mr. Ankit Singh',
                                role: 'Project Manager',
                                img: '/ex.jpg',
                            },
                            {
                                name: 'Mr. Akshobya',
                                role: 'Sponsor Manager',
                                img: '/team/ak.png',
                            },
                        ].map((member, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-gray-700 p-6 bg-white/5 shadow-md hover:bg-white/10 transition flex flex-col items-center"
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-28 h-28 object-cover rounded-full mb-4"
                                />
                                <h3 className="text-lg font-semibold text-white/80 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    {member.role}
                                </p>
                                <a
                                    href="#"
                                    className="text-purple-300 hover:text-white transition"
                                >
                                    <FaLinkedin size={22} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section*/}

                <section className="mt-10 relative h-[40vh] md:h-[60vh] lg:h-[40vh] w-screen overflow-hidden bg-neutral-950 flex flex-col items-center justify-center text-center px-6">
                    {/* Animated Gradient Blobs */}
                    <div className="absolute inset-0 blur-3xl opacity-50 [filter:url(#blurMe)_blur(60px)]">
                        <div
                            className="absolute w-[80%] md:w-[70%] lg:w-[60%] h-[80%] md:h-[70%] lg:h-[60%] 
                    top-[10%] left-[10%] md:top-[15%] md:left-[15%] animate-first 
                    bg-[radial-gradient(circle_at_center,rgba(18,113,255,0.5)_0%,transparent_70%)] 
                    mix-blend-screen
                    [-webkit-mask-image:radial-gradient(circle,white,transparent)]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-position:center]
                    [-webkit-mask-size:contain]"
                        ></div>
                        <div
                            className="absolute w-[80%] md:w-[70%] lg:w-[60%] h-[80%] md:h-[70%] lg:h-[60%] 
                    top-[10%] left-[10%] md:top-[15%] md:left-[15%] animate-second 
                    bg-[radial-gradient(circle_at_center,rgba(221,74,255,0.6)_0%,transparent_70%)] 
                    mix-blend-screen
                    [-webkit-mask-image:radial-gradient(circle,white,transparent)]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-position:center]
                    [-webkit-mask-size:contain]"
                        ></div>
                        <div
                            className="absolute w-[80%] md:w-[70%] lg:w-[60%] h-[80%] md:h-[70%] lg:h-[60%] 
                    top-[10%] left-[10%] md:top-[15%] md:left-[15%] animate-third 
                    bg-[radial-gradient(circle_at_center,rgba(100,220,255,0.5)_0%,transparent_70%)] 
                    mix-blend-screen
                    [-webkit-mask-image:radial-gradient(circle,white,transparent)]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-position:center]
                    [-webkit-mask-size:contain]"
                        ></div>
                        <div
                            className="absolute w-[80%] md:w-[70%] lg:w-[60%] h-[80%] md:h-[70%] lg:h-[60%] 
                    top-[10%] left-[10%] md:top-[15%] md:left-[15%] animate-fourth 
                    bg-[radial-gradient(circle_at_center,rgba(200,50,50,0.5)_0%,transparent_70%)] 
                    mix-blend-screen
                    [-webkit-mask-image:radial-gradient(circle,white,transparent)]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-position:center]
                    [-webkit-mask-size:contain]"
                        ></div>
                        <div
                            className="absolute w-[80%] md:w-[70%] lg:w-[60%] h-[80%] md:h-[70%] lg:h-[60%] 
                    top-[10%] left-[10%] md:top-[15%] md:left-[15%] animate-fifth 
                    bg-[radial-gradient(circle_at_center,rgba(180,180,50,0.5)_0%,transparent_70%)] 
                    mix-blend-screen
                    [-webkit-mask-image:radial-gradient(circle,white,transparent)]
                    [-webkit-mask-repeat:no-repeat]
                    [-webkit-mask-position:center]
                    [-webkit-mask-size:contain]"
                        ></div>
                    </div>

                    {/* Centered Content */}
                    <div className="w-full text-center py-20 px-6 rounded-l-3xl shadow-inner">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                            That’s all about us <br /> feel free to say Hi!
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
                            We are excited about the opportunity to learn more
                            about your business and how we can help you achieve
                            your goals in the digital world.
                        </p>
                        <div className="flex items-center justify-center">
                            <span className="relative inline-block overflow-hidden rounded-full p-[2px]">
                                <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#6366f1_50%,#b27ce6_100%)]"></span>
                                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-900/90 dark:bg-gray-950 text-sm sm:text-base lg:text-lg font-medium backdrop-blur-3xl">
                                    <Link
                                        href="/events"
                                        className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-purple-400/30 via-indigo-500/40 to-transparent dark:from-purple-400/20 dark:via-indigo-500/30 text-white border border-purple-500/40 hover:from-purple-400/50 hover:via-indigo-500/60 transition-all py-3 px-6 sm:py-4 sm:px-10 lg:py-4 lg:px-8"
                                    >
                                        Get in touch
                                    </Link>
                                </div>
                            </span>
                        </div>
                    </div>

                    {/* SVG Blur Filter */}
                    <svg className="hidden">
                        <defs>
                            <filter id="blurMe">
                                <feGaussianBlur
                                    in="SourceGraphic"
                                    stdDeviation="10"
                                    result="blur"
                                />
                                <feColorMatrix
                                    in="blur"
                                    mode="matrix"
                                    values="1 0 0 0 0  
                                    0 1 0 0 0  
                                    0 0 1 0 0  
                                    0 0 0 18 -8"
                                    result="goo"
                                />
                                <feBlend in="SourceGraphic" in2="goo" />
                            </filter>
                        </defs>
                    </svg>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default AboutUs;
