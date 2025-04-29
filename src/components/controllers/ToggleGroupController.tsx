import { Fragment } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { Text, ToggleGroup, View } from 'tamagui'

type Props = {
    options: {
        label: string
        value: string
    }[]
} & UseControllerProps

const ToggleGroupController = ({ options, name, control }: Props) => {
    const { field, fieldState } = useController({ name, control })

    return (
        <View width="100%" gap={4}>
            <ToggleGroup
                width="99%"
                type="single"
                value={field.value}
                orientation="horizontal"
                onValueChange={field.onChange}
            >
                {options.map((option) => (
                    <ToggleGroup.Item
                        height={45}
                        padding={8}
                        width="34%"
                        key={option.value}
                        value={option.value}
                        aria-label={option.label}
                    >
                        <Text>{option.label}</Text>
                    </ToggleGroup.Item>
                ))}
            </ToggleGroup>
            {fieldState.error && <Text color="$red10">{fieldState.error.message}</Text>}
        </View>
    )
}

export default ToggleGroupController
