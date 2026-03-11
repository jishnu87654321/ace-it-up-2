import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesOverview } from "@/components/ServicesOverview";
import { ProcessSection } from "@/components/ProcessSection";
import { StatsSection } from "@/components/StatsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesOverview />
      <ProcessSection />
      <StatsSection />
    </Layout>
  );
};

export default Index;
