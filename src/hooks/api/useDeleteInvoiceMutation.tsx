import { Paths } from "@/api/generated/client";
import { useApi } from "@/api/index";
import { MUTATION_KEYS, QUERY_KEYS } from "@/constants/index";
import { NewInvoiceFormData } from "@/screens/NewInvoice.screen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDateForServer } from "utils/date";

export const useDeleteInvoiceMutation = (id: number) => {
    const apiClient = useApi();
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: () => apiClient.deleteInvoice(id),
        mutationKey: [MUTATION_KEYS.DELETE_INVOICE],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVOICES] })
        },
        onError: (error) => {
            console.log(error);
        }
    })

    return { deleteInvoice: mutateAsync, isPending }
}