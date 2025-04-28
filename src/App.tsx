import { ApiProvider } from 'api'
import { UIProvider } from 'ui/config'
import { AppNavigator } from '@/navigation/index'

/**
 * API token to authenticate requests
 * provided by email.
 */
const API_TOKEN = ''

const App = () => {
  return (
    <ApiProvider url="https://jean-test-api.herokuapp.com/" token={API_TOKEN}>
      <UIProvider>
        <AppNavigator />
      </UIProvider>
    </ApiProvider>
  )
}

export default App
