import { useQuery } from "@tanstack/react-query";

import { useApi } from "@/api/index";
import { QUERY_KEYS } from "@/constants/index";

export const useInvoiceByIdQuery = (id?: string) => {
    const apiClient = useApi();

    const { data: invoice, isLoading, isError, refetch } = useQuery({
        enabled: !!id,
        select: ({ data }) => data,
        queryFn: () => apiClient.getInvoice(id!),
        queryKey: [QUERY_KEYS.INVOICE_BY_ID, { id }],
    })

    return { invoice, isLoading, isError, refetch };
}