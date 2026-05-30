import { useContext, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { DespesasContext } from '../store/despesas-context';
import { GlobalStyles } from '../constants/styles';

export default function TodasDespesas() {
  const despesasCtx = useContext(DespesasContext); 
  // Estados para controlar o Mês e Ano do filtro
  const [mesAtual, setMesAtual] = useState(new Date().getMonth()); 
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());

  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  function alterarMes(incremento) {
    let novoMes = mesAtual + incremento;
    let novoAno = anoAtual;
    
    if (novoMes > 11) { novoMes = 0; novoAno++; }
    if (novoMes < 0) { novoMes = 11; novoAno--; }
    
    setMesAtual(novoMes);
    setAnoAtual(novoAno);
  }

  const despesasFiltradas = despesasCtx.despesas.filter((despesa) => {
    const dataDespesa = new Date(despesa.data);
    return dataDespesa.getMonth() === mesAtual && dataDespesa.getFullYear() === anoAtual;
  });

  return (
    <View style={styles.container}>
      <View style={styles.filtroContainer}>
        <Pressable onPress={() => alterarMes(-1)} style={({pressed}) => pressed && styles.pressed}>
          <Ionicons name="chevron-back" size={28} color="white" />
        </Pressable>
        
        <Text style={styles.textoFiltro}>{nomesMeses[mesAtual]} de {anoAtual}</Text>
        
        <Pressable onPress={() => alterarMes(1)} style={({pressed}) => pressed && styles.pressed}>
          <Ionicons name="chevron-forward" size={28} color="white" />
        </Pressable>
      </View>

      <DespesaSaida despesas={despesasFiltradas} periodo="Neste mês" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'white' 
  },
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary500, 
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    elevation: 4,
  },
  textoFiltro: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.7,
  }
});