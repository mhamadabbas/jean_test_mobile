import { Fragment } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { Text, ToggleGroup } from 'tamagui'

type Props = {
    options: {
        label: string
        value: string
    }[]
} & UseControllerProps

const ToggleGroupController = ({ options, name, control }: Props) => {
    const { field, fieldState } = useController({ name, control })

    return (
        <Fragment>
            <ToggleGroup
                width="99%"
                type="multiple"
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
        </Fragment>
    )
}

export default ToggleGroupController
