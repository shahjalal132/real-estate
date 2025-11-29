import AppLayout from "../Layouts/AppLayout";
import Hero from "../Components/Hero";
import FeaturedAuctions from "../Components/FeaturedAuctions";
import FeaturedResidential from "../Components/FeaturedResidential";
import FeaturedCommercial from "../Components/FeaturedCommercial";
import FeaturedRental from "../Components/FeaturedRental";
import FeaturedListings from "../Components/FeaturedListings";
import Statistics from "../Components/Statistics";
import DataPowered from "../Components/DataPowered";
import MarketplaceExplainer from "../Components/MarketplaceExplainer";
// import MobileApp from "../Components/MobileApp";
import Features from "../Components/Features";
import News from "../Components/News";
import Testimonials from "../Components/Testimonials";
import CTABanner from "../Components/CTABanner";
import { Property } from "../../types";
import ResidentialListings from "../Components/ResidentialListings";
import CommercialListings from "../Components/CommercialListings";

interface HomeProps {
    featuredAuctions?: Property[];
    featuredResidential?: Property[];
    featuredCommercial?: Property[];
    featuredRental?: Property[];
}

export default function Home({
    featuredAuctions = [],
    featuredResidential = [],
    featuredCommercial = [],
    featuredRental = [],
}: HomeProps) {
    return (
        <AppLayout title="Home" footerClassName="pt-32">
            <Hero />
            <FeaturedResidential properties={featuredResidential} />
            <FeaturedAuctions auctions={featuredAuctions} />
            <FeaturedCommercial properties={featuredCommercial} />
            <FeaturedRental properties={featuredRental} />
            <FeaturedListings />
            <ResidentialListings/>
            <FeaturedAuctions />
            <CommercialListings/>
            <Statistics />
            <DataPowered />
            <MarketplaceExplainer />
            {/* <MobileApp /> */}
            <Features />
            <News />
            <Testimonials />
            <CTABanner />
        </AppLayout>
    );
}
