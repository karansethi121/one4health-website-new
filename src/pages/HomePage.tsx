import { PromoMarquee } from '@/components/layout/PromoMarquee';
import { HeroSection } from '@/sections/HeroSection';
import { ProblemSolutionSection } from '@/sections/ProblemSolutionSection';
import { WhatsInsideSection } from '@/sections/WhatsInsideSection';
import { ComparisonSection } from '@/sections/ComparisonSection';
import { HowItWorksSection } from '@/sections/HowItWorksSection';
import { ScienceSection } from '@/sections/ScienceSection';
import { CleanFormulaSection } from '@/sections/CleanFormulaSection';
import { SubscriptionSection } from '@/sections/SubscriptionSection';
import { FAQSection } from '@/sections/FAQSection';
import { TrustBar } from '@/components/layout/TrustBar';

export function HomePage() {
  return (
    <main className="w-full pt-16 lg:pt-24">
      <PromoMarquee />
      <HeroSection />
      <TrustBar />
      <div id="benefits">
        <ProblemSolutionSection />
      </div>
      <div id="ingredients">
        <WhatsInsideSection />
      </div>
      <ComparisonSection />
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <ScienceSection />
      <CleanFormulaSection />
      <SubscriptionSection />
      <FAQSection />
    </main>
  );
}
