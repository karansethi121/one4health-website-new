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
  Sparkles,
} from 'lucide-react';
import { useOrders, type Order } from '@/hooks/useOrders';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

// ─── Status Helpers ──────────────────────────────────────────────────────────

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  paid: { label: 'Paid', color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: CheckCircle2 },
  authorized: { label: 'Authorized', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: CreditCard },
  pending: { label: 'Pending', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: Clock },
  refunded: { label: 'Refunded', color: 'text-red-700', bg: 'bg-red-50 border-red-200', icon: AlertCircle },
  voided: { label: 'Voided', color: 'text-charcoal-500', bg: 'bg-charcoal-50 border-charcoal-200', icon: AlertCircle },
};

const fulfillmentConfig: Record<string, { label: string; color: string; bg: string; icon: typeof Truck }> = {
  fulfilled: { label: 'Shipped', color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: CheckCircle2 },
  partial: { label: 'Partially Shipped', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: CircleDot },
  unfulfilled: { label: 'Processing', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: Package },
  null: { label: 'Processing', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: Package },
};

function getStatusBadge(status: string, type: 'financial' | 'fulfillment') {
  const config = type === 'financial'
    ? statusConfig[status] || statusConfig['pending']
    : fulfillmentConfig[status || 'null'] || fulfillmentConfig['unfulfilled'];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${config.bg} ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatPrice(price: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

// ─── Shipment Progress ──────────────────────────────────────────────────────

function ShipmentProgress({ fulfillmentStatus }: { fulfillmentStatus: string }) {
  const steps = [
    { label: 'Order Placed', key: 'placed' },
    { label: 'Processing', key: 'processing' },
    { label: 'Shipped', key: 'shipped' },
    { label: 'Delivered', key: 'delivered' },
  ];

  const getActiveStep = () => {
    switch (fulfillmentStatus) {
      case 'fulfilled': return 2;
      case 'partial': return 1;
      default: return 1; // unfulfilled = processing
    }
  };

  const activeStep = getActiveStep();

  return (
    <div className="flex items-center justify-between relative">
      {/* Progress Line */}
      <div className="absolute top-4 left-6 right-6 h-0.5 bg-charcoal-100" />
      <div
        className="absolute top-4 left-6 h-0.5 bg-sage-600 transition-all duration-700"
        style={{ width: `${(activeStep / (steps.length - 1)) * 100}%`, maxWidth: 'calc(100% - 3rem)' }}
      />

      {steps.map((step, i) => (
        <div key={step.key} className="flex flex-col items-center relative z-10">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
              i <= activeStep
                ? 'bg-sage-600 text-white shadow-md'
                : 'bg-white border-2 border-charcoal-200 text-charcoal-400'
            }`}
          >
            {i < activeStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider mt-2 ${
            i <= activeStep ? 'text-sage-700' : 'text-charcoal-400'
          }`}>
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Order Detail View ──────────────────────────────────────────────────────

function OrderDetail({ order, onBack }: { order: Order; onBack: () => void }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sage-700 hover:text-sage-800 font-semibold transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to lookup
      </button>

      {/* Order Header */}
      <div className="bg-white rounded-[32px] p-8 lg:p-10 shadow-soft border border-sage-100">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-sage-600" />
              <h2 className="text-2xl font-heading font-bold text-charcoal-900">
                Order #{order.order_number}
              </h2>
            </div>
            <p className="text-charcoal-500 text-sm">
              Placed on {formatDate(order.created_at)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {getStatusBadge(order.financial_status, 'financial')}
            {getStatusBadge(order.fulfillment_status, 'fulfillment')}
          </div>
        </div>

        {/* Shipment Progress */}
        <div className="bg-sage-50/50 rounded-2xl p-6 border border-sage-100">
          <ShipmentProgress fulfillmentStatus={order.fulfillment_status} />
        </div>
      </div>

      {/* Tracking & Delivery Info */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Estimated Delivery */}
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-sage-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-sage-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-sage-600" />
            </div>
            <h3 className="font-bold text-charcoal-900">Estimated Delivery</h3>
          </div>
          <p className="text-charcoal-600 text-lg font-semibold">
            {order.estimated_delivery || '5-7 business days'}
          </p>
        </div>

        {/* Tracking */}
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-sage-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-sage-50 rounded-xl flex items-center justify-center">
              <Truck className="w-5 h-5 text-sage-600" />
            </div>
            <h3 className="font-bold text-charcoal-900">Tracking</h3>
          </div>
          {order.tracking_number ? (
            <div className="space-y-2">
              <p className="text-charcoal-600">
                <span className="text-charcoal-400 text-sm">Carrier:</span>{' '}
                <span className="font-semibold">{order.tracking_company || 'Courier'}</span>
              </p>
              <p className="text-charcoal-600">
                <span className="text-charcoal-400 text-sm">Tracking #:</span>{' '}
                <span className="font-mono font-semibold">{order.tracking_number}</span>
              </p>
              {order.tracking_url && (
                <a
                  href={order.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-sage-700 text-white rounded-xl font-bold text-sm hover:bg-sage-800 transition-all mt-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Track Shipment
                </a>
              )}
            </div>
          ) : (
            <p className="text-charcoal-500 italic">
              Tracking information will appear here once your order ships.
            </p>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-[32px] p-8 lg:p-10 shadow-soft border border-sage-100">
        <h3 className="text-lg font-bold text-charcoal-900 mb-6 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-sage-600" />
          Items Ordered
        </h3>
        <div className="space-y-4">
          {order.order_items?.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-sage-50/50 rounded-2xl border border-sage-100 hover:shadow-soft-sm transition-all"
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <div className="w-20 h-20 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Package className="w-8 h-8 text-sage-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-charcoal-900 mb-0.5">{item.title}</h4>
                {item.variant_title && item.variant_title !== 'Default Title' && (
                  <p className="text-xs text-charcoal-500">{item.variant_title}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-charcoal-500">
                    Qty: <span className="font-semibold text-charcoal-700">{item.quantity}</span>
                  </span>
                  <span className="font-bold text-sage-700">
                    {formatPrice(item.price * item.quantity, order.currency)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Total */}
        <div className="mt-6 pt-6 border-t border-sage-100">
          <div className="flex justify-between items-center">
            <span className="text-charcoal-500 font-medium">Subtotal</span>
            <span className="font-semibold text-charcoal-700">
              {formatPrice(order.subtotal_price, order.currency)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-charcoal-500 font-medium">Shipping</span>
            <span className="text-sage-600 font-semibold text-sm">FREE</span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-sage-100">
            <span className="text-lg font-bold text-charcoal-900">Total</span>
            <span className="text-2xl font-bold text-charcoal-900">
              {formatPrice(order.total_price, order.currency)}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      {order.shipping_address && (
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-sage-100">
          <h3 className="text-lg font-bold text-charcoal-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sage-600" />
            Shipping Address
          </h3>
          <div className="text-charcoal-600 leading-relaxed">
            <p className="font-semibold text-charcoal-900">
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
              <p className="mt-2 text-sm text-charcoal-500">📞 {order.shipping_address.phone}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export function AccountPage() {
  useDocumentTitle('My Orders | One4Health™');

  const { selectedOrder, loading, error, lookupOrder, setSelectedOrder, reset } = useOrders();
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [formError, setFormError] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email.trim()) {
      setFormError('Please enter your email address.');
      return;
    }
    if (!orderNumber.trim()) {
      setFormError('Please enter your order number.');
      return;
    }

    await lookupOrder(email, orderNumber);
  };

  const handleBack = () => {
    reset();
    setSelectedOrder(null);
  };

  // Show order detail if an order is selected
  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-sage-50 pt-24 lg:pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrderDetail order={selectedOrder} onBack={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sage-50 pt-24 lg:pt-32 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-8 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-sage-100 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-sage-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-sage-700">Order Tracking</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-charcoal-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-charcoal-500 text-lg max-w-md mx-auto">
            Enter your email and order number to view your order details and tracking information.
          </p>
        </div>

        {/* Lookup Form */}
        <div className="bg-white rounded-[32px] p-8 lg:p-10 shadow-soft border border-sage-100">
          <form onSubmit={handleLookup} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="account-email" className="block text-sm font-bold text-charcoal-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  id="account-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 bg-sage-50 border border-sage-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-300 transition-all text-charcoal-900 placeholder:text-charcoal-400"
                  autoFocus
                />
              </div>
            </div>

            {/* Order Number Input */}
            <div>
              <label htmlFor="account-order" className="block text-sm font-bold text-charcoal-700 mb-2">
                Order Number
              </label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                <input
                  id="account-order"
                  type="text"
                  placeholder="e.g. 1001"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 bg-sage-50 border border-sage-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-300 transition-all text-charcoal-900 placeholder:text-charcoal-400"
                />
              </div>
            </div>

            {/* Error Messages */}
            {(formError || error) && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm font-medium">{formError || error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sage-700 hover:bg-sage-800 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              {loading ? 'Looking up...' : 'Find My Order'}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-sage-100 text-center">
            <p className="text-charcoal-400 text-sm">
              You can find your order number in the confirmation email you received after checkout.
            </p>
            <p className="text-charcoal-400 text-sm mt-2">
              Need help?{' '}
              <a href="/contact" className="text-sage-700 font-semibold hover:text-sage-800 transition-colors underline underline-offset-2">
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-10">
          {[
            { icon: Package, label: 'Order Details' },
            { icon: Truck, label: 'Live Tracking' },
            { icon: Clock, label: 'Delivery Estimate' },
          ].map((feature) => (
            <div
              key={feature.label}
              className="bg-white rounded-2xl p-5 shadow-soft-sm border border-sage-100 text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5"
            >
              <feature.icon className="w-6 h-6 text-sage-600 mx-auto mb-2" />
              <span className="text-[10px] font-bold text-charcoal-500 uppercase tracking-widest">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
