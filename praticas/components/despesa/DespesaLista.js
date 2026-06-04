import { FlatList } from 'react-native';
import DespesaItem from './DespesaItem'; 
function renderizarDespesa(itemData) {
  return <DespesaItem {...itemData.item} />;
}

export default function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas} 
      keyExtractor={(item) => item.id} 
      renderItem={renderizarDespesa} 
    />
  );
}