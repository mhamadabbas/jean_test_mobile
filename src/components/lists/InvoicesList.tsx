import { useInvoicesQuery } from "@/hooks/api"
import { Filter, Invoice } from "@/types/index"
import { FC, useCallback } from "react"
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { getInvoiceStatus } from "utils/invoice"
import { formatPrice } from "utils/number"
import { InvoiceCard } from "../cards"
import { ErrorBoundary } from "../templates"

type Props = {
    filters: Filter[]
}

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