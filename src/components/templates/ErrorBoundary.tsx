import { FC } from 'react';
import { View, Text } from 'tamagui';

type Props = {
    title: string;
}

const ErrorBoundaryBase: FC<Props> = ({ title = 'An error occurred' }) => {
    return <View>
        <Text>{title}</Text>
    </View>
};

export const ErrorBoundary = ErrorBoundaryBase;