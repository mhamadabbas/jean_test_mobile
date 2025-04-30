import { X } from '@tamagui/lucide-icons'
import { useCustomersQuery } from 'hooks/api'
import { FC, useCallback, useMemo } from 'react'
import { Button, Text, XStack } from 'tamagui'
import BaseSelect from './BaseSelect'

type Props = {
    value: string
    error?: string
    onChange: (value: string) => void
}

const CustomerSelect: FC<Props> = ({ value, onChange, error }) => {
    const {
        customers,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useCustomersQuery();

    const items = useMemo(() => {
        return customers?.map((customer) => ({
            id: customer.id.toString(),
            label: `${customer.first_name} ${customer.last_name}`
        })) || []
    }, [customers]);

    return (
        <BaseSelect
            error={error}
            value={value}
            options={items}
            isError={isError}
            onChange={onChange}
            isLoading={isLoading}
            hasMore={hasNextPage}
            onLoadMore={fetchNextPage}
            isLoadingMore={isFetchingNextPage}
            placeholder="Select Customer..."
        />
    )
}

export default CustomerSelect
