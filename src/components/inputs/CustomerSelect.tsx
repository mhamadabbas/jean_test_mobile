import { ChevronDown } from '@tamagui/lucide-icons';
import { useCustomersQuery } from 'hooks/api';
import { FC, useCallback } from 'react';
import { Adapt, Select, Sheet, Text } from 'tamagui';

type Props = {
    value: string;
    error?: string;
    onChange: (value: string) => void;
}

const CustomerSelect: FC<Props> = ({ value, onChange, error }) => {
    const {
        customers,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useCustomersQuery()

    const handleScroll = useCallback(
        (event: any) => {
            const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 50

            if (isNearBottom && hasNextPage && !isFetchingNextPage) fetchNextPage()
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    )

    return (
        <Select id="customer" value={value} onValueChange={onChange}>
            <Select.Trigger iconAfter={ChevronDown} borderColor={error ? '$red10' : '$borderColor'} width="100%" height={45}>
                <Select.Value placeholder="Select Customer..." />
            </Select.Trigger>
            {error && <Text color="$red10">{error}</Text>}

            <Adapt when="sm" platform="touch">
                <Sheet modal dismissOnSnapToBottom snapPoints={[30]}>
                    <Sheet.Frame>
                        <Sheet.ScrollView onScroll={handleScroll}>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay />
                </Sheet>
            </Adapt>

            <Select.Content>
                <Select.Viewport>
                    <Select.Group>
                        {customers?.map((customer, index) => (
                            <Select.Item
                                index={index}
                                key={customer.id}
                                value={customer.id.toString()}
                            >
                                <Select.ItemText>
                                    {customer.first_name} {customer.last_name}
                                </Select.ItemText>
                            </Select.Item>
                        ))}
                    </Select.Group>
                    {isLoading && <Text>Loading...</Text>}
                    {isError && <Text>Error loading customers</Text>}
                </Select.Viewport>
                <Select.ScrollDownButton />
            </Select.Content>
        </Select>
    )
}

export default CustomerSelect
