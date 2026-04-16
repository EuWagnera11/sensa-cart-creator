import AnnounceBanner from "@/components/AnnounceBanner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBand from "@/components/MarqueeBand";
import TrustBar from "@/components/TrustBar";
import Categories from "@/components/Categories";
import SatireBanners from "@/components/SatireBanners";
import NewArrivals from "@/components/NewArrivals";
import Products from "@/components/Products";
import PromoGrid from "@/components/PromoGrid";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => (
  <>
    <SEOHead />
    <AnnounceBanner />
    <Navbar />
    <Hero />
    <MarqueeBand />
    <TrustBar />
    <NewArrivals />
    <Categories />
    <SatireBanners />
    <Products />
    <PromoGrid />
    
    <Newsletter />
    <Footer />
  </>
);

export default Index;
