import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';
import { GlobalStyles } from '../../constants/styles';

export default function DespesaSaida({ despesas, periodo }) {
  const totaisPorCategoria = despesas.reduce((acc, despesa) => {
    const categoria = despesa.categoria ? despesa.categoria : 'Outros';
    acc[categoria] = (acc[categoria] || 0) + despesa.valor;
    return acc;
  }, {});

  const coresGrafico = [
    GlobalStyles.colors.primary500,
    GlobalStyles.colors.error500,
    GlobalStyles.colors.primary400,
    GlobalStyles.colors.primary200,
    GlobalStyles.colors.primary700,
  ];

  const dadosGrafico = Object.keys(totaisPorCategoria).map((categoria, index) => ({
    name: categoria,
    population: totaisPorCategoria[categoria], 
    color: coresGrafico[index % coresGrafico.length], 
    legendFontColor: GlobalStyles.colors.primary700,
    legendFontSize: 13,
  }));

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />

      {dadosGrafico.length > 0 ? (
        <View style={styles.graficoContainer}>
          <PieChart
            data={dadosGrafico}
            width={screenWidth - 48} 
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}
            absolute 
          />
        </View>
      ) : (
        <Text style={styles.textoVazio}>Nenhuma despesa para exibir no gráfico.</Text>
      )}

      <DespesaLista despesas={despesas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5', 
  },
  graficoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 2, 
  },
  textoVazio: {
    textAlign: 'center',
    marginVertical: 24,
    color: GlobalStyles.colors.primary400,
    fontStyle: 'italic',
  }
});