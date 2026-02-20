import { PromoMarquee } from '@/components/layout/PromoMarquee';
import { HeroSection } from '@/sections/HeroSection';
import { ProblemSolutionSection } from '@/sections/ProblemSolutionSection';
import { WhatsInsideSection } from '@/sections/WhatsInsideSection';
import { ComparisonSection } from '@/sections/ComparisonSection';

import { ScienceSection } from '@/sections/ScienceSection';
import { CleanFormulaSection } from '@/sections/CleanFormulaSection';
import { SubscriptionSection } from '@/sections/SubscriptionSection';
import { FAQSection } from '@/sections/FAQSection';
import { TrustBar } from '@/components/layout/TrustBar';
import { AllergenBar } from '@/components/layout/AllergenBar';

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

      <ScienceSection />
      <CleanFormulaSection />
      <AllergenBar />
      <SubscriptionSection />
      <FAQSection />
    </main>
  );
}
