import { Paths } from "@/api/generated/client";
import { useApi } from "@/api/index";
import { MUTATION_KEYS, QUERY_KEYS } from "@/constants/index";
import { NewInvoiceFormData } from "@/screens/NewInvoice.screen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDateForServer } from "utils/date";

export const useCreateInvoiceMutation = () => {
    const apiClient = useApi();
    const queryClient = useQueryClient();

    const handlePostInvoice = (invoice: NewInvoiceFormData) => {
        const body: Paths.PostInvoices.RequestBody = {
            invoice: {
                paid: false,
                finalized: false,
                customer_id: +invoice.customerId,
                date: formatDateForServer(invoice.date),
                deadline: formatDateForServer(invoice.deadline),
                invoice_lines_attributes: invoice.invoiceLines.map((invoiceLine) => ({
                    product_id: invoiceLine.product.id,
                    quantity: invoiceLine.quantity,
                    label: invoiceLine.product.label,
                    unit: invoiceLine.product.unit,
                    vat_rate: invoiceLine.product.vat_rate,
                    price: invoiceLine.product.unit_price,
                    tax: invoiceLine.quantity * +invoiceLine.product.unit_tax,
                })),
            }
        }

        return apiClient.postInvoices({}, body)
    }

    const { mutateAsync, isPending } = useMutation({
        mutationFn: handlePostInvoice,
        mutationKey: [MUTATION_KEYS.CREATE_INVOICE],
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVOICES] }),
        onError: (error) => console.log(error),
    })

    return { createInvoice: mutateAsync, isPending }
}