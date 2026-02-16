import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md bg-sage-50 flex flex-col border-none">
        <SheetHeader className="space-y-2.5 pb-4">
          <SheetTitle className="flex items-center gap-3 text-xl font-heading">
            <span className="text-2xl">🛒</span>
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mb-6 animate-gentle-bounce">
              <span className="text-4xl">🌿</span>
            </div>
            <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-charcoal-500 text-sm mb-8 max-w-xs">
              Add some products to get started on your wellness journey.
            </p>
            <Button onClick={closeCart} className="btn-primary" asChild>
              <a href="/shop">Start Shopping</a>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-white rounded-2xl shadow-soft"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-charcoal-900 text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-charcoal-500 mt-0.5">
                          {item.product.servingSize}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 hover:bg-sage-100 rounded-full transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4 text-charcoal-400" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2 bg-sage-50 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-full transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-sage-700">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-charcoal-200 pt-4 space-y-4">
              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-xs text-charcoal-500">
                <span className="flex items-center gap-1">
                  <span className="text-sm">🚚</span>
                  Free shipping over ₹999
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-sm">🛡️</span>
                  30-day guarantee
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between items-center bg-white rounded-2xl p-4">
                <span className="text-charcoal-600">Subtotal</span>
                <span className="text-xl font-bold text-charcoal-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button className="w-full btn-primary py-4 text-base">
                <span className="text-lg mr-2">✨</span>
                Proceed to Checkout
              </Button>

              <p className="text-xs text-center text-charcoal-500">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
