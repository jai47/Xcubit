import Footer from '@/src/components/layout/Footer';
import Navbar from '@/src/components/layout/NavbarHome';
import HeroSection from '@/src/components/HeroSection/HeroSection';
import FiltersSection from '../components/FiltersSection/FiltersSection';
import UpcomingEvents from '../components/UpcomingEvents/UpcomingEvents';
import SupportersSection from '../components/SupportersSection/SupportersSection';

export default async function Home() {
    return (
        <div>
            <Navbar />
            <main>
                <HeroSection />
                <FiltersSection />
                <UpcomingEvents />
                <SupportersSection />
            </main>
            <Footer />
        </div>
    );
}
