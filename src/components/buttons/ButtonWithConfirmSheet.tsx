import { FC, Fragment, memo, useState } from "react";
import { Button, ButtonProps } from "tamagui";
import { ConfirmSheet } from "../sheets";

type Props = {
    onConfirm: () => void;
    title: string;
    description: string;
} & ButtonProps;

export const ButtonWithConfirmSheet: FC<Props> = memo(({ onConfirm, title, description, ...props }) => {
    const [isConfirmSheetOpen, setIsConfirmSheetOpen] = useState(false);

    const handleButtonPress = () => {
        setIsConfirmSheetOpen(true);
    }

    const onCancelConfirmSheet = () => {
        setIsConfirmSheetOpen(false);
    }

    const onConfirmConfirmSheet = () => {
        onConfirm();
        setIsConfirmSheetOpen(false);
    }

    return (
        <Fragment>
            <Button onPress={handleButtonPress} {...props}>{title}</Button>
            {isConfirmSheetOpen && <ConfirmSheet
                title={title}
                description={description}
                isOpen={isConfirmSheetOpen}
                onCancel={onCancelConfirmSheet}
                setIsOpen={setIsConfirmSheetOpen}
                onConfirm={onConfirmConfirmSheet}
            />}
        </Fragment>
    )
});

ButtonWithConfirmSheet.displayName = 'ButtonWithConfirmSheet';