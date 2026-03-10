import { describe, it, expect, beforeEach, vi } from 'vitest';
import { injectMockShopifyDataIfNeeded } from './mockShopifyData';

describe('mockShopifyData', () => {
    beforeEach(() => {
        // Clear global window.ShopifyData before each test
        delete (window as any).ShopifyData;
        vi.stubGlobal('console', { info: vi.fn(), log: vi.fn() });
    });

    it('should inject mock data if window.ShopifyData is missing', () => {
        injectMockShopifyDataIfNeeded();

        expect((window as any).ShopifyData).toBeDefined();
        expect((window as any).ShopifyData.product.title).toBe('Ashwagandha Gummies');
        expect((window as any).ShopifyData.all_products['ashwagandha-gummies-ksm66']).toBeDefined();
    });

    it('should not inject mock data if window.ShopifyData already exists', () => {
        (window as any).ShopifyData = { all_products: { 'existing': {} } };

        injectMockShopifyDataIfNeeded();

        expect((window as any).ShopifyData.all_products['existing']).toBeDefined();
        expect((window as any).ShopifyData.all_products['ashwagandha-gummies-ksm66']).toBeUndefined();
    });

    it('should inject mock data if window.ShopifyData.all_products is empty', () => {
        (window as any).ShopifyData = { all_products: {} };

        injectMockShopifyDataIfNeeded();

        expect((window as any).ShopifyData.all_products['ashwagandha-gummies-ksm66']).toBeDefined();
    });
});
