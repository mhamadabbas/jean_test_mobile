import { render as renderNative } from '@testing-library/react-native'
import { ReactElement } from 'react'
import { UIProvider } from 'ui/config'

export const render = (component: ReactElement) => renderNative(
    <UIProvider>
        {component}
    </UIProvider>,
)
