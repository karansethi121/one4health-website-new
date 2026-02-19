import { FileText } from 'lucide-react';

export function TermsPage() {
  return (
    <main className="w-full pt-24 pb-16">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-12">
          <FileText className="w-12 h-12 text-sage-700 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-charcoal-600">
            Last updated: February 2026
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-charcoal-600">
          <p>
            Welcome to One4Health. By accessing or using our website and services,
            you agree to be bound by these Terms of Service. Please read them carefully
            before making a purchase.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing our website, placing an order, or using our services, you
            acknowledge that you have read, understood, and agree to be bound by these
            Terms of Service and our Privacy Policy.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            2. Product Information
          </h2>
          <p>
            We strive to provide accurate product information, including descriptions,
            images, and pricing. However, we do not warrant that product descriptions
            or other content is accurate, complete, reliable, current, or error-free.
          </p>
          <p className="mt-4">
            <strong>Important:</strong> Our products are dietary supplements and are not
            intended to diagnose, treat, cure, or prevent any disease. Consult your
            healthcare provider before starting any supplement regimen.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            3. Orders and Payment
          </h2>
          <p>
            All orders are subject to acceptance and availability. We reserve the right
            to refuse or cancel any order for any reason, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Product availability</li>
            <li>Errors in product or pricing information</li>
            <li>Suspected fraudulent activity</li>
          </ul>
          <p className="mt-4">
            Prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes.
            Shipping charges will be added at checkout.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            4. Shipping and Delivery
          </h2>
          <p>
            We aim to process and ship orders within 1-2 business days. Delivery times
            are estimates and may vary based on location and other factors. We are not
            responsible for delays caused by shipping carriers or customs.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            5. Returns and Refunds
          </h2>
          <p>
            We offer a 30-day satisfaction guarantee. If you are not satisfied with your
            purchase, you may return unopened products within 30 days for a full refund.
            Please refer to our Shipping & Returns page for complete details.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            6. Intellectual Property
          </h2>
          <p>
            All content on this website, including text, graphics, logos, images, and
            software, is the property of One4Health and is protected by copyright and
            other intellectual property laws. You may not use, reproduce, or distribute
            any content without our prior written permission.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            7. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, One4Health shall not be liable
            for any indirect, incidental, special, consequential, or punitive damages
            arising out of or relating to your use of our website or products.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            8. Governing Law
          </h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance
            with the laws of India. Any disputes shall be subject to the exclusive
            jurisdiction of the courts in Lucknow, India.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            9. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Changes
            will be effective immediately upon posting to the website. Your continued
            use of our services constitutes acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-heading font-bold text-charcoal-900 mt-8 mb-4">
            10. Contact Information
          </h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
            <br />
            <a href="mailto:info@one4health.com" className="text-sage-700 hover:underline">
              info@one4health.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
