import Navbar from "@/components/Navbar";
import CinematicHero from "@/components/CinematicHero";
import AboutUsSection from "@/components/AboutUsSection";
import SponsorShowcase from "@/components/SponsorShowcase";
import FounderSection from "@/components/FounderSection";
import TrustVerificationSection from "@/components/TrustVerificationSection";
import MissionSection from "@/components/MissionSection";
import CampaignsSection from "@/components/CampaignsSection";
import MarketingBanner from "@/components/MarketingBanner";
import ProjectsSection from "@/components/ProjectsSection";
import PartnershipSection from "@/components/PartnershipSection";
import GallerySection from "@/components/GallerySection";
import DonationSection from "@/components/DonationSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <CinematicHero />
    <div className="section-divider" />
    <SponsorShowcase />
    <div className="section-divider" />
    <FounderSection />
    <div className="section-divider" />
    <TrustVerificationSection />
    <div className="section-divider" />
    <div id="campaigns">
      <MissionSection />
      <div className="section-divider" />
      <CampaignsSection />
    </div>
    <div className="section-divider" />
    <MarketingBanner />
    <div className="section-divider" />
    <div id="projects">
      <ProjectsSection />
    </div>
    <div className="section-divider" />
    <PartnershipSection />
    <div className="section-divider" />
    <div id="gallery">
      <GallerySection />
    </div>
    <div className="section-divider" />
    <div id="donate">
      <DonationSection />
    </div>
    <div className="section-divider" />
    <ContactSection />
    <SiteFooter />
  </div>
);

export default Index;
