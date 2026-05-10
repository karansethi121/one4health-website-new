import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

// Test component to consume the cart context
const TestComponent = () => {
    const { items, addToCart, removeFromCart, totalItems, totalPrice } = useCart();
    return (
        <div>
            <div data-testid="total-items">{totalItems}</div>
            <div data-testid="total-price">{totalPrice}</div>
            <ul data-testid="cart-items">
                {items.map((item) => (
                    <li key={item.key}>
                        {item.title} - {item.quantity}
                        <button onClick={() => removeFromCart(item.key)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addToCart('ashwagandha-gummies-ksm66', 1)}>Add Ashwagandha</button>
            <button onClick={() => addToCart('ashwagandha-gummies-ksm66', 2)}>Add Two Singles</button>
            <button onClick={() => addToCart('ashwagandha-gummies-ksm66', 2, { _bundle: 'true' }, undefined, 34450, 'Ashwagandha Gummies')}>Add Bundle</button>
        </div>
    );
};

describe('CartContext', () => {
    beforeEach(() => {
        delete (window as any).ShopifyData;
        localStorage.clear();
        vi.stubGlobal('console', { info: vi.fn(), log: vi.fn(), error: vi.fn() });

        // Setup mock data for dev mode tests
        (window as any).ShopifyData = {
            all_products: {
                'ashwagandha-gummies-ksm66': {
                    title: 'Ashwagandha Gummies',
                    variants: [{ id: 'ashwagandha-gummies-ksm66', price: 36900 }],
                },
            },
            cart: { items: [], item_count: 0, total_price: 0 },
            routes: { cart_add_url: '/cart/add.js' }, // Mock routes identify as dev/mock mode
        };
    });

    it('should start with an empty cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        expect(screen.getByTestId('total-items').textContent).toBe('0');
    });

    it('should add an item to the cart in mock mode', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addButton = screen.getByText('Add Ashwagandha');
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(screen.getByTestId('total-items').textContent).toBe('1');
        });

        expect(screen.getByTestId('cart-items').textContent).toContain('Ashwagandha Gummies - 1');
        expect(screen.getByTestId('total-price').textContent).toBe('36900');
    });

    it('should remove an item from the cart', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('Add Ashwagandha'));

        await waitFor(() => {
            expect(screen.getByTestId('total-items').textContent).toBe('1');
        });

        const removeButton = screen.getByText('Remove');
        fireEvent.click(removeButton);

        await waitFor(() => {
            expect(screen.getByTestId('total-items').textContent).toBe('0');
        });
    });

    it('prices two regular jars as two singles', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('Add Two Singles'));

        await waitFor(() => {
            expect(screen.getByTestId('total-items').textContent).toBe('2');
        });

        expect(screen.getByTestId('total-price').textContent).toBe('73800');
    });

    it('prices explicit bundles using bundle pricing', async () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('Add Bundle'));

        await waitFor(() => {
            expect(screen.getByTestId('total-items').textContent).toBe('2');
        });

        expect(screen.getByTestId('total-price').textContent).toBe('68900');
    });
});
