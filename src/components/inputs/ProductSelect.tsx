import { useProductsQuery } from 'hooks/api'
import { FC, useMemo } from 'react'
import BaseSelect from './BaseSelect'
import { Product } from '@/types/product.type'
type Props = {
    value: string
    error?: string
    onChange: (product: Product) => void
    productIdToHide?: string[];
}

const ProductSelect: FC<Props> = ({ value, onChange, error, productIdToHide }) => {
    const {
        products,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useProductsQuery();

    const items = useMemo(() => {
        return products?.filter((product) => !productIdToHide?.includes(product.id.toString()))
            .map((product) => ({
                id: product.id.toString(),
                label: product.label
            })) || []
    }, [products, productIdToHide]);

    const handleChange = (productId: string) => {
        const product = products?.find((product) => product.id.toString() === productId);
        if (product && !productIdToHide?.includes(product.id.toString())) onChange(product);
    }

    return (
        <BaseSelect
            error={error}
            value={value}
            options={items}
            isError={isError}
            isLoading={isLoading}
            hasMore={hasNextPage}
            onChange={handleChange}
            onLoadMore={fetchNextPage}
            placeholder="Select Product..."
            isLoadingMore={isFetchingNextPage}
        />
    )
}

export default ProductSelect;
