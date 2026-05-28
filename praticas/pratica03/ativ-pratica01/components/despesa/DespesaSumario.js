import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles'; 
export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((soma, despesa) => {
    return soma + despesa.valor;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={styles.soma}>R$ {somaDespesas.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: GlobalStyles.colors.primary50, 
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  periodo: {
    fontSize: 14,
    color: GlobalStyles.colors.primary700, 
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary700, 
  }
});