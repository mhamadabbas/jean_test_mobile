import { Fragment } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Input, Text, View } from "tamagui";

type Props = UseControllerProps & {
    placeholder?: string;
};

const TextInputController = ({ name, control, placeholder }: Props) => {
    const { field, fieldState } = useController({ name, control });

    return (
        <View width="100%" gap={4}>
            <Input
                height={45}
                value={field.value}
                placeholder={placeholder}
                onChangeText={field.onChange}
                borderColor={fieldState.error ? "$red10" : "$borderColor"}
            />
            {fieldState.error && <Text alignSelf="flex-start" color="$red10">{fieldState.error.message}</Text>}
        </View>
    );
};

export default TextInputController;
