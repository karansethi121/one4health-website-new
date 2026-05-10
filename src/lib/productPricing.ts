export const MAIN_PRODUCT_HANDLE = 'ashwagandha-gummies-ksm66';
export const MAIN_PRODUCT_TITLE = 'Ashwagandha Gummies';

export type PackSize = 1 | 2;

type PackConfig = {
  jars: PackSize;
  totalPrice: number;
  originalTotalPrice: number;
  unitPrice: number;
  optionLabel: string;
  supplyLabel: string;
  durationLabel: string;
};

const PACK_CONFIG: Record<PackSize, PackConfig> = {
  1: {
    jars: 1,
    totalPrice: 36900,
    originalTotalPrice: 44900,
    unitPrice: 36900,
    optionLabel: '1 Jar',
    supplyLabel: '15-day supply',
    durationLabel: '15-Day Supply (1 Jar)',
  },
  2: {
    jars: 2,
    totalPrice: 68900,
    originalTotalPrice: 89800,
    unitPrice: 34450,
    optionLabel: '2 Jars',
    supplyLabel: '30-day supply',
    durationLabel: '30-Day Supply (2 Jars)',
  },
};

export function getPackConfig(packSize: PackSize) {
  return PACK_CONFIG[packSize];
}

export function isMainProductTitle(title: string) {
  return title.toLowerCase().includes('ashwagandha');
}

export function getMainProductCartPricing(quantity: number, isBundle: boolean) {
  if (isBundle) {
    const bundlesCount = Math.max(1, Math.floor(quantity / 2));
    const restCount = quantity % 2;
    const bundle = getPackConfig(2);
    const single = getPackConfig(1);

    return {
      price: bundle.unitPrice,
      originalPrice: single.originalTotalPrice,
      finalPrice: bundle.unitPrice,
      linePrice: (bundle.totalPrice * bundlesCount) + (single.totalPrice * restCount),
      finalLinePrice: (bundle.totalPrice * bundlesCount) + (single.totalPrice * restCount),
      originalLinePrice: (bundle.originalTotalPrice * bundlesCount) + (single.originalTotalPrice * restCount),
    };
  }

  const single = getPackConfig(1);
  return {
    price: single.unitPrice,
    originalPrice: single.originalTotalPrice,
    finalPrice: single.unitPrice,
    linePrice: single.totalPrice * quantity,
    finalLinePrice: single.totalPrice * quantity,
    originalLinePrice: single.originalTotalPrice * quantity,
  };
}

export function getSavingsPercent(currentPrice: number, originalPrice: number) {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}
