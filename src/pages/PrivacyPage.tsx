import { Shield } from 'lucide-react';

export function PrivacyPage() {
  return (
    <main className="w-full pt-24 pb-16">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-12">
          <Shield className="w-12 h-12 text-sage-700 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-charcoal-600">
            Last updated: February 2026
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-charcoal-600">
          <p>
            At One4Health, we take your privacy seriously. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you visit 
            our website or make a purchase.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            Information We Collect
          </h2>
          <p>
            We collect information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Register on our website</li>
            <li>Place an order</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact our support team</li>
            <li>Participate in surveys or promotions</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Send you order confirmations and updates</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and products</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            Information Sharing
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. 
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Service providers who assist in operating our business</li>
            <li>Payment processors to complete transactions</li>
            <li>Shipping partners to deliver your orders</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            Data Security
          </h2>
          <p>
            We implement appropriate technical and organizational measures to protect 
            your personal information against unauthorized access, alteration, disclosure, 
            or destruction.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            Your Rights
          </h2>
          <p>
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent where applicable</li>
          </ul>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:privacy@oneforhealth.com" className="text-sage-700 hover:underline">
              privacy@oneforhealth.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
