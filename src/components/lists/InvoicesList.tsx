import { ActivityIndicator, FlatList } from "react-native"
import { useInvoicesQuery } from "@/hooks/api"
import { Filter } from "@/types/index"
import { Text } from "tamagui"
import { ErrorBoundary } from "@/components/templates"

type Props = {
    filters: Filter[]
}

const InvoicesList = ({ filters }: Props) => {
    const { invoices, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInvoicesQuery(filters)

    const handleFetchNextPage = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }

    if (isLoading) return <ActivityIndicator />

    if (isError) return <ErrorBoundary title="Error fetching invoices" />

    if (invoices?.length === 0) return <ErrorBoundary title="No invoices found" />

    return <FlatList
        data={invoices}
        onEndReached={handleFetchNextPage}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.id}</Text>}
    />
}

export default InvoicesList;