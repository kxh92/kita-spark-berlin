
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import FeaturedKitasSection from "@/components/FeaturedKitasSection";
import JobSearchSection from "@/components/JobSearchSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <TrustedBySection />
      <FeaturedKitasSection />
      <JobSearchSection />
      <Footer />
    </div>
  );
};

export default Index;
