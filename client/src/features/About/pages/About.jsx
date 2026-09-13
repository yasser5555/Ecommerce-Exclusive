import HereoSection from "../Components/hereoSection";
import StatsSection from "../Components/StatsSection";
import TeamSection from "../Components/TeamSection";
import BenefitsSection from "../Components/BenefitsSection";
import { useChangeTitle } from "../../../shared/Utils/useChangeTitle";

const AboutPage = () => {
  useChangeTitle({title:"About"})
  return (
    <main className="bg-light">
      <HereoSection />
      <StatsSection />
      <TeamSection />
      <BenefitsSection />
    </main>
  );
};

export default AboutPage;
