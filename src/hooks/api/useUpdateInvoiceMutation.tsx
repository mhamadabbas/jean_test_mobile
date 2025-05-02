import { Paths } from "@/api/generated/client";
import { useApi } from "@/api/index";
import { MUTATION_KEYS, QUERY_KEYS } from "@/constants/index";
import { NewInvoiceFormData } from "@/screens/NewInvoice.screen";
import { Invoice } from "@/types/invoice.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isSameDate } from "utils/date";
import { isSameLines } from "utils/invoice";

export const useUpdateInvoiceMutation = () => {
    const apiClient = useApi();
    const queryClient = useQueryClient();

    const handleUpdateInvoice = (invoice: Invoice, newInvoice: Partial<NewInvoiceFormData>) => {
        const body: Paths.PutInvoice.RequestBody = { invoice: { id: invoice.id } };

        if (!body.invoice) throw new Error('Invoice body is undefined');

        if (newInvoice.paid) body.invoice.paid = newInvoice.paid;

        if (newInvoice.finalized) body.invoice.finalized = newInvoice.finalized;

        if (!isSameDate(newInvoice.date, invoice.date)) body.invoice.date = invoice.date;

        if (!isSameDate(newInvoice.deadline, invoice.deadline)) body.invoice.deadline = invoice.deadline;

        if (newInvoice.customerId && newInvoice.customerId !== invoice.customer_id?.toString())
            body.invoice.customer_id = parseInt(newInvoice.customerId);

        if (newInvoice.invoiceLines && !isSameLines(newInvoice.invoiceLines, invoice.invoice_lines))
            body.invoice.invoice_lines_attributes = newInvoice.invoiceLines.map((invoiceLine) => ({
                quantity: invoiceLine.quantity,
                unit: invoiceLine.product.unit,
                label: invoiceLine.product.label,
                product_id: invoiceLine.product.id,
                price: invoiceLine.product.unit_price,
                vat_rate: invoiceLine.product.vat_rate,
                tax: invoiceLine.quantity * +invoiceLine.product.unit_tax,
            }));

        return apiClient.putInvoice(invoice.id.toString(), body)
    }

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [MUTATION_KEYS.UPDATE_INVOICE],
        mutationFn: (data: { invoice: Invoice, newInvoice: Partial<NewInvoiceFormData> }) => handleUpdateInvoice(data.invoice, data.newInvoice),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: [QUERY_KEYS.INVOICES] });
            queryClient.refetchQueries({ queryKey: [QUERY_KEYS.INVOICE_BY_ID] });
        },
        onError: (error) => console.log(error),
    })

    return { updateInvoice: mutateAsync, isPending }
}