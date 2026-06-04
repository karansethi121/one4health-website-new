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

import { useSEO } from '@/hooks/useSEO';

export function HomePage() {
  useSEO({
    title: 'ONE4HEALTH | Stay Calm. Stay Sharp. | Daily Wellness Simplified',
    description: 'Discover the power of KSM-66® Ashwagandha gummies by ONE4HEALTH. Clinically studied for stress relief and better sleep. 100% Vegan, Sugar-Free, and Made in India.',
    keywords: 'One4Health, ashwagandha gummies India, KSM-66 extract, cortisol regulation, stress relief, vegan supplements, sleep gummies',
    appendSiteName: false,
  });
  return (
    <main className="w-full pt-[72px] lg:pt-[84px]">
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

      <div id="reviews">
        <ScrollReveal>
          <CleanFormulaSection />
        </ScrollReveal>
      </div>

      <AllergenBar />

      <ScrollReveal>
        <FAQSection />
      </ScrollReveal>
    </main>
  );
}
