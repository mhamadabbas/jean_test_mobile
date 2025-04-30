import { HomeScreen, InvoiceScreen } from '@/screens/index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Invoice" component={InvoiceScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;