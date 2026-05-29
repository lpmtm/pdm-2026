import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa a navegação

export default function DespesaItem({ id, descricao, valor, data }) {
  const navigation = useNavigation();

  function despesaPressHandler() {
    // Quando clicamos, vamos para a tela de Gerenciar e levamos o ID
    navigation.navigate('GerenciarDespesa', {
      idDespesa: id
    });
  }

  const dataFormatada = data.toLocaleDateString('pt-BR');

  return (
    <Pressable 
      onPress={despesaPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View>
          <Text style={styles.textoDescricao}>{descricao}</Text>
          <Text style={styles.textoData}>{dataFormatada}</Text>
        </View>
        <View style={styles.caixaValor}>
          <Text style={styles.textoValor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },
  item: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#3e04c3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
  },
  textoDescricao: {
    color: '#e6e6fa',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4, 
  },
  textoData: {
    color: '#d8b4e2', 
    fontSize: 14,
  },
  caixaValor: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoValor: {
    color: '#3e04c3',
    fontWeight: 'bold',
  }
});