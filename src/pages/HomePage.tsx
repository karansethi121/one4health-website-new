import { PromoMarquee } from '@/components/layout/PromoMarquee';
import { HeroSection } from '@/sections/HeroSection';
import { ProblemSolutionSection } from '@/sections/ProblemSolutionSection';
import { WhatsInsideSection } from '@/sections/WhatsInsideSection';
import { ComparisonSection } from '@/sections/ComparisonSection';

import { ScienceSection } from '@/sections/ScienceSection';
import { CleanFormulaSection } from '@/sections/CleanFormulaSection';
import { FAQSection } from '@/sections/FAQSection';
import { TrustBar } from '@/components/layout/TrustBar';
import { AllergenBar } from '@/components/layout/AllergenBar';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function HomePage() {
  useDocumentTitle('ONE4HEALTH | Stay Calm. Stay Sharp. | Daily Wellness Simplified', false);
  return (
    <main className="w-full pt-16 lg:pt-24">
      <PromoMarquee />
      <HeroSection />
      
      <ScrollReveal>
        <TrustBar />
      </ScrollReveal>

      <div id="benefits">
        <ScrollReveal>
          <ProblemSolutionSection />
        </ScrollReveal>
      </div>

      <div id="ingredients">
        <ScrollReveal>
          <WhatsInsideSection />
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <ComparisonSection />
      </ScrollReveal>

      <ScrollReveal>
        <ScienceSection />
      </ScrollReveal>

      <ScrollReveal>
        <CleanFormulaSection />
      </ScrollReveal>

      <AllergenBar />

      <ScrollReveal>
        <FAQSection />
      </ScrollReveal>
    </main>
  );
}
