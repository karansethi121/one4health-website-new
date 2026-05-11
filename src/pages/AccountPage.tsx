import { useState } from 'react';
import {
  Package,
  Search,
  ArrowLeft,
  Truck,
  MapPin,
  CreditCard,
  Clock,
  ExternalLink,
  CheckCircle2,
  CircleDot,
  ShoppingBag,
  Hash,
  Mail,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useOrders, type Order } from '@/hooks/useOrders';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const financialStatus: Record<string, { label: string; bg: string; color: string; icon: typeof CheckCircle2 }> = {
  paid:       { label: 'Paid',       bg: '#C7F25C', color: '#0F3D2E', icon: CheckCircle2 },
  authorized: { label: 'Authorized', bg: '#FBF7EC', color: '#0A0A0A', icon: CreditCard   },
  pending:    { label: 'Pending',    bg: '#FFF3CD', color: '#7A4F00', icon: Clock         },
  refunded:   { label: 'Refunded',   bg: '#FFE5E8', color: '#C0001A', icon: AlertCircle  },
  voided:     { label: 'Voided',     bg: '#F0EDE6', color: '#0A0A0A', icon: AlertCircle  },
};

const fulfillmentStatus: Record<string, { label: string; bg: string; color: string; icon: typeof Truck }> = {
  fulfilled:   { label: 'Shipped',            bg: '#C7F25C', color: '#0F3D2E', icon: CheckCircle2 },
  partial:     { label: 'Partially Shipped',  bg: '#FFF3CD', color: '#7A4F00', icon: CircleDot    },
  unfulfilled: { label: 'Processing',         bg: '#E8F0FF', color: '#1A3A8F', icon: Package      },
  null:        { label: 'Processing',         bg: '#E8F0FF', color: '#1A3A8F', icon: Package      },
};

function StatusBadge({ status, type }: { status: string; type: 'financial' | 'fulfillment' }) {
  const map = type === 'financial' ? financialStatus : fulfillmentStatus;
  const cfg = map[status] || (type === 'financial' ? map['pending'] : map['unfulfilled']);
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill font-bold uppercase"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '9px',
        letterSpacing: '0.1em',
        background: cfg.bg,
        color: cfg.color,
        border: '1.5px solid #0A0A0A',
      }}
    >
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function formatPrice(price: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency, maximumFractionDigits: 0,
  }).format(price);
}

// ─── Shipment Progress ───────────────────────────────────────────────────────

function ShipmentProgress({ fulfillmentStatus: status }: { fulfillmentStatus: string }) {
  const steps = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
  const activeStep = status === 'fulfilled' ? 2 : status === 'partial' ? 1 : 1;

  return (
    <div className="flex items-start justify-between relative pt-2">
      <div
        className="absolute top-5 left-6 right-6 h-0.5"
        style={{ background: 'rgba(10,10,10,0.08)' }}
      />
      <div
        className="absolute top-5 left-6 h-0.5 transition-all duration-700"
        style={{
          width: `${(activeStep / (steps.length - 1)) * 100}%`,
          maxWidth: 'calc(100% - 3rem)',
          background: '#0F3D2E',
        }}
      />
      {steps.map((label, i) => (
        <div key={label} className="flex flex-col items-center relative z-10 gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: i <= activeStep ? '#0F3D2E' : '#F7F1E3',
              border: `1.5px solid ${i <= activeStep ? '#0F3D2E' : 'rgba(10,10,10,0.15)'}`,
            }}
          >
            {i < activeStep
              ? <CheckCircle2 className="w-4 h-4 text-white" />
              : <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: i <= activeStep ? '#C7F25C' : 'rgba(10,10,10,0.35)', fontWeight: 700 }}>{i + 1}</span>
            }
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: i <= activeStep ? '#0F3D2E' : 'rgba(10,10,10,0.35)',
            fontWeight: 700,
            textAlign: 'center',
            maxWidth: '56px',
          }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Order Detail ────────────────────────────────────────────────────────────

function OrderDetail({ order, onBack }: { order: Order; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 group"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '14px', color: '#0F3D2E' }}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to lookup
      </button>

      {/* Order header */}
      <div
        className="p-6 sm:p-8 hover-hard"
        style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '32px' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Package className="w-5 h-5 text-forest" />
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '24px', color: '#0A0A0A', letterSpacing: '-0.025em' }}>
                Order #{order.order_number}
              </h2>
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0A0A0A', opacity: 0.4 }}>
              Placed on {formatDate(order.created_at)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={order.financial_status} type="financial" />
            <StatusBadge status={order.fulfillment_status} type="fulfillment" />
          </div>
        </div>

        {/* Progress */}
        <div className="p-5 sm:p-6" style={{ background: '#F7F1E3', borderRadius: '20px', border: '1.5px solid rgba(10,10,10,0.08)' }}>
          <ShipmentProgress fulfillmentStatus={order.fulfillment_status} />
        </div>
      </div>

      {/* Tracking & delivery */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-6 hover-hard" style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '28px' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-lime flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-forest" />
            </div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '16px', color: '#0A0A0A' }}>
              Estimated Delivery
            </h3>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '17px', color: '#0F3D2E' }}>
            {order.estimated_delivery || '5–7 business days'}
          </p>
        </div>

        <div className="p-6 hover-hard" style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '28px' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-lime flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-forest" />
            </div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '16px', color: '#0A0A0A' }}>
              Tracking
            </h3>
          </div>
          {order.tracking_number ? (
            <div className="space-y-2">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#0A0A0A', opacity: 0.6 }}>
                Carrier: <span style={{ fontWeight: 600, opacity: 1, color: '#0A0A0A' }}>{order.tracking_company || 'Courier'}</span>
              </p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#0A0A0A' }}>
                #{order.tracking_number}
              </p>
              {order.tracking_url && (
                <a
                  href={order.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 btn-ink py-3 px-5 text-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Track Shipment
                </a>
              )}
            </div>
          ) : (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#0A0A0A', opacity: 0.45 }}>
              Tracking will appear once your order ships.
            </p>
          )}
        </div>
      </div>

      {/* Order items */}
      <div className="p-6 sm:p-8 hover-hard" style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '32px' }}>
        <h3 className="flex items-center gap-2 mb-5" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '18px', color: '#0A0A0A' }}>
          <ShoppingBag className="w-5 h-5 text-forest" />
          Items Ordered
        </h3>
        <div className="space-y-3">
          {order.order_items?.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4"
              style={{ background: '#F7F1E3', borderRadius: '20px', border: '1.5px solid rgba(10,10,10,0.06)' }}
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-16 h-16 object-contain flex-shrink-0"
                  style={{ borderRadius: '14px', background: '#FBF7EC' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center flex-shrink-0" style={{ borderRadius: '14px', background: '#C7F25C' }}>
                  <Package className="w-7 h-7 text-forest" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '15px', color: '#0A0A0A' }}>{item.title}</h4>
                {item.variant_title && item.variant_title !== 'Default Title' && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#0A0A0A', opacity: 0.5 }}>{item.variant_title}</p>
                )}
                <div className="flex items-center justify-between mt-1.5">
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#0A0A0A', opacity: 0.4 }}>
                    Qty: <strong style={{ opacity: 1 }}>{item.quantity}</strong>
                  </span>
                  <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '15px', color: '#0F3D2E' }}>
                    {formatPrice(item.price * item.quantity, order.currency)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-6 pt-5" style={{ borderTop: '1.5px solid rgba(10,10,10,0.08)' }}>
          {[
            { label: 'Subtotal', value: formatPrice(order.subtotal_price, order.currency) },
            { label: 'Shipping', value: 'FREE', highlight: true },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center mb-2">
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#0A0A0A', opacity: 0.55 }}>{row.label}</span>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '14px', color: row.highlight ? '#0F3D2E' : '#0A0A0A' }}>{row.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1.5px solid rgba(10,10,10,0.08)' }}>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '18px', color: '#0A0A0A' }}>Total</span>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '22px', color: '#0F3D2E' }}>
              {formatPrice(order.total_price, order.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping address */}
      {order.shipping_address && (
        <div className="p-6 sm:p-8 hover-hard" style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '28px' }}>
          <h3 className="flex items-center gap-2 mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '18px', color: '#0A0A0A' }}>
            <MapPin className="w-5 h-5 text-forest" />
            Shipping Address
          </h3>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#0A0A0A', lineHeight: 1.65, opacity: 0.75 }}>
            <p style={{ fontWeight: 700, opacity: 1 }}>
              {order.shipping_address.first_name} {order.shipping_address.last_name}
            </p>
            <p>{order.shipping_address.address1}</p>
            {order.shipping_address.address2 && <p>{order.shipping_address.address2}</p>}
            <p>
              {order.shipping_address.city}
              {order.shipping_address.province && `, ${order.shipping_address.province}`}
              {order.shipping_address.zip && ` ${order.shipping_address.zip}`}
            </p>
            <p>{order.shipping_address.country}</p>
            {order.shipping_address.phone && (
              <p className="mt-2" style={{ fontSize: '13px' }}>📞 {order.shipping_address.phone}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export function AccountPage() {
  useDocumentTitle('Track Your Order — One4Health™');

  const { selectedOrder, loading, error, lookupOrder, setSelectedOrder, reset } = useOrders();
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [formError, setFormError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!email.trim()) { setFormError('Please enter your email address.'); return; }
    if (!orderNumber.trim()) { setFormError('Please enter your order number.'); return; }
    await lookupOrder(email, orderNumber);
  };

  const handleBack = () => {
    reset();
    setSelectedOrder(null);
  };

  if (selectedOrder) {
    return (
      <main className="w-full min-h-screen pt-[72px] lg:pt-[84px] pb-20" style={{ background: '#F7F1E3' }}>
        <div className="section-container pt-8 max-w-3xl mx-auto">
          <OrderDetail order={selectedOrder} onBack={handleBack} />
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen pt-[72px] lg:pt-[84px] pb-20" style={{ background: '#F7F1E3' }}>
      <div className="section-container pt-10 lg:pt-16 max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="eyebrow mb-5 block">Order Tracking</span>
          <h1 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            letterSpacing: '-0.035em',
            fontSize: 'clamp(36px, 6vw, 64px)',
            color: '#0A0A0A',
            lineHeight: 1.0,
            marginBottom: '12px',
          }}>
            Track Your{' '}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#0F3D2E' }}>
              Order.
            </em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: '#0A0A0A', opacity: 0.55, lineHeight: 1.55 }}>
            Enter your email and order number to view your order details and tracking information.
          </p>
        </div>

        {/* Lookup form */}
        <div
          className="p-7 sm:p-10 hover-hard mb-6"
          style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '36px' }}
        >
          <form onSubmit={handleLookup} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="account-email"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', opacity: 0.5, display: 'block', marginBottom: '8px' }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(10,10,10,0.3)' }} />
                <input
                  id="account-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-5 py-4 outline-none transition-all"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px',
                    color: '#0A0A0A',
                    background: '#F7F1E3',
                    border: '1.5px solid rgba(10,10,10,0.12)',
                    borderRadius: '16px',
                  }}
                  autoFocus
                />
              </div>
            </div>

            {/* Order number */}
            <div>
              <label
                htmlFor="account-order"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#0A0A0A', opacity: 0.5, display: 'block', marginBottom: '8px' }}
              >
                Order Number
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(10,10,10,0.3)' }} />
                <input
                  id="account-order"
                  type="text"
                  placeholder="e.g. 1001"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full pl-11 pr-5 py-4 outline-none transition-all"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px',
                    color: '#0A0A0A',
                    background: '#F7F1E3',
                    border: '1.5px solid rgba(10,10,10,0.12)',
                    borderRadius: '16px',
                  }}
                />
              </div>
            </div>

            {/* Error */}
            {(formError || error) && (
              <div className="flex items-start gap-3 p-4" style={{ background: '#FFE5E8', border: '1.5px solid #FF5A6B', borderRadius: '16px' }}>
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C0001A' }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#C0001A' }}>{formError || error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-ink w-full py-4 flex items-center justify-center gap-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? 'Looking up…' : 'Find My Order'}
            </button>
          </form>

          <div className="mt-7 pt-6 text-center" style={{ borderTop: '1.5px solid rgba(10,10,10,0.08)' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#0A0A0A', opacity: 0.45, lineHeight: 1.6 }}>
              Find your order number in the confirmation email you received after checkout.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#0A0A0A', opacity: 0.45, marginTop: '6px' }}>
              Need help?{' '}
              <a href="/contact" style={{ color: '#0F3D2E', fontWeight: 600, textDecoration: 'underline' }}>
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Feature tiles */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Package, label: 'Order Details' },
            { icon: Truck,   label: 'Live Tracking' },
            { icon: Clock,   label: 'Delivery ETA'  },
          ].map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-center gap-2 p-5 hover-hard"
              style={{ background: '#FBF7EC', border: '1.5px solid #0A0A0A', borderRadius: '24px' }}
            >
              <div className="w-9 h-9 rounded-xl bg-lime flex items-center justify-center">
                <f.icon className="w-4 h-4 text-forest" />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0A0A0A', opacity: 0.5, textAlign: 'center' }}>
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
