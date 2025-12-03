import AppLayout from "../Layouts/AppLayout";
import Hero from "../../Components/Hero";
import FeaturedAuctions from "../../Components/FeaturedAuctions";
import FeaturedResidential from "../../Components/FeaturedResidential";
import FeaturedCommercial from "../../Components/FeaturedCommercial";
import DataPowered from "../../Components/DataPowered";
import MarketplaceExplainer from "../../Components/MarketplaceExplainer";
import Features from "../../Components/Features";
import News from "../../Components/News";
import Testimonials from "../../Components/Testimonials";
import CTABanner from "../../Components/CTABanner";
import ScrollToTop from "../../Components/ScrollToTop";
import { Property } from "../../types";

interface HeroContent {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    backgroundImage: string;
}

interface Statistic {
    icon: string;
    number: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface NewsItem {
    title: string;
    slug: string;
}

interface Testimonial {
    quote: string;
    author: string;
    title: string;
}

interface CTABanner {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

interface MarketplaceExplainer {
    title: string;
    subtitle: string;
    videoUrl: string | null;
    videoThumbnail: string | null;
}

interface DataPowered {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

interface HomeProps {
    featuredAuctions?: Property[];
    featuredResidential?: Property[];
    featuredCommercial?: Property[];
    heroContent?: HeroContent;
    statistics?: Statistic[];
    features?: Feature[];
    news?: NewsItem[];
    testimonials?: Testimonial[];
    ctaBanner?: CTABanner;
    marketplaceExplainer?: MarketplaceExplainer;
    dataPowered?: DataPowered;
}

export default function Home({
    featuredAuctions = [],
    featuredResidential = [],
    featuredCommercial = [],
    heroContent,
    features = [],
    news = [],
    testimonials = [],
    ctaBanner,
    marketplaceExplainer,
    dataPowered,
}: HomeProps) {
    return (
        <AppLayout title="Home" footerClassName="pt-32">
            <Hero content={heroContent} />
            <FeaturedResidential properties={featuredResidential} />
            <FeaturedAuctions auctions={featuredAuctions} />
            <FeaturedCommercial properties={featuredCommercial} />
            <DataPowered content={dataPowered} />
            <MarketplaceExplainer content={marketplaceExplainer} />
            <Features features={features} />
            <News news={news} />
            <Testimonials testimonials={testimonials} />
            <CTABanner content={ctaBanner} />
            <ScrollToTop />
        </AppLayout>
    );
}
