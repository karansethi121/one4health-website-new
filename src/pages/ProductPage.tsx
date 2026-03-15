import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  Clock,
  Moon,
  Sun as SunIcon,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/context/CartContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { useProducts } from '@/hooks/useSupabase';
import { LoadingState } from '@/components/ui/LoadingState';

gsap.registerPlugin(ScrollTrigger);

type PackSize = 1 | 2;

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [packSize, setPackSize] = useState<PackSize>(1);

  const { products, loading: productsLoading } = useProducts();

  // Get dynamic product data from Supabase
  const product = useMemo(() => {
    if (!id) return products[0];
    return products.find(p => p.id === id) || products[0];
  }, [id, products]);

  useDocumentTitle(product?.name || 'Product');

  // Handle initial purchase type from navigation state

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

  const getCurrentPrice = () => {
    // Starting with 499 as original base price for 1 pack of 30 gummies
    // One-time purchase
    if (packSize === 2) {
      return 59900; // Bundle price for 2 packs (60 gummies)
    }
    return 34900; // Standard price for 1 pack (30 gummies) after discount
  };
  // Sync quantity for cart submission - always 1 for bundles as requested
  useEffect(() => {
    setQuantity(1);
  }, [packSize]);

  const handleAddToCart = async () => {
    console.log('[Product] handleAddToCart called with:', { productId: product.id, packSize });
    if (!product) return;

    // Use variant ID logic: if bundle (2 jars), use bundle variant if it exists
    // Force base variant so cart displays individual units
    const isBundle = packSize === 2;
    const variantId = product.shopifyVariantId || product.id;
    
    const attributes: Record<string, string> = {};
    attributes['purchase_type'] = 'One-time';
    
    // Add physical units to cart (e.g. 1 qty of 2 Jars = 2 physical units)
    const cartQuantity = quantity * packSize;
    
    // Calculate per-unit price in paise (59900/2 = 29950, 34900/1 = 34900)
    const pricePaise = isBundle ? 29950 : 34900;

    await addToCart(variantId, cartQuantity, attributes, undefined, pricePaise, product.name);
  };

  if (productsLoading) {
    return <LoadingState fullPage message="Fetching wellness essentials..." />;
  }

  if (!product && !productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sage-50 pt-20">
        <div className="text-center p-8 bg-white rounded-3xl shadow-soft border border-sage-100 max-w-md">
          <h2 className="text-2xl font-bold text-charcoal-900 mb-4">Product Not Found</h2>
          <p className="text-charcoal-500 mb-8">We couldn't find the product you're looking for. It might have been moved or is currently unavailable.</p>
          <a href="/shop" className="btn-primary inline-flex py-4 px-8">Back to Shop</a>
        </div>
      </div>
    );
  }

  const currentPrice = getCurrentPrice();
  const originalPrice = packSize === 2 ? 99800 : 49900;
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
          <span className="text-charcoal-900" aria-current="page">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="section-container py-6 lg:py-12">
        <div className="product-content grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left - Images */}
          <div className="product-animate flex items-center justify-center">
            <div className="relative">
              <img
                src={product.image}
                alt={`${product.name} Bottle - Premium ${product.id.replace(/-/g, ' ')} Stress Support Gummies`}
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
                {product.name}
              </h1>
              <p className="text-base lg:text-lg text-charcoal-600">{product.subtitle}</p>
              <p className="text-sm font-medium text-sage-700 mt-1">Flavor: Mixed Berry</p>
            </div>

            {/* Premium Pack Size Selection */}
            <div className="flex flex-col gap-3 lg:gap-4 mt-2">
               <div className="grid grid-cols-2 gap-2 lg:gap-3 animate-fade-in w-full pb-1">
                  <button
                  onClick={() => setPackSize(1)}
                  className={`flex flex-col justify-center p-4 lg:p-5 rounded-2xl border-2 transition-all bg-white relative translate-y-0 hover:-translate-y-0.5 ${
                    packSize === 1
                      ? 'border-sage-700 bg-sage-50/80 shadow-soft ring-1 ring-sage-700/20'
                      : 'border-charcoal-100 hover:border-sage-300 hover:bg-sage-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-charcoal-900 text-base lg:text-lg">1 Jar</span>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${packSize === 1 ? 'border-sage-700' : 'border-charcoal-300'}`}>
                      {packSize === 1 && <div className="w-2 h-2 bg-sage-700 rounded-full" />}
                    </div>
                  </div>
                  <span className={`text-[11px] lg:text-xs mb-1 lg:mb-1.5 ${packSize === 1 ? 'text-sage-700 font-medium' : 'text-charcoal-500'}`}>30-day supply</span>
                  <span className="font-bold text-sage-700 text-sm lg:text-base">{formatPrice(34900)}</span>
                </button>

                <button
                    onClick={() => setPackSize(2)}
                    className={`flex flex-col justify-center p-4 lg:p-5 rounded-2xl border-2 transition-all bg-white relative translate-y-0 hover:-translate-y-0.5 ${
                      packSize === 2
                        ? 'border-sage-700 bg-sage-50/80 shadow-soft ring-1 ring-sage-700/20'
                        : 'border-charcoal-100 hover:border-sage-300 hover:bg-sage-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-bold text-charcoal-900 text-base lg:text-lg">2 Jars</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${packSize === 2 ? 'border-sage-700' : 'border-charcoal-300'}`}>
                        {packSize === 2 && <div className="w-2 h-2 bg-sage-700 rounded-full" />}
                      </div>
                    </div>
                    <span className={`text-[11px] lg:text-xs mb-1 lg:mb-1.5 ${packSize === 2 ? 'text-sage-700 font-medium' : 'text-charcoal-500'}`}>60-day supply</span>
                    <span className="font-bold text-sage-700 text-sm lg:text-base">{formatPrice(59900)}</span>
                    
                    <div className={`mt-3 w-full text-[9px] sm:text-[10px] uppercase font-bold py-1.5 rounded text-center tracking-widest transition-colors ${
                      packSize === 2 ? 'bg-charcoal-900 text-white' : 'bg-charcoal-100 text-charcoal-600'
                    }`}>
                      Most Popular
                    </div>
                </button>
              </div>
            </div>

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
                {packSize === 2 ? '30-Day Supply (2 Jars)' : '15-Day Supply (1 Jar)'}
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
                disabled={!product.inStock}
                className="w-full bg-sage-700 hover:bg-sage-800 text-white font-semibold py-3.5 lg:py-4 rounded-full transition-all duration-300 hover:scale-[1.02] text-sm lg:text-base min-h-[52px] lg:min-h-[56px] disabled:bg-charcoal-200"
              >
                {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Allergen Free Section */}
            <div className="bg-sage-50/50 border border-sage-100 rounded-xl lg:rounded-2xl p-4 lg:p-5">
              <h3 className="text-[10px] lg:text-xs font-bold text-charcoal-500 mb-4 uppercase tracking-widest">100% Allergen Free</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[
                  { image: '/images/allergen_soy_free.svg', alt: 'Soy Free' },
                  { image: '/images/allergen_nut_free.svg', alt: 'Nut Free' },
                  { image: '/images/allergen_peanut_free.svg', alt: 'Peanut Free' },
                  { image: '/images/allergen_dairy_free.svg', alt: 'Dairy Free' },
                  { image: '/images/allergen_gluten_free.svg', alt: 'Gluten Free' },
                  { image: '/images/allergen_gelatin_free.svg', alt: 'Gelatin Free' },
                ].map((allergen) => (
                  <div key={allergen.alt} className="flex flex-col items-center gap-1.5">
                    <img src={allergen.image} alt={allergen.alt} className="h-10 w-10 lg:h-12 lg:w-12 object-contain" loading="lazy" />
                    <span className="text-[9px] lg:text-[10px] text-charcoal-600 text-center font-medium leading-tight">{allergen.alt}</span>
                  </div>
                ))}
              </div>
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
                      {ingredient.name.includes('Ashwagandha') ? <Leaf className="w-4 h-4 lg:w-5 lg:h-5 text-sage-700" /> :
                        ingredient.name.includes('Vitamin') ? <Sun className="w-4 h-4 lg:w-5 lg:h-5 text-sage-700" /> :
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
              {product.howToUse.length > 0 && product.whoShouldAvoid.length > 0 && (
                <AccordionItem value="additional-info" className="bg-white rounded-xl lg:rounded-2xl mb-2 lg:mb-3 px-4 lg:px-6 border-none shadow-soft-sm">
                  <AccordionTrigger className="text-left font-medium text-charcoal-900 hover:no-underline py-3 lg:py-4 text-sm lg:text-base">
                    Safety & Usage Info
                  </AccordionTrigger>
                  <AccordionContent className="text-charcoal-600 pb-3 lg:pb-4 text-sm">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-charcoal-900 mb-2">Instructions:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {product.howToUse.map((step, i) => <li key={i}>{step}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal-900 mb-2">Who should avoid:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {product.whoShouldAvoid.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </TabsContent>
        </Tabs>
      </section>

      {/* Mobile Sticky Bottom Bar with WhatsApp */}
      <MobileStickyBar 
        productName={product.name} 
        variantId={product.shopifyVariantId || product.id} 
        quantity={quantity * packSize}
        price={packSize === 2 ? 29950 : 34900}
        title={product.name}
      />
    </main>
  );
}
