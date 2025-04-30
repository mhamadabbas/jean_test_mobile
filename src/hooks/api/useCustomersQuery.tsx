import { useInfiniteQuery } from "@tanstack/react-query";

import { useApi } from "@/api/index";
import { QUERY_KEYS } from "@/constants/index";

export const useCustomersQuery = () => {
    const apiClient = useApi();

    const { data: customers, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: [QUERY_KEYS.CUSTOMERS],
        queryFn: ({ pageParam }) => apiClient.getSearchCustomers({ page: pageParam, per_page: 50, query: '' }),

        getNextPageParam: (lastPage) => lastPage.data.pagination.page + 1,
        select: (data) => data.pages.flatMap((page) => page.data.customers),
    })

    return { customers, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}