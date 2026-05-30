import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import Login from './screens/Login'; 
import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';
import IconButton from './components/IconButton';
import DespesasContextProvider from './store/despesas-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DespesasOverview({ route }) {
  const userName = route.params?.userName || 'Usuário';

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
        ),
        headerLeft: () => (
          <View style={{ marginLeft: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
              Olá, {userName}! 
            </Text>
          </View>
        ),
        headerTitle: '', 
      })}
    >
      <Tab.Screen 
        name="DespesasRecentes" 
        component={DespesasRecentes} 
        options={{ 
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />
        }} 
      />
      <Tab.Screen 
        name="TodasDespesas" 
        component={TodasDespesas} 
        options={{ 
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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }} 
          />
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