import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import IconButton from '../components/IconButton';
import { GlobalStyles } from '../constants/styles';
import DespesaForm from '../components/despesa/DespesaForm';
import { MoneyContext } from '../constants/GlobalState.jsx';

export default function GerenciarDespesa({ route, navigation }) {
  const context = useContext(MoneyContext);

  const idDespesaEditada = route.params?.idDespesa;
  const estaEditando = !!idDespesaEditada;

  const despesaParaEditar = context?.transactions.find(
    (tx) => tx.id === idDespesaEditada
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: estaEditando ? 'Editar Despesa' : 'Adicionar Despesa',
    });
  }, [navigation, estaEditando]);

  if (!context) {
    return (
      <View style={styles.container}>
        <Alert title="Erro" message="O Contexto (MoneyContext) não foi encontrado!" />
      </View>
    );
  }

  const { addTransaction, updateTransaction, deleteTransaction, categories } = context;

  async function eliminarDespesa() {
    try {
      await deleteTransaction(idDespesaEditada);
      navigation.goBack();
    } catch (error) {
      console.log("Erro ao deletar:", error);
    }
  }

  function cancelarHandler() {
    navigation.goBack();
  }

  async function confirmarHandler(despesaData) {
    try {
      const nomeDigitado = despesaData.categoria ? despesaData.categoria.trim().toLowerCase() : "";
      const categoriaEncontrada = categories.find(c => c.displayName.toLowerCase() === nomeDigitado);
      const categoryIdCorreto = categoriaEncontrada ? categoriaEncontrada.id : categories[0]?.id;

      const dadosFormatados = {
        description: despesaData.descricao || "Despesa",
        value: Number(despesaData.valor) || 0,
        date: despesaData.data ? new Date(despesaData.data).toISOString() : new Date().toISOString(),
        categoryId: categoryIdCorreto
      };

      if (estaEditando) {
        await updateTransaction(idDespesaEditada, dadosFormatados);
      } else {
        await addTransaction(dadosFormatados);
      }
      
      navigation.goBack();
    } catch (error) {
      console.log("Erro ao salvar/atualizar:", error);
    }
  }

  return (
    <View style={styles.container}>
      <DespesaForm 
        submitButtonLabel={estaEditando ? 'Atualizar' : 'Adicionar'} 
        onCancel={cancelarHandler}
        onSubmit={confirmarHandler}
        defaultValues={despesaParaEditar} 
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