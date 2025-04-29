import { Invoice, InvoiceStatus } from "@/types/index";

export const getInvoiceStatus = (invoice: Invoice): InvoiceStatus => {
    if (invoice.finalized) {
        return InvoiceStatus.FINALIZED
    } else if (invoice.paid) {
        return InvoiceStatus.PAID
    } else {
        return InvoiceStatus.PENDING
    }
}