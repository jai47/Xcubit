import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/NavbarHome';
import UpcomingEvents from '../components/UpcomingEvents/UpcomingEvents';
import Head from 'next/head';
import { TimelineDemo } from '../components/Timeline/TimelineDemo';
const HomeAbout = dynamic(() => import('../components/Home/About/HomeAbout'));
const SponsorSection = dynamic(() =>
    import('../components/Home/Sponsor/SponsorSection')
);
const HeroSection = dynamic(() =>
    import('../components/Home/HeroSection/HeroSection')
);
const CompetitionTracks = dynamic(() =>
    import('../components/Home/CompetitionTracks/CompetitionTracks')
);
const Judges = dynamic(() => import('../components/Home/Judges/Judges'));
import dynamic from 'next/dynamic';

export default async function Home() {
    return (
        <>
            <Head>
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
                    content="https://xcubit.in/logo/logo.png"
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
            <div>
                <Navbar />
                <main>
                    <HeroSection />
                    {/* <UpcomingEvents /> */}
                    <HomeAbout />
                    <CompetitionTracks />
                    <TimelineDemo />
                    <Judges />
                    <SponsorSection />
                </main>
                <Footer />
            </div>
        </>
    );
}
