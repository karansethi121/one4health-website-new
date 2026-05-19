import { describe, expect, it } from 'vitest';
import { getMainProductCartPricing, getPackConfig, getSavingsPercent } from './productPricing';

describe('productPricing', () => {
  it('returns canonical pack configuration for the bundle', () => {
    expect(getPackConfig(2)).toMatchObject({
      jars: 2,
      totalPrice: 69900,
      originalTotalPrice: 89800,
      unitPrice: 34950,
    });
  });

  it('keeps two singles separate from bundle pricing', () => {
    expect(getMainProductCartPricing(2, false).finalLinePrice).toBe(73800);
    expect(getMainProductCartPricing(2, true).finalLinePrice).toBe(69900);
  });

  it('calculates savings percentage from canonical prices', () => {
    expect(getSavingsPercent(69900, 89800)).toBe(22);
  });
});
