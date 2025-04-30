import { Invoice, InvoiceStatus } from "@/types/index";

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