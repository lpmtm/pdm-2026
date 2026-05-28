import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';
import IconButton from './components/IconButton';
import DespesasContextProvider from './store/despesas-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DespesasOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <IconButton 
            icon="add" 
            size={24} 
            color="black" 
            onPress={() => navigation.navigate('GerenciarDespesa')} 
          />
        )
      })}
    >
      <Tab.Screen 
        name="DespesasRecentes" 
        component={DespesasRecentes} 
        options={{ 
          title: 'Despesas Recentes', 
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />
        }} 
      />
      <Tab.Screen 
        name="TodasDespesas" 
        component={TodasDespesas} 
        options={{ 
          title: 'Todas as Despesas', 
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="wallet-outline" size={size} color={color} />
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <DespesasContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="DespesasOverview" 
            component={DespesasOverview} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="GerenciarDespesa" 
            component={GerenciarDespesa} 
            options={{ presentation: 'modal' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DespesasContextProvider>
  );
}