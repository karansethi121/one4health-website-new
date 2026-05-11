import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  Leaf,
  Beaker,
  Sun,
  Clock,
  Moon,
  ArrowRight,
  Star,
  Shield,
  Truck,
} from 'lucide-react';
import { gsap } from 'gsap';
import { useCart } from '@/context/CartContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { AllergenBar } from '@/components/layout/AllergenBar';
import { useProducts } from '@/hooks/useSupabase';
import { LoadingState } from '@/components/ui/LoadingState';
import { getPackConfig, getSavingsPercent, type PackSize } from '@/lib/productPricing';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatPrice } from '@/lib/format';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, loading: cartLoading } = useCart();
  const quantity = 1;
  const [packSize, setPackSize] = useState<PackSize>(1);
  const [activeImage, setActiveImage] = useState(0);
  const { products, loading: productsLoading } = useProducts();

  const product = useMemo(() => {
    if (!id) return products[0];
    return products.find(p => p.id === id) || products[0];
  }, [id, products]);

  useDocumentTitle(product?.name || 'Product');

  useEffect(() => {
    if (productsLoading || !product) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-animate',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, [productsLoading, product]);

  const selectedPack = getPackConfig(packSize);

  const handleAddToCart = async () => {
    if (!product) return;
    const variantId = product.shopifyVariantId || product.id;
    const cartQuantity = quantity * selectedPack.jars;
    await addToCart(variantId, cartQuantity, { 'purchase_type': 'One-time' }, undefined, selectedPack.unitPrice, product.name);
  };

  if (productsLoading) return <LoadingState fullPage message="Fetching product details..." />;
  if (!product) return (
    <div className="min-h-screen flex items-center justify-center pt-24" style={{ background: '#F7F1E3' }}>
      <div className="text-center p-12 bg-white rounded-[48px] border-2 border-ink shadow-hard max-w-md">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="btn-ink py-4 px-8">Back to Shop</Link>
      </div>
    </div>
  );

  const savings = getSavingsPercent(selectedPack.totalPrice, selectedPack.originalTotalPrice);

  return (
    <main className="w-full pt-[72px] lg:pt-[84px]" style={{ background: '#F7F1E3' }}>

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="section-container pt-5 pb-0">
        <nav
          className="flex items-center gap-2"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          <Link to="/shop" className="text-ink/40 hover:text-ink transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3 text-ink/20" />
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      {/* ── Main Product Section ───────────────────────────────────────── */}
      <section className="section-container py-5 lg:py-14">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-16 items-start">

          {/* ── Left: Image gallery ──────────────────────────────────── */}
          <div className="product-animate">

            {/* Main image — page-matching background, no visible frame */}
            <div
              className="relative w-full aspect-square flex items-center justify-center overflow-hidden rounded-[28px] sm:rounded-[36px]"
              style={{ background: '#F7F1E3' }}
            >
              {/* Subtle lime circle accent */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ width: '62%', height: '62%', background: '#C7F25C', opacity: 0.22 }}
                aria-hidden="true"
              />
              <img
                src={product.images?.[activeImage] || product.image}
                alt={product.name}
                className="relative z-10 w-[80%] h-[80%] object-contain"
                loading="eager"
              />
            </div>

            {/* Thumbnails — no borders, opacity-only selection state */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-200 ${
                      activeImage === idx
                        ? 'opacity-100 scale-100'
                        : 'opacity-35 scale-95 hover:opacity-60 hover:scale-[0.97]'
                    }`}
                    style={{ width: '68px', height: '68px', background: '#F7F1E3' }}
                  >
                    <img src={img} className="w-full h-full object-contain p-1.5" alt={`View ${idx + 1}`} />
                    {activeImage === idx && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-t-full"
                        style={{ background: '#0F3D2E' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Purchase details ───────────────────────────────── */}
          <div className="product-animate flex flex-col">

            {/* Star rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-forest text-forest" />
                ))}
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#0A0A0A',
                opacity: 0.5,
              }}>
                140 Reviews
              </span>
            </div>

            {/* Product name */}
            <h1 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(26px, 5vw, 54px)',
              color: '#0A0A0A',
              lineHeight: 1.0,
              marginBottom: '10px',
            }}>
              {product.name}
            </h1>

            {/* Subtitle */}
            <p className="mb-7" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              lineHeight: 1.55,
              color: '#0A0A0A',
              opacity: 0.55,
            }}>
              {product.subtitle}
            </p>

            {/* Pack selector */}
            <div className="mb-6">
              <span className="block mb-3" style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#0A0A0A',
                opacity: 0.4,
              }}>
                Choose your pack
              </span>
              <div className="grid grid-cols-2 gap-3">
                {([1, 2] as PackSize[]).map((size) => {
                  const config = getPackConfig(size);
                  const isSelected = packSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setPackSize(size)}
                      className={`relative flex flex-col p-5 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-2 border-ink shadow-hard -translate-y-0.5'
                          : 'border-2 border-ink/10 hover:border-ink/25'
                      }`}
                      style={{ borderRadius: '22px', background: '#FBF7EC' }}
                    >
                      {size === 2 && (
                        <span
                          className="absolute -top-3 left-5 px-2.5 py-1 text-forest font-bold uppercase tracking-widest"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '9px',
                            background: '#C7F25C',
                            borderRadius: '999px',
                            border: '1.5px solid #0A0A0A',
                          }}
                        >
                          Best Deal
                        </span>
                      )}
                      <span style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 800,
                        fontSize: '17px',
                        color: '#0A0A0A',
                        marginBottom: '2px',
                      }}>
                        {size} Jar{size > 1 ? 's' : ''}
                      </span>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '12px',
                        color: '#0A0A0A',
                        opacity: 0.5,
                        marginBottom: '10px',
                      }}>
                        {config.supplyLabel}
                      </span>
                      <div className="flex items-baseline gap-2 mt-auto">
                        <span style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontWeight: 800,
                          fontSize: '16px',
                          color: '#0F3D2E',
                        }}>
                          {formatPrice(config.totalPrice)}
                        </span>
                        {config.originalTotalPrice && (
                          <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '12px',
                            color: '#0A0A0A',
                            opacity: 0.25,
                            textDecoration: 'line-through',
                          }}>
                            {formatPrice(config.originalTotalPrice)}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price row */}
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <span style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(24px, 5.5vw, 38px)',
                color: '#0F3D2E',
                letterSpacing: '-0.03em',
              }}>
                {formatPrice(selectedPack.totalPrice)}
              </span>
              {savings > 0 && (
                <span className="px-3 py-1.5 rounded-pill bg-strawberry text-white font-bold uppercase tracking-widest"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }}>
                  Save {savings}%
                </span>
              )}
              <span className="flex items-center gap-1.5" style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#0F3D2E',
                opacity: 0.55,
              }}>
                <Clock className="w-3 h-3" />
                {selectedPack.durationLabel}
              </span>
            </div>

            {/* CTA */}
            <div className="mb-7">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || cartLoading}
                className={`btn-ink py-5 text-base w-full flex items-center justify-center gap-3 ${!product.inStock ? 'opacity-50 grayscale' : ''}`}
              >
                {cartLoading
                  ? '…'
                  : !product.inStock
                  ? 'Out of Stock'
                  : <><span>Add to Cart — {formatPrice(selectedPack.totalPrice)}</span><ArrowRight className="w-4 h-4" /></>
                }
              </button>
              <p className="flex items-center justify-center gap-1.5 mt-2.5" style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#0A0A0A',
                opacity: 0.4,
              }}>
                <Check className="w-3 h-3 text-forest" />
                Free Shipping · 30-Day Guarantee
              </p>
            </div>

            {/* Trust grid */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 pt-6 border-t border-ink/8">
              {[
                { icon: Truck, label: 'Fast India Delivery' },
                { icon: Shield, label: '30-Day Guarantee' },
                { icon: Beaker, label: 'Clinically Studied' },
                { icon: Leaf, label: '100% Vegan' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <t.icon className="w-4 h-4 text-forest flex-shrink-0" />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    color: '#0A0A0A',
                    opacity: 0.55,
                  }}>
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Allergen Bar ─────────────────────────────────────────────── */}
      <AllergenBar />

      {/* ── Product Details Tabs ──────────────────────────────────────── */}
      <section className="section-container py-6 lg:py-20">
        <Tabs defaultValue="benefits" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-ink/10 rounded-none h-auto p-0 mb-8 flex-nowrap overflow-x-auto scrollbar-hide">
            {['Benefits', 'Ingredients', 'How to Use', 'FAQ'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().replace(/\s+/g, '-')}
                className="flex-shrink-0 rounded-none border-b-2 border-transparent data-[state=active]:border-ink data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-4 sm:py-4 sm:px-6 text-ink/40 data-[state=active]:text-ink font-bold uppercase tracking-widest text-[10px] sm:text-[11px]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="benefits" className="mt-0">
            <div className="grid sm:grid-cols-2 gap-4">
              {product.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 flex items-start gap-4 hover-hard"
                  style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '24px' }}
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-lime flex-shrink-0">
                    <Check className="w-4 h-4 text-forest" />
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#0A0A0A',
                    lineHeight: 1.55,
                  }}>
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-0">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {product.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 flex flex-col hover-hard"
                  style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '24px' }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-lime">
                      <Beaker className="w-5 h-5 text-forest" />
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: 800, color: '#0F3D2E' }}>
                      {ing.amount}
                    </span>
                  </div>
                  <h4 style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: '18px',
                    color: '#0A0A0A',
                    marginBottom: '8px',
                  }}>
                    {ing.name}
                  </h4>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '14px',
                    color: '#0A0A0A',
                    opacity: 0.6,
                    lineHeight: 1.6,
                  }}>
                    {ing.description}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="how-to-use" className="mt-0">
            <div
              className="p-6 sm:p-10 lg:p-14"
              style={{
                background: '#0F3D2E',
                border: '1.5px solid #0A0A0A',
                borderRadius: '32px',
                boxShadow: '8px 8px 0 #0A0A0A',
                transform: 'translate(-4px,-4px)',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center">
                <div>
                  <h3 style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(26px, 4vw, 36px)',
                    color: '#F7F1E3',
                    marginBottom: '24px',
                  }}>
                    How to Ritual.
                  </h3>
                  <div className="space-y-7">
                    <div className="flex gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-lime flex items-center justify-center flex-shrink-0">
                        <Sun className="w-5 h-5 text-forest" />
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '17px', color: '#F7F1E3', marginBottom: '4px' }}>
                          Morning Calm
                        </h4>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#F7F1E3', opacity: 0.6, lineHeight: 1.6 }}>
                          Take 1 gummy with breakfast to support calm focus throughout your day.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-butter flex items-center justify-center flex-shrink-0">
                        <Moon className="w-5 h-5 text-ink" />
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '17px', color: '#F7F1E3', marginBottom: '4px' }}>
                          Night Ritual
                        </h4>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#F7F1E3', opacity: 0.6, lineHeight: 1.6 }}>
                          Take 1 gummy 30 mins before bed for optimal relaxation and sleep.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="p-6 sm:p-8"
                  style={{
                    background: 'rgba(247,241,227,0.05)',
                    borderRadius: '24px',
                    border: '1.5px solid rgba(247,241,227,0.1)',
                  }}
                >
                  <h4 style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#C7F25C',
                    marginBottom: '16px',
                  }}>
                    Safety Notes
                  </h4>
                  <ul className="space-y-3">
                    {product.whoShouldAvoid.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-strawberry mt-2 flex-shrink-0" />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#F7F1E3', opacity: 0.7, lineHeight: 1.55 }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-0">
            <div className="max-w-3xl mx-auto py-6 text-center">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: '#0A0A0A', opacity: 0.5 }}>
                Visit our{' '}
                <Link to="/faq" className="text-forest font-bold underline">Full FAQ Page</Link>
                {' '}for common questions about Ashwagandha, dosage, and shipping.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Mobile Sticky Bar */}
      <MobileStickyBar
        productName={product.name}
        variantId={product.shopifyVariantId || product.id}
        quantity={quantity * selectedPack.jars}
        price={selectedPack.unitPrice}
        title={product.name}
      />
    </main>
  );
}
