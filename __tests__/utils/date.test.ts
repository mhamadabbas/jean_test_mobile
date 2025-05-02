import { describe, it, expect } from '@jest/globals';

import * as dateUtils from 'utils/date';

const firstOfJanuary2025 = new Date('2025-01-01');

describe('dateUtils -> formatDate', () => {

    it('should return a formatted string for a Date object', () => {
        expect(dateUtils.formatDate(firstOfJanuary2025)).toMatch('January 1, 2025');
    });

    it('should return a formatted string for a string', () => {
        expect(dateUtils.formatDate('2025-01-01')).toMatch('January 1, 2025');
    });
});

describe('dateUtils -> formatDateForServer', () => {
    it('should return a server-compliant formatted string for a Date object', () => {
        expect(dateUtils.formatDateForServer(firstOfJanuary2025)).toMatch('2025-01-01');
    });

    it('should return a server-compliant formatted string for a string', () => {
        expect(dateUtils.formatDateForServer('2025-01-01')).toMatch('2025-01-01');
    });    
});

describe('dateUtils -> isSameDate', () => {
    it('should return true if the dates are the same', () => {
        expect(dateUtils.isSameDate(firstOfJanuary2025, new Date(firstOfJanuary2025))).toBe(true);
    });

    it('should return false if the dates are different', () => {
        const secondOfJanuary2025 = new Date('2025-01-02');
        expect(dateUtils.isSameDate(firstOfJanuary2025, secondOfJanuary2025)).toBe(false);
    });

    it('should return false if one of the dates is null', () => {
        expect(dateUtils.isSameDate(firstOfJanuary2025, null)).toBe(false);
    });

    it('should return false if one of the dates is undefined', () => {
        expect(dateUtils.isSameDate(undefined, firstOfJanuary2025)).toBe(false);
    });


    it('should return false if both of the dates are null', () => {
        expect(dateUtils.isSameDate(null, null)).toBe(false);
    });

    it('should return true even if one of the dates is a string', () => {
        expect(dateUtils.isSameDate(firstOfJanuary2025, '2025-01-01')).toBe(true);
    });
});
