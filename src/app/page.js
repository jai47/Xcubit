import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/NavbarHome';
import HeroSection from '@/components/HeroSection/HeroSection';
import FiltersSection from '../components/FiltersSection/FiltersSection';
import UpcomingEvents from '../components/UpcomingEvents/UpcomingEvents';
import SupportersSection from '../components/SupportersSection/SupportersSection';
import BlogSection from '../components/BlogSection/BlogSection';
import { auth } from './auth';
export default async function Home() {
    const session = await auth();
    const user = session?.user;
    return (
        <div>
            <Navbar user={user} />
            <main>
                <HeroSection />
                <FiltersSection />
                <UpcomingEvents />
                <SupportersSection />
                {/* <BlogSection /> */}
            </main>
            <Footer />
        </div>
    );
}
