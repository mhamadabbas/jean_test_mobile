import { Invoice } from "@/types/index";
import { Product } from "@/types/product.type";

const product1Mock: Product = {
    id: 1,
    label: 'Product 1',
    vat_rate: '10',
    unit: 'piece',
    unit_price: '100',
    unit_price_without_tax: '100',
    unit_tax: '10',
}

const product2Mock: Product = {
    id: 2,
    label: 'Product 2',
    vat_rate: '10',
    unit: 'piece',
    unit_price: '200',
    unit_price_without_tax: '200',
    unit_tax: '20',
}

export const invoiceMock: Invoice = {
    id: 1,
    customer_id: 3,
    finalized: false,
    paid: false,
    date: '2021-01-01',
    deadline: '2021-01-02',
    total: '100',
    tax: '10',
    invoice_lines: [
        {
            id: 1,
            invoice_id: 1,
            product_id: 1,
            quantity: 5,
            label: 'Product 1',
            unit: 'piece',
            vat_rate: '10',
            price: '100',
            tax: '10',
            product: product1Mock,
        },
        {
            id: 2,
            invoice_id: 1,
            product_id: 2,
            quantity: 10,
            label: 'Product 2',
            unit: 'piece',
            vat_rate: '10',
            price: '200',
            tax: '20',
            product: product2Mock,
        },
    ],
} as const;
