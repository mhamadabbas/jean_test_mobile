import { Paths } from "@/api/generated/client"

export type Invoice = Paths.GetInvoices.Responses.$200['invoices'][number];

export enum InvoiceStatus {
    PAID = 'paid',
    PENDING = 'pending',
    FINALIZED = 'finalized',
}
