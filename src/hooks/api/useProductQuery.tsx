import { useInfiniteQuery } from "@tanstack/react-query";

import { useApi } from "@/api/index";
import { QUERY_KEYS } from "@/constants/index";

export const useProductsQuery = () => {
    const apiClient = useApi();

    const { data: products, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: [QUERY_KEYS.PRODUCTS],
        queryFn: ({ pageParam }) => apiClient.getSearchProducts({ page: pageParam, per_page: 50, query: '' }),

        getNextPageParam: (lastPage) => lastPage.data.pagination.page + 1,
        select: (data) => data.pages.flatMap((page) => page.data.products),
    })

    return { products, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
}