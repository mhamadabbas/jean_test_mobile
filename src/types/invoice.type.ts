import { Paths } from "@/api/generated/client"
import { Product } from "./product.type";

export type Invoice = Paths.GetInvoices.Responses.$200['invoices'][number];

export type InvoiceLine = { product: Product, quantity: number };

export enum InvoiceStatus {
    PAID = 'paid',
    DRAFT = 'draft',
    PENDING = 'pending',
}
