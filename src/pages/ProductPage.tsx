import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Sparkles,
  Truck,
  Shield,
  Minus,
  Plus,
  ChevronRight,
  Leaf,
  Beaker,
  Sun,
  Info,
  Heart,
  RefreshCw,
  Lightbulb,
  Clock,
  Moon,
  Sun as SunIcon,
  Thermometer,
  Package,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/context/CartContext';
import { mainProduct, faqs } from '@/data/products';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';

gsap.registerPlugin(ScrollTrigger);

type PurchaseType = 'onetime' | 'subscribe';
type SubscriptionDuration = '1month' | '3month';

export function ProductPage() {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('onetime');
  const [subscriptionDuration, setSubscriptionDuration] = useState<SubscriptionDuration>('1month');

  const product = mainProduct;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-animate',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.product-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCurrentPrice = () => {
    if (purchaseType === 'subscribe') {
      if (subscriptionDuration === '1month') {
        return Math.round(product.price * 0.85); // 15% off
      } else {
        return Math.round(product.price * 0.80); // 20% off for 3 month
      }
    }
    return product.price;
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, purchaseType === 'subscribe', purchaseType === 'subscribe' ? subscriptionDuration : undefined);
  };

  const currentPrice = getCurrentPrice();
  const savings = product.originalPrice
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="w-full pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="section-container pt-4 pb-2 lg:pt-6 lg:pb-4">
        <nav className="flex items-center gap-2 text-xs lg:text-sm text-charcoal-500">
          <Link to="/" className="hover:text-sage-700">Home</Link>
          <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
          <Link to="/shop" className="hover:text-sage-700">Shop</Link>
          <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="text-charcoal-900" aria-current="page">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="section-container py-6 lg:py-12">
        <div className="product-content grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left - Images */}
          <div className="product-animate flex items-center justify-center">
            <div className="relative">
              {/* Transparent product image - no background box */}
              <img
                src="/images/product_transparent.png"
                alt={product.name}
                className="w-64 sm:w-72 lg:w-96 xl:w-[28rem] h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="product-animate space-y-4 lg:space-y-6">
            {/* Badge */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-coral-100 text-coral-700 rounded-full text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                New Launch
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-charcoal-900 mb-2">
                {product.name}
              </h1>
              <p className="text-base lg:text-lg text-charcoal-600">{product.subtitle}</p>
              <p className="text-sm font-medium text-sage-700 mt-1">Flavor: Mixed Berry</p>
            </div>

            {/* Purchase Type Toggle */}
            <div className="bg-sage-50 rounded-xl lg:rounded-2xl p-1">
              <div className="flex gap-1">
                <button
                  onClick={() => setPurchaseType('onetime')}
                  className={`flex-1 py-2.5 px-3 lg:px-4 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium transition-all ${purchaseType === 'onetime'
                    ? 'bg-white text-charcoal-900 shadow-sm'
                    : 'text-charcoal-500 hover:text-charcoal-700'
                    }`}
                >
                  One-Time
                </button>
                <button
                  onClick={() => setPurchaseType('subscribe')}
                  className={`flex-1 py-2.5 px-3 lg:px-4 rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium transition-all ${purchaseType === 'subscribe'
                    ? 'bg-sage-700 text-white shadow-sm'
                    : 'text-charcoal-500 hover:text-charcoal-700'
                    }`}
                >
                  Subscribe & Save
                </button>
              </div>
            </div>

            {/* Subscription Options */}
            {purchaseType === 'subscribe' && (
              <div className="space-y-2 lg:space-y-3 animate-fade-in">
                <p className="text-xs lg:text-sm text-charcoal-500">Choose your plan:</p>
                <div className="space-y-2">
                  <button
                    onClick={() => setSubscriptionDuration('1month')}
                    className={`w-full flex items-center justify-between p-3 lg:p-4 rounded-xl border-2 transition-all ${subscriptionDuration === '1month'
                      ? 'border-sage-700 bg-sage-50'
                      : 'border-charcoal-200 hover:border-sage-300'
                      }`}
                  >
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 flex items-center justify-center ${subscriptionDuration === '1month' ? 'border-sage-700' : 'border-charcoal-300'
                        }`}>
                        {subscriptionDuration === '1month' && <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 bg-sage-700 rounded-full" />}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-charcoal-900 text-sm lg:text-base">1 Month</p>
                        <p className="text-xs text-charcoal-500">Delivered monthly</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sage-700 text-sm lg:text-base">{formatPrice(Math.round(product.price * 0.85))}</p>
                      <p className="text-xs text-coral-600">Save 15%</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSubscriptionDuration('3month')}
                    className={`w-full flex items-center justify-between p-3 lg:p-4 rounded-xl border-2 transition-all ${subscriptionDuration === '3month'
                      ? 'border-sage-700 bg-sage-50'
                      : 'border-charcoal-200 hover:border-sage-300'
                      }`}
                  >
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 flex items-center justify-center ${subscriptionDuration === '3month' ? 'border-sage-700' : 'border-charcoal-300'
                        }`}>
                        {subscriptionDuration === '3month' && <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 bg-sage-700 rounded-full" />}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-charcoal-900 text-sm lg:text-base">3 Months</p>
                        <p className="text-xs text-charcoal-500">Best value</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sage-700 text-sm lg:text-base">{formatPrice(Math.round(product.price * 0.80))}<span className="text-xs font-normal text-charcoal-500">/mo</span></p>
                      <p className="text-xs text-coral-600">Save 20%</p>
                    </div>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs lg:text-sm text-charcoal-500">
                  <RefreshCw className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span>Never run out. Pause or cancel anytime.</span>
                </div>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 lg:gap-3 flex-wrap">
              <span className="text-2xl lg:text-3xl font-bold text-sage-700">
                {formatPrice(currentPrice)}
              </span>
              {purchaseType === 'onetime' && product.originalPrice && (
                <>
                  <span className="text-lg lg:text-xl text-charcoal-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-1 bg-coral-100 text-coral-700 rounded-full text-xs font-medium">
                    Save {savings}%
                  </span>
                </>
              )}
              {purchaseType === 'subscribe' && (
                <span className="px-2 py-1 bg-sage-100 text-sage-700 rounded-full text-xs font-medium">
                  {subscriptionDuration === '1month' ? '15% off + Free Shipping' : '20% off + Free Shipping'}
                </span>
              )}
            </div>

            {/* Key benefits */}
            <div className="flex flex-wrap gap-2">
              {product.benefits.slice(0, 3).map((benefit) => (
                <span key={benefit} className="text-xs lg:text-sm text-charcoal-600 bg-sage-50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-sage-600" />
                  {benefit}
                </span>
              ))}
            </div>

            {/* Supply Info */}
            <div className="flex items-center gap-3 lg:gap-4 text-xs lg:text-sm text-charcoal-600 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sage-700" />
                {product.supplyDuration}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sage-700" />
                {product.servingSize} daily
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 lg:gap-4">
              <span className="text-sm font-medium text-charcoal-700">Quantity:</span>
              <div className="flex items-center gap-2 lg:gap-3 bg-sage-50 rounded-full px-3 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                >
                  <Minus className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </button>
                <span className="w-6 lg:w-8 text-center font-medium text-sm lg:text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2 lg:space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-sage-700 hover:bg-sage-800 text-white font-semibold py-3.5 lg:py-4 rounded-full transition-all duration-300 hover:scale-[1.02] text-sm lg:text-base min-h-[52px] lg:min-h-[56px]"
              >
                {purchaseType === 'subscribe' ? 'Subscribe Now' : 'Add to Cart'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 lg:gap-4 text-xs text-charcoal-500">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                {purchaseType === 'subscribe' ? 'Free shipping always' : 'Free shipping over ₹999'}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                30-day guarantee
              </span>
            </div>

            {/* FDA/FSSAI Disclaimer */}
            <div className="p-3 lg:p-4 bg-sage-50 rounded-xl">
              <p className="text-xs text-charcoal-400 leading-relaxed">
                *These statements have not been evaluated by the Food and Drug Administration or FSSAI.
                This product is not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="section-container py-8 lg:py-12">
        <Tabs defaultValue="benefits" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-charcoal-200 rounded-none h-auto p-0 mb-6 lg:mb-8 overflow-x-auto">
            {['Benefits', 'Ingredients', 'How to Use', 'FAQ'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().replace(/\s+/g, '-')}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-sage-700 data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2.5 lg:py-3 px-3 lg:px-4 text-charcoal-600 data-[state=active]:text-charcoal-900 text-sm lg:text-base whitespace-nowrap"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="benefits" className="mt-0">
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              {product.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-soft-sm flex items-start gap-3 lg:gap-4">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-sage-100 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-sage-700" />
                  </div>
                  <p className="text-charcoal-700 font-medium text-sm lg:text-base">{benefit}</p>
                </div>
              ))}
            </div>


            {/* Disclaimer */}
            <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-amber-50 rounded-xl flex items-start gap-2 lg:gap-3">
              <Info className="w-4 h-4 lg:w-5 lg:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs lg:text-sm text-amber-800">
                *These statements have not been evaluated by the Food and Drug Administration or FSSAI.
                This product is not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-0">
            <div className="space-y-4 lg:space-y-6">
              {product.ingredients.map((ingredient, idx) => (
                <div key={idx} className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-soft-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-charcoal-900 text-sm lg:text-base">{ingredient.name}</h4>
                      <p className="text-xs lg:text-sm text-charcoal-500">
                        Per gummy: {ingredient.amount} • Daily: {ingredient.dailyAmount}
                      </p>
                    </div>
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-sage-100 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                      {idx === 0 ? <Leaf className="w-4 h-4 lg:w-5 lg:h-5 text-sage-700" /> :
                        idx === 1 ? <Sun className="w-4 h-4 lg:w-5 lg:h-5 text-sage-700" /> :
                          <Beaker className="w-4 h-4 lg:w-5 lg:h-5 text-sage-700" />}
                    </div>
                  </div>
                  <p className="text-charcoal-600 text-sm">{ingredient.description}</p>
                  {idx === 1 && (
                    <div className="mt-3 p-3 bg-sage-50 rounded-lg">
                      <p className="text-xs lg:text-sm text-sage-700 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>We use Vitamin D2 (Ergocalciferol) — a 100% plant-based form suitable for vegans, unlike typical animal-derived D3.</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="how-to-use" className="mt-0">
            <div className="bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-8 shadow-soft">
              <h3 className="text-lg lg:text-xl font-semibold text-charcoal-900 mb-4 lg:mb-6">How to Use</h3>

              {/* Dosage Instructions */}
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 text-sm lg:text-base mb-1">Daily Dosage</h4>
                    <p className="text-charcoal-600 text-sm">Take <span className="font-semibold text-sage-700">2 gummies daily</span> — one in the morning and one in the evening/night, with or after food.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-sunshine-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <SunIcon className="w-5 h-5 lg:w-6 lg:h-6 text-sunshine-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal-900 text-sm lg:text-base mb-1">Morning Gummy</h4>
                      <p className="text-charcoal-600 text-sm">Take with breakfast or mid-morning to support calm energy throughout your day.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-lavender-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Moon className="w-5 h-5 lg:w-6 lg:h-6 text-lavender-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-charcoal-900 text-sm lg:text-base mb-1">Evening Gummy</h4>
                      <p className="text-charcoal-600 text-sm">Take 30-60 minutes before bedtime for optimal relaxation and restful sleep.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 lg:w-6 lg:h-6 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 text-sm lg:text-base mb-1">How to Consume</h4>
                    <p className="text-charcoal-600 text-sm">Chew thoroughly before swallowing. <span className="font-semibold text-coral-600">Do not exceed recommended dosage of 2 gummies per day.</span></p>
                  </div>
                </div>

                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Thermometer className="w-5 h-5 lg:w-6 lg:h-6 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 text-sm lg:text-base mb-1">Storage Instructions</h4>
                    <p className="text-charcoal-600 text-sm">Store in a cool, dry place away from direct sunlight. Keep bottle tightly closed.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal-900 text-sm lg:text-base mb-1">Duration for Results</h4>
                    <p className="text-charcoal-600 text-sm">For best results, use consistently for at least 4 weeks. Individual results may vary.</p>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="mt-6 lg:mt-8 pt-5 lg:pt-6 border-t border-charcoal-100">
                <h4 className="font-semibold text-charcoal-900 mb-3 lg:mb-4 text-sm lg:text-base flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 lg:w-5 lg:h-5 text-sunshine-600" />
                  Quick Tips for Best Results
                </h4>
                <ul className="space-y-2 text-sm text-charcoal-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                    <span>Make the evening gummy part of your nightly wind-down routine — pair with light stretching or meditation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                    <span>The morning gummy helps support calm energy throughout your day.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                    <span>Consistency is key — take at the same time each day for optimal results.</span>
                  </li>
                </ul>
              </div>

              {/* Timeline */}
              <div className="mt-6 lg:mt-8 pt-5 lg:pt-6 border-t border-charcoal-100">
                <h4 className="font-medium text-charcoal-900 mb-3 lg:mb-4 text-sm lg:text-base">What to Expect</h4>
                <div className="flex flex-wrap gap-3 lg:gap-4">
                  <div className="bg-sage-50 rounded-lg lg:rounded-xl px-3 py-2 lg:px-4 lg:py-3">
                    <p className="text-xs text-charcoal-400 uppercase">Week 1</p>
                    <p className="text-xs lg:text-sm text-charcoal-700">Feeling more balanced</p>
                  </div>
                  <div className="bg-sage-50 rounded-lg lg:rounded-xl px-3 py-2 lg:px-4 lg:py-3">
                    <p className="text-xs text-charcoal-400 uppercase">Week 2</p>
                    <p className="text-xs lg:text-sm text-charcoal-700">Improved relaxation</p>
                  </div>
                  <div className="bg-sage-50 rounded-lg lg:rounded-xl px-3 py-2 lg:px-4 lg:py-3">
                    <p className="text-xs text-charcoal-400 uppercase">Week 4+</p>
                    <p className="text-xs lg:text-sm text-charcoal-700">Consistent daily support</p>
                  </div>
                </div>
                <p className="text-xs text-charcoal-400 mt-3 lg:mt-4">
                  *Individual results may vary. Consistency is key.
                </p>
              </div>

              {/* Safety Warnings */}
              <div className="mt-5 lg:mt-6 space-y-2">
                <div className="p-3 lg:p-4 bg-amber-50 rounded-lg lg:rounded-xl flex items-start gap-2 lg:gap-3">
                  <Info className="w-4 h-4 lg:w-5 lg:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs lg:text-sm text-amber-800">
                    Consult your healthcare provider before use if you are pregnant, nursing, taking medication, or have a medical condition.
                  </p>
                </div>
                <div className="p-3 lg:p-4 bg-red-50 rounded-lg lg:rounded-xl flex items-start gap-2 lg:gap-3">
                  <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs lg:text-sm text-red-800">
                    <p className="font-medium">Important Safety Information:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Keep out of reach of children</li>
                      <li>• Do not exceed recommended dosage of 2 gummies per day</li>
                      <li>• For adults 18 years and older only</li>
                      <li>• This is a dietary supplement, not a medicine</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="bg-white rounded-xl lg:rounded-2xl mb-2 lg:mb-3 px-4 lg:px-6 border-none shadow-soft-sm">
                  <AccordionTrigger className="text-left font-medium text-charcoal-900 hover:no-underline py-3 lg:py-4 text-sm lg:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-charcoal-600 pb-3 lg:pb-4 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </section>

      {/* Mobile Sticky Bottom Bar with WhatsApp */}
      <MobileStickyBar productName={product.name} />
    </main>
  );
}
