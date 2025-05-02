import { describe, it, expect } from '@jest/globals';

import { formatPrice } from 'utils/number';

describe('formatPrice', () => {
    it('should return a formatted price', () => {
        expect(formatPrice(100)).toBe('$100.00');
    });

    it('should return a formatted price with 2 decimal places', () => {
        expect(formatPrice(100.123)).toBe('$100.12');
    });

    it('should return a formatted price even if price is a string', () => {
        expect(formatPrice('100.123')).toBe('$100.12');
    });

    it('should return 0 if the price is null', () => {
        expect(formatPrice(null)).toBe('0');
    });

    it('should return 0 if the price is undefined', () => {
        expect(formatPrice(undefined)).toBe('0');
    });
});