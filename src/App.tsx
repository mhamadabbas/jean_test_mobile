import { ApiProvider } from 'api'
import { UIProvider } from 'ui/config'
import { AppNavigator } from '@/navigation/index'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from 'config/queryClient'

/**
 * API token to authenticate requests
 * provided by email.
 */
const API_TOKEN = ''

const App = () => {
  return (
    <ApiProvider url="https://jean-test-api.herokuapp.com" token={API_TOKEN}>
      <QueryClientProvider client={queryClient}>
        <UIProvider>
          <AppNavigator />
        </UIProvider>
      </QueryClientProvider>
    </ApiProvider>
  )
}

export default App
