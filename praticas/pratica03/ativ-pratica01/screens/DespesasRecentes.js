import { useContext } from 'react'; 
import { View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../store/despesas-context';
export default function DespesasRecentes() {
  const despesasCtx = useContext(DespesasContext);

  return (
    <View style={{ flex: 1 }}>
      <DespesaSaida 
        despesas={despesasCtx.despesas} 
        periodo="Últimos 7 dias" 
      />
    </View>
  );
}