import { FC, memo } from "react";
import { InvoiceLine } from "@/types/index";
import { Card, XStack, YStack, Text, Button } from "@/ui/index";
import { formatPrice } from "utils/number";
import { Trash } from "@tamagui/lucide-icons";

type InvoiceLineCardProps = {
    productName: string;
    quantity: number;
    price: number;
    onDelete?: () => void;
}

export const InvoiceLineCard: FC<InvoiceLineCardProps> = memo(({ productName, quantity, price, onDelete }) => {
    return <Card width="100%" elevate borderColor="$gray8Light" borderWidth={1}>
        <Card.Header gap={16} flexDirection="row" alignItems="center" justifyContent="space-between">
            <YStack flex={1}>
                <XStack justifyContent="space-between">
                    <Text>Product</Text>
                    <Text fontWeight="bold">{productName}</Text>
                </XStack>
                <XStack justifyContent="space-between">
                    <Text>Quantity</Text>
                    <Text fontWeight="bold">{quantity}</Text>
                </XStack>
                <XStack justifyContent="space-between">
                    <Text>Price</Text>
                    <Text fontWeight="bold">{formatPrice(price)}</Text>
                </XStack>
            </YStack>
            {onDelete && <Button width={40} height={40} onPress={onDelete}>
                <Trash />
            </Button>}
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
            <Text fontWeight="bold">{formatPrice(price * quantity)}</Text>
        </Card.Footer>
    </Card>
});

InvoiceLineCard.displayName = 'InvoiceLineCard'