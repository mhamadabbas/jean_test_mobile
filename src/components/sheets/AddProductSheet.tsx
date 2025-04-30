import { Product } from '@/types/product.type'
import { Minus, Plus } from '@tamagui/lucide-icons'
import { Sheet } from '@tamagui/sheet'
import { FC, useState } from 'react'
import { Button, Input, Text, XStack } from 'tamagui'
import ProductSelect from '../inputs/ProductSelect'

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void

    productIdToHide?: string[];
    onSubmit: (product: Product, quantity: number) => void
}

const AddProductSheet: FC<Props> = ({
    isOpen,
    setIsOpen,
    onSubmit,
    productIdToHide,
}) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [product, setProduct] = useState<Product | null>(null);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    }

    const handleDecrement = () => {
        setQuantity(quantity - 1);
    }

    const handleSubmit = () => {
        if (product) onSubmit(product, quantity);
        setProduct(null);
        setQuantity(1);
    }

    const handleClear = () => {
        setProduct(null);
        setQuantity(1);
    }

    return (
        <Sheet
            modal
            open={isOpen}
            snapPoints={[370]}
            dismissOnSnapToBottom
            snapPointsMode='constant'
            onOpenChange={setIsOpen}
        >
            <Sheet.Overlay animation="lazy" backgroundColor="$shadow6" />
            <Sheet.Frame p="$4" alignItems="center" gap="$4">
                <Text fontSize={20} fontWeight="bold">Add product</Text>
                <ProductSelect value={product?.id.toString() || ''} onChange={setProduct} productIdToHide={productIdToHide} />
                <Text alignSelf="flex-start" fontSize={16} fontWeight="bold">Quantity</Text>
                <XStack width="100%" alignItems="center" gap="$2">
                    <Button flex={1} height={45} onPress={handleDecrement}>
                        <Minus />
                    </Button>
                    <Input flex={8} height={45} keyboardType='numeric' value={quantity.toString()} onChangeText={(text) => setQuantity(Number(text))} />
                    <Button flex={1} height={45} onPress={handleIncrement}>
                        <Plus />
                    </Button>
                </XStack>
                <Button width="100%" onPress={handleSubmit}>Validate</Button>
                <Button width="100%" variant="outlined" onPress={handleClear}>Cancel</Button>
            </Sheet.Frame>
        </Sheet>
    )
}

export default AddProductSheet;
