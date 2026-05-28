import { View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

const DESPESAS_TESTE = [
  { id: 'e1', descricao: 'Tênis novo', valor: 250.00, data: new Date('2024-03-12') },
  { id: 'e2', descricao: 'Supermercado', valor: 145.50, data: new Date('2024-03-15') },
  { id: 'e3', descricao: 'Livro de React Native', valor: 59.90, data: new Date('2024-03-18') },
];

export default function TodasDespesas() {
  return (
    <View style={{ flex: 1 }}>
      <DespesaSaida despesas={DESPESAS_TESTE} periodo="Total" />
    </View>
  );
}