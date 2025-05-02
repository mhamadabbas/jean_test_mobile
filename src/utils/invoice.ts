import { Invoice, InvoiceLine, InvoiceStatus } from "@/types/index";

/**
 * Get the status of an invoice depending of the paid and finalized status
 *
 * @param invoice - The invoice to get the status of
 * @returns The status of the invoice
 */
export const getInvoiceStatus = (invoice: Invoice): InvoiceStatus => {
    if (invoice.finalized) {
        if (invoice.paid) {
            return InvoiceStatus.PAID;
        } else {
            return InvoiceStatus.PENDING;
        }
    } else {
        return InvoiceStatus.DRAFT;
    }
}

/**
 * Check if two arrays of invoice lines are the same
 * By checking the product id and the quantity
 *
 * @param lines1 - The first array of invoice lines
 * @param lines2 - The second array of invoice lines
 * @returns True if the arrays are the same, false otherwise
 */
export const isSameLines = (lines1?: InvoiceLine[], lines2?: InvoiceLine[]) => {
    if (!lines1 || !lines2) return false;

    return lines1.every((line1, index) => {
        const line2 = lines2[index];
        return line1.product.id === line2.product.id && line1.quantity === line2.quantity;
    });
}