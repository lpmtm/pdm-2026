import { useContext } from 'react'; 
import { View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { MoneyContext } from '../constants/GlobalState.jsx';

export default function DespesasRecentes() {
  const { transactions } = useContext(MoneyContext);

  return (
    <View style={{ flex: 1 }}>
      <DespesaSaida 
        despesas={transactions} 
        periodo="Últimos 7 dias" 
      />
    </View>
  );
}