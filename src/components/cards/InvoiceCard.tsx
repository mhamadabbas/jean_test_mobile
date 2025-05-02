import { RootStackParamList } from "@/navigation/App.navigator"
import { Filter, InvoiceStatus } from "@/types/index"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { ChevronRight } from "@tamagui/lucide-icons"
import { FC, memo } from "react"
import { Card, Text, XStack, YStack } from "tamagui"

type InvoiceCardProps = {
    status: InvoiceStatus
    invoiceId: number
    customerName: string
    totalAmount: string
}

export const InvoiceCard: FC<InvoiceCardProps> = memo(({ status, invoiceId, customerName, totalAmount }) => {
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
});

InvoiceCard.displayName = 'InvoiceCard';