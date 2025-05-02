import { FC } from "react";
import { Button, Sheet, Text, XStack } from "tamagui";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmSheet: FC<Props> = ({ isOpen, setIsOpen, title, description, onConfirm, onCancel }) => {
    return (
        <Sheet
            modal
            open={isOpen}
            snapPoints={[200]}
            dismissOnSnapToBottom
            snapPointsMode='constant'
            onOpenChange={setIsOpen}
        >
            <Sheet.Overlay animation="lazy" backgroundColor="$shadow6" />
            <Sheet.Frame p="$4" alignItems="center" gap="$4">
                <Text textAlign="center" fontSize={20} fontWeight="bold">{title}</Text>
                <Text textAlign="center" fontSize={16} fontWeight="normal">{description}</Text>
                <XStack width="100%" justifyContent="space-between" gap="$2">
                    <Button flex={1} onPress={onConfirm}>Validate</Button>
                    <Button flex={1} variant="outlined" onPress={onCancel}>Cancel</Button>
                </XStack>
            </Sheet.Frame>
        </Sheet>
    )
}