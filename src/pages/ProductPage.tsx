import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
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
  Clock,
  Moon,
  Sun as SunIcon,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/context/CartContext';
import { faqs } from '@/data/products';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';

gsap.registerPlugin(ScrollTrigger);

type PurchaseType = 'onetime' | 'subscribe';
type SubscriptionDuration = '15days' | '1month';
type PackSize = 1 | 2;

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('onetime');
  const [subscriptionDuration, setSubscriptionDuration] = useState<SubscriptionDuration>('15days');
  const [packSize, setPackSize] = useState<PackSize>(1);

  // Handle initial purchase type from navigation state
  useEffect(() => {
    if (location.state?.purchaseType) {
      setPurchaseType(location.state.purchaseType);
    }
  }, [location.state]);

  // Use dynamic Shopify product data if available
  const shopifyProduct = useMemo(() => {
    // 1. Try to find by handle in all_products (most reliable for client-side navigation)
    if (id && window.ShopifyData?.all_products?.[id]) {
      return window.ShopifyData.all_products[id];
    }
    // 2. Try the global product (present if on Shopify product page)
    if (window.ShopifyData?.product && (!id || window.ShopifyData.product.handle === id)) {
      return window.ShopifyData.product;
    }
    // 3. Last resort: just use the first available product in all_products if we are on a product-like path
    if (window.ShopifyData?.all_products) {
      const handles = Object.keys(window.ShopifyData.all_products);
      if (handles.length > 0) {
        // If we have a handle like "ashwagandha-gummies-ksm66" but it's not found exactly, 
        // we might still want to show the primary product.
        return window.ShopifyData.all_products[handles[0]];
      }
    }
    return null;
  }, [id]);

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
    }).format(price / 100);
  };

  const currentVariant = useMemo(() => {
    if (!shopifyProduct) return null;
    // For this implementation, we assume the first variant is the main one.
    // In a more complex setup, we'd match against selected options.
    return shopifyProduct.variants[0];
  }, [shopifyProduct]);

  const getCurrentPrice = () => {
    // Starting with 499 as original base price for 1 pack of 30 gummies
    if (purchaseType === 'subscribe') {
      if (subscriptionDuration === '15days') {
        return 29900; // Special subscription price for 15 days
      }
      return 54900; // Special subscription price for 1 month (2 packs)
    }

    // One-time purchase
    if (packSize === 2) {
      return 59900; // Bundle price for 2 packs (60 gummies)
    }
    return 34900; // Standard price for 1 pack (30 gummies) after discount
  };
  // Sync quantity for cart submission - always 1 for bundles/subscriptions as requested
  useEffect(() => {
    setQuantity(1);
  }, [packSize, purchaseType, subscriptionDuration]);

  const handleAddToCart = async () => {
    if (!currentVariant) return;

    const attributes: Record<string, string> = {};
    if (purchaseType === 'subscribe') {
      // Find subscription variant if it exists, otherwise use main and add properties
      // Note: In real Shopify, we'd use selling_plan_id
      attributes['subscription'] = subscriptionDuration === '15days' ? '15 Days Supply (1 Jar)' : '1 Month Supply (2 Jars)';
      attributes['_is_subscription'] = 'true';
      attributes['_selling_plan_id'] = subscriptionDuration === '15days' ? '15_day_plan' : '30_day_plan';

      await addToCart(currentVariant.id, 1, attributes);
    } else {
      attributes['purchase_type'] = 'One-time';
      attributes['pack_size'] = packSize === 1 ? '1 Jar' : '2 Jars (Bundle)';

      // For bundle, we use quantity 1 but ensure attributes reflect it's a bundle
      // If there was a specific Variant ID for the 2-pack, we would select it here
      await addToCart(currentVariant.id, 1, attributes);
    }
  };

  if (!shopifyProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-charcoal-500 animate-pulse">Loading product...</p>
      </div>
    );
  }

  const currentPrice = getCurrentPrice();
  const originalPrice = purchaseType === 'onetime'
    ? (packSize === 2 ? 99800 : 49900)
    : (subscriptionDuration === '1month' ? 99800 : 49900);
  const savings = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  return (
    <main className="w-full pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="section-container pt-4 pb-2 lg:pt-6 lg:pb-4">
        <nav className="flex items-center gap-2 text-xs lg:text-sm text-charcoal-500">
          <Link to="/" className="hover:text-sage-700">Home</Link>
          <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
          <Link to="/shop" className="hover:text-sage-700">Shop</Link>
          <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="text-charcoal-900" aria-current="page">{shopifyProduct.title}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="section-container py-6 lg:py-12">
        <div className="product-content grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left - Images */}
          <div className="product-animate flex items-center justify-center">
            <div className="relative">
              <img
                src={shopifyProduct.featured_image || "/images/product_transparent.png"}
                alt={`${shopifyProduct.title} Bottle - Premium KSM-66 Ashwagandha Stress Support Gummies (30 Day Supply)`}
                className="w-64 sm:w-72 lg:w-96 xl:w-[28rem] h-auto drop-shadow-2xl"
                loading="eager"
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
                {shopifyProduct.title}
              </h1>
              <p className="text-base lg:text-lg text-charcoal-600">{shopifyProduct.type}</p>
              <p className="text-sm font-medium text-sage-700 mt-1">Flavor: Mixed Berry</p>
            </div>

            {/* Purchase Type Toggle - Always Visible */}
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

            {/* Content based on selection */}
            {purchaseType === 'onetime' && (
              <div className="space-y-3 animate-fade-in pt-2">
                <p className="text-xs lg:text-sm text-charcoal-500 font-medium">Select Pack Size:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPackSize(1)}
                    className={`relative p-3 lg:p-4 rounded-xl border-2 transition-all text-left ${packSize === 1
                      ? 'border-sage-700 bg-sage-50'
                      : 'border-charcoal-200 hover:border-sage-300'
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${packSize === 1 ? 'border-sage-700' : 'border-charcoal-300'}`}>
                        {packSize === 1 && <div className="w-2 h-2 bg-sage-700 rounded-full" />}
                      </div>
                      <span className="font-semibold text-charcoal-900 text-sm lg:text-base">1 Jar</span>
                    </div>
                    <p className="text-xs text-charcoal-500 mb-2">30-day supply</p>
                    <div className="flex flex-col">
                      <span className="font-bold text-sage-700">{formatPrice(34900)}</span>
                      <span className="text-[10px] text-coral-600 font-medium tracking-tight">After Discount</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setPackSize(2)}
                    className={`relative p-3 lg:p-4 rounded-xl border-2 transition-all text-left ${packSize === 2
                      ? 'border-sage-700 bg-sage-50 shadow-soft-sm'
                      : 'border-charcoal-200 hover:border-sage-300'
                      }`}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border border-amber-200 shadow-sm z-10">
                      Best Value
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${packSize === 2 ? 'border-sage-700' : 'border-charcoal-300'}`}>
                        {packSize === 2 && <div className="w-2 h-2 bg-sage-700 rounded-full" />}
                      </div>
                      <span className="font-semibold text-charcoal-900 text-sm lg:text-base">2 Packs</span>
                    </div>
                    <p className="text-xs text-charcoal-500 mb-2">60 gummies (1 month)</p>
                    <div className="flex flex-col">
                      <span className="font-bold text-sage-700">{formatPrice(59900)}</span>
                      <span className="text-[10px] text-coral-600 font-medium tracking-tight">Save 40% total</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Subscription Options */}
            {purchaseType === 'subscribe' && (
              <div className="space-y-2 lg:space-y-3 animate-fade-in pt-2">
                <p className="text-xs lg:text-sm text-charcoal-500 font-medium">Choose your plan:</p>
                <div className="space-y-2">
                  <button
                    onClick={() => setSubscriptionDuration('15days')}
                    className={`w-full flex items-center justify-between p-3 lg:p-4 rounded-xl border-2 transition-all ${subscriptionDuration === '15days'
                      ? 'border-sage-700 bg-sage-50 shadow-soft-sm'
                      : 'border-charcoal-200 hover:border-sage-300'
                      }`}
                  >
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 flex items-center justify-center ${subscriptionDuration === '15days' ? 'border-sage-700' : 'border-charcoal-300'
                        }`}>
                        {subscriptionDuration === '15days' && <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 bg-sage-700 rounded-full" />}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-charcoal-900 text-sm lg:text-base">15 Days Supply</p>
                        <p className="text-xs text-charcoal-500">30 gummies every 15 days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sage-700 text-sm lg:text-base">{formatPrice(29900)}</p>
                      <p className="text-xs text-coral-600 font-medium tracking-tight">Special Rate</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSubscriptionDuration('1month')}
                    className={`w-full flex items-center justify-between p-3 lg:p-4 rounded-xl border-2 transition-all ${subscriptionDuration === '1month'
                      ? 'border-sage-700 bg-sage-50 shadow-soft-sm'
                      : 'border-charcoal-200 hover:border-sage-300'
                      }`}
                  >
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 flex items-center justify-center ${subscriptionDuration === '1month' ? 'border-sage-700' : 'border-charcoal-300'
                        }`}>
                        {subscriptionDuration === '1month' && <div className="w-2 lg:w-2.5 h-2 lg:h-2.5 bg-sage-700 rounded-full" />}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-charcoal-900 text-sm lg:text-base">1 Month Supply</p>
                        <p className="text-xs text-charcoal-500">60 gummies monthly</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sage-700 text-sm lg:text-base">{formatPrice(54900)}</p>
                      <p className="text-xs text-coral-600 font-medium tracking-tight">Max Saving</p>
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
              {originalPrice && (
                <>
                  <span className="text-lg lg:text-xl text-charcoal-400 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                  <span className="px-2 py-1 bg-coral-100 text-coral-700 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-wider">
                    Save {savings}%
                  </span>
                </>
              )}
            </div>

            {/* Supply Info */}
            <div className="flex items-center gap-3 lg:gap-4 text-xs lg:text-sm text-charcoal-600 flex-wrap">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-sage-50 rounded-lg text-sage-700 font-medium">
                <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                {(purchaseType === 'onetime' && packSize === 2) || (purchaseType === 'subscribe' && subscriptionDuration === '1month') ? '30-Day Supply' : '15-Day Supply'}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sage-700 font-bold" />
                2 Gummies daily
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
                disabled={!currentVariant || !currentVariant.available}
                className="w-full bg-sage-700 hover:bg-sage-800 text-white font-semibold py-3.5 lg:py-4 rounded-full transition-all duration-300 hover:scale-[1.02] text-sm lg:text-base min-h-[52px] lg:min-h-[56px] disabled:bg-charcoal-200"
              >
                {!currentVariant?.available ? 'Out of Stock' : (purchaseType === 'subscribe' ? 'Subscribe Now' : 'Add to Cart')}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 lg:gap-4 text-xs text-charcoal-500">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                Free shipping on all orders
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sage-600" />
                30-day guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sage-600" />
                ISO 9001 Certified
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

      {/* Product Details Tabs - Mostly static content from Shopify would go here, currently using snippets from data/products.ts */}
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
              {/* Fallback to static data as Shopify product body is usually HTML, but the UI expects an array */}
              {["Supports a healthy stress response", "Promotes relaxation and calm", "Helps maintain daily balance", "Supports mood and well-being", "Enhanced absorption with BioPerine®"].map((benefit, idx) => (
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
              {[
                { name: 'Ashwagandha (KSM-66®)', amount: '150 mg', dailyAmount: '300 mg', description: 'Full-spectrum root extract supports stress response and promotes calm' },
                { name: 'Vitamin D2', amount: '200 IU', dailyAmount: '400 IU', description: 'Supports mood balance and healthy immune function' },
                { name: 'BioPerine® (Black Pepper Extract)', amount: '5 mg', dailyAmount: '10 mg', description: 'Enhances nutrient absorption by up to 30%' }
              ].map((ingredient, idx) => (
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
      <MobileStickyBar productName={shopifyProduct.title} variantId={currentVariant?.id} quantity={quantity} />
    </main>
  );
}
