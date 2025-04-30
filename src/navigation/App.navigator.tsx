import { HomeScreen, InvoiceScreen } from '@/screens/index';
import NewInvoiceScreen from '@/screens/NewInvoice.screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Invoice: { id: number };
  NewInvoice: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Invoice" component={InvoiceScreen} />
                <Stack.Screen name="NewInvoice" component={NewInvoiceScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;