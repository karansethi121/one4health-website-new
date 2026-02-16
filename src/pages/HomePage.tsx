import { HeroSection } from '@/sections/HeroSection';
import { ProblemSolutionSection } from '@/sections/ProblemSolutionSection';
import { WhatsInsideSection } from '@/sections/WhatsInsideSection';
import { ComparisonSection } from '@/sections/ComparisonSection';
import { HowItWorksSection } from '@/sections/HowItWorksSection';
import { ScienceSection } from '@/sections/ScienceSection';
import { CleanFormulaSection } from '@/sections/CleanFormulaSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { SubscriptionSection } from '@/sections/SubscriptionSection';
import { FAQSection } from '@/sections/FAQSection';
import { TrustBar } from '@/components/TrustBar';

export function HomePage() {
  return (
    <main className="w-full">
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
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <SubscriptionSection />
      <FAQSection />
    </main>
  );
}
