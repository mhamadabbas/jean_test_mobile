import { InvoiceStatus } from '@/types/invoice.type';
import { describe, it, expect } from '@jest/globals';

import { invoiceMock } from '../__mocks__/invoice.mock';
import { isSameLines, getInvoiceStatus } from 'utils/invoice';


describe('getInvoiceStatus', () => {
    it('should return the status of the invoice', () => {
        const draftInvoice = { ...invoiceMock, finalized: false, paid: false };
        expect(getInvoiceStatus(draftInvoice)).toBe(InvoiceStatus.DRAFT);
    });

    it('should return the status of the invoice', () => {
        const finalizedButNotPaidInvoice = { ...invoiceMock, finalized: true, paid: false };
        expect(getInvoiceStatus(finalizedButNotPaidInvoice)).toBe(InvoiceStatus.PENDING);
    });

    it('should return the status of the invoice', () => {
        const finalizedAndPaidInvoice = { ...invoiceMock, finalized: true, paid: true };
        expect(getInvoiceStatus(finalizedAndPaidInvoice)).toBe(InvoiceStatus.PAID);
    });
});

describe('isSameLines', () => {
    it('should return true if the lines are the same', () => {
        const invoiceLines1 = invoiceMock.invoice_lines;
        const invoiceLines2 = invoiceMock.invoice_lines.map(line => ({ ...line }));
        expect(isSameLines(invoiceLines1, invoiceLines2)).toBe(true);
    });

    it('should return false if the lines are different', () => {
        const invoiceLines1 = invoiceMock.invoice_lines;
        const invoiceLines2 = invoiceMock.invoice_lines.map(line => ({ ...line, quantity: 10 }));
        expect(isSameLines(invoiceLines1, invoiceLines2)).toBe(false);
    });

    it('should return false if one of the lines is undefined', () => {
        const invoiceLines1 = invoiceMock.invoice_lines;
        expect(isSameLines(invoiceLines1, undefined)).toBe(false);
    });
});
