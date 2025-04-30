import { Fragment } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Input, Text } from "tamagui";

type Props = UseControllerProps & {
    placeholder?: string;
};

const TextInputController = ({ name, control, placeholder }: Props) => {
    const { field, fieldState } = useController({ name, control });

    return (
        <Fragment>
            <Input
                height={45}
                width="100%"
                value={field.value}
                placeholder={placeholder}
                onChangeText={field.onChange}
                borderColor={fieldState.error ? "$red10" : "$borderColor"}
            />
            {fieldState.error && <Text color="$red10">{fieldState.error.message}</Text>}
        </Fragment>
    );
};

export default TextInputController;
