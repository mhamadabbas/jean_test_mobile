import { Paths } from "@/api/generated/client"
import { ErrorBoundary } from "@/components/templates"
import { useInvoicesQuery } from "@/hooks/api"
import { RootStackParamList } from "@/navigation/App.navigator"
import { Filter, Invoice, InvoiceStatus } from "@/types/index"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { FC, memo, useCallback } from "react"
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Card, Text, XStack, YStack } from "tamagui"
import { ChevronRight } from "@tamagui/lucide-icons"
import { getInvoiceStatus } from "utils/invoice"
import { formatPrice } from "utils/number"

type InvoiceCardProps = {
    status: InvoiceStatus
    invoiceId: number
    customerName: string
    totalAmount: string
}

type Props = {
    filters: Filter[]
}

const InvoiceCard: FC<InvoiceCardProps> = memo(({ status, invoiceId, customerName, totalAmount }) => {
    const { navigate } = useNavigation<NavigationProp<RootStackParamList, 'Invoice'>>();

    const handlePress = () => navigate('Invoice', { id: invoiceId });

    return <Card elevate onPress={handlePress} pressStyle={{ scale: 0.98 }} borderColor="$gray8Light" borderWidth={1}>
        <Card.Header flexDirection="row" alignItems="center" justifyContent="space-between">
            <YStack>
                <XStack width="95%" justifyContent="space-between">
                    <Text>Invoice ID</Text>
                    <Text fontWeight="bold">{invoiceId}</Text>
                </XStack>
                <XStack width="95%" justifyContent="space-between">
                    <Text>Customer</Text>
                    <Text fontWeight="bold">{customerName}</Text>
                </XStack>
                <XStack width="95%" justifyContent="space-between">
                    <Text>Status</Text>
                    <Text fontWeight="bold">{status}</Text>
                </XStack>
            </YStack>
            <ChevronRight />
        </Card.Header>
        <Card.Footer
            padding={16}
            alignItems="center"
            borderBottomLeftRadius={8}
            borderBottomRightRadius={8}
            backgroundColor="$gray4Light"
            justifyContent="space-between"
        >
            <Text>Total amount</Text>
            <Text fontWeight="bold">{totalAmount}</Text>
        </Card.Footer>
    </Card>
})
InvoiceCard.displayName = 'InvoiceCard'

const InvoicesList: FC<Props> = ({ filters }) => {
    const { bottom } = useSafeAreaInsets()
    const { invoices, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInvoicesQuery(filters)

    const handleFetchNextPage = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }

    const renderItem = useCallback<ListRenderItem<Invoice>>(({ item }) => {
        const status = getInvoiceStatus(item);
        const totalAmount = formatPrice(item.total);
        const customerName = `${item.customer?.first_name} ${item.customer?.last_name}`;
        return <InvoiceCard status={status} invoiceId={item.id} customerName={customerName} totalAmount={totalAmount} />
    }, [])

    if (isLoading) return <ActivityIndicator />

    if (isError) return <ErrorBoundary title="Error fetching invoices" />

    if (invoices?.length === 0) return <ErrorBoundary title="No invoices found" />

    return <FlatList
        data={invoices}
        onRefresh={refetch}
        renderItem={renderItem}
        style={styles.container}
        refreshing={isFetchingNextPage}
        onEndReached={handleFetchNextPage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: bottom }]}
    />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    contentContainer: {
        gap: 12,
    }
})

export default InvoicesList;