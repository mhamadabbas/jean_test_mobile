import { ChevronDown, Cross, X } from '@tamagui/lucide-icons'
import { useCustomersQuery } from 'hooks/api'
import { FC, useCallback } from 'react'
import { Adapt, Button, Select, Sheet, Text, XStack } from 'tamagui'

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
        <XStack justifyContent="space-between" alignItems="center" width="100%">
            <Select id="customer" value={value} onValueChange={onChange}>
                <Select.Trigger
                    height={45}
                    iconAfter={ChevronDown}
                    width={value ? '85%' : '100%'}
                    borderColor={error ? '$red10' : '$borderColor'}
                >
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
            {!!value && (
                <Button width={45} height={45} onPress={() => onChange('')}>
                    <X size={24} />
                </Button>
            )}
        </XStack>
    )
}

export default CustomerSelect
