import AppLayout from '../Layouts/AppLayout';
import Hero from '../Components/Hero';
import FeaturedAuctions from '../Components/FeaturedAuctions';
import FeaturedListings from '../Components/FeaturedListings';
import Statistics from '../Components/Statistics';
import DataPowered from '../Components/DataPowered';
import MarketplaceExplainer from '../Components/MarketplaceExplainer';
import MobileApp from '../Components/MobileApp';
import Features from '../Components/Features';
import News from '../Components/News';
import Testimonials from '../Components/Testimonials';
import CTABanner from '../Components/CTABanner';

export default function Home() {
    return (
        <AppLayout title= "Home" footerClassName = "pt-32" >
            <Hero />
            < FeaturedAuctions />
            <FeaturedListings />
            < Statistics />
            <DataPowered />
            < MarketplaceExplainer />
            <MobileApp />
            < Features />
            <News />
            < Testimonials />
            <CTABanner />
            </AppLayout>
    );
}

