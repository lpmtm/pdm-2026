import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/IconButton';
import { GlobalStyles } from '../constants/styles';
import { DespesasContext } from '../store/despesas-context';
import DespesaForm from '../components/despesa/DespesaForm';

export default function GerenciarDespesa({ route, navigation }) {
  const despesasCtx = useContext(DespesasContext);

  const idDespesaEditada = route.params?.idDespesa;
  const estaEditando = !!idDespesaEditada;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: estaEditando ? 'Editar Despesa' : 'Adicionar Despesa',
    });
  }, [navigation, estaEditando]);

  function eliminarDespesa() {
    despesasCtx.deleteDespesa(idDespesaEditada);
    navigation.goBack();
  }

  function cancelarHandler() {
    navigation.goBack();
  }

  function confirmarHandler(despesaData) {
    if (estaEditando) {
      despesasCtx.updateDespesa(idDespesaEditada, despesaData);
    } else {
      despesasCtx.addDespesa(despesaData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <DespesaForm 
        submitButtonLabel={estaEditando ? 'Atualizar' : 'Adicionar'} 
        onCancel={cancelarHandler}
        onSubmit={confirmarHandler}
      />
      
      {estaEditando && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={eliminarDespesa}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'white' },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});