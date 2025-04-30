import { useInfiniteQuery } from "@tanstack/react-query";

import { useApi } from "@/api/index";
import { QUERY_KEYS } from "@/constants/index";
import { Filter } from "@/types/index";

export const useInvoicesQuery = (filter: Filter[]) => {
    const apiClient = useApi();

    const { data: invoices, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: [QUERY_KEYS.INVOICES, { filter }],
        queryFn: ({ pageParam }) => apiClient.getInvoices({ page: pageParam, per_page: 2, filter }),

        select: (data) => data.pages.flatMap((page) => page.data.invoices),
        getNextPageParam: (lastPage) => lastPage.data.pagination.page + 1,
    })

    return { invoices, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}