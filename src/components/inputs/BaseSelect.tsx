import { ChevronDown, X } from '@tamagui/lucide-icons'
import { FC, useCallback } from 'react'
import { Adapt, Button, Select, Sheet, Text, XStack, YStack } from 'tamagui'

type Option = {
    id: string | number
    label: string
}

type Props = {
    value: string
    error?: string
    options?: Option[]
    isLoading?: boolean
    isError?: boolean
    placeholder?: string
    onChange: (value: string) => void
    onLoadMore?: () => void
    hasMore?: boolean
    isLoadingMore?: boolean
}

const BaseSelect: FC<Props> = ({
    value,
    onChange,
    error,
    options = [],
    isLoading,
    isError,
    placeholder = "Select...",
    onLoadMore,
    hasMore,
    isLoadingMore
}) => {
    const handleScroll = useCallback(
        (event: any) => {
            if (!onLoadMore) return

            const { scrollTop, scrollHeight, clientHeight } = event.currentTarget
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 50

            if (isNearBottom && hasMore && !isLoadingMore) onLoadMore()
        },
        [onLoadMore, hasMore, isLoadingMore],
    )

    return (
        <YStack width="100%" gap={4}>
            <XStack justifyContent="space-between" alignItems="center" width="100%">
                <Select value={value} onValueChange={onChange}>
                    <Select.Trigger
                        height={45}
                        iconAfter={ChevronDown}
                        width={value ? '85%' : '100%'}
                        borderColor={error ? '$red10' : '$borderColor'}
                    >
                        <Select.Value placeholder={placeholder} />
                    </Select.Trigger>

                    <Adapt when="sm" platform="touch">
                        <Sheet modal dismissOnSnapToBottom snapPoints={[40]}>
                            <Sheet.Frame paddingVertical={10}>
                                <Sheet.ScrollView onScroll={handleScroll}>
                                    <Adapt.Contents />
                                </Sheet.ScrollView>
                            </Sheet.Frame>
                            <Sheet.Overlay />
                        </Sheet>
                    </Adapt>

                    <Select.Content>
                        <Select.Viewport>
                            <Text alignSelf='center' fontSize={20} fontWeight='bold' paddingBottom={10}>{placeholder}</Text>
                            <Select.Group>
                                {options.map((option, index) => (
                                    <Select.Item
                                        index={index}
                                        key={option.id}
                                        value={option.id.toString()}
                                    >
                                        <Select.ItemText>
                                            {option.label}
                                        </Select.ItemText>
                                    </Select.Item>
                                ))}
                            </Select.Group>
                            {isLoading && <Text>Loading...</Text>}
                            {isError && <Text>Error loading data</Text>}
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
            {error && <Text color="$red10">{error}</Text>}
        </YStack>
    )
}

export default BaseSelect
