import { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DespesasContext } from '../../store/despesas-context'; 

export default function DespesaItem({ id, descricao, valor, data }) {
  const navigation = useNavigation();
  const despesasCtx = useContext(DespesasContext);
  
  const [modalVisivel, setModalVisivel] = useState(false);

  function abrirModal() {
    setModalVisivel(true);
  }

  function fecharModal() {
    setModalVisivel(false);
  }

  function editarHandler() {
    fecharModal();
    navigation.navigate('GerenciarDespesa', {
      idDespesa: id
    });
  }

  function excluirHandler() {
    fecharModal();
    despesasCtx.deleteDespesa(id); 
  }

  const dataFormatada = data.toLocaleDateString('pt-BR');

  return (
    <>
      <Pressable 
        onLongPress={abrirModal} 
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

      <Modal
        visible={modalVisivel}
        animationType="fade"
        transparent={true}
        onRequestClose={fecharModal} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Deseja editar ou excluir essa transação?</Text>
            
            <View style={styles.modalButtons}>
              <Pressable style={[styles.button, styles.buttonEdit]} onPress={editarHandler}>
                <Text style={styles.buttonText}>Editar</Text>
              </Pressable>
              
              <Pressable style={[styles.button, styles.buttonDelete]} onPress={excluirHandler}>
                <Text style={styles.buttonText}>Excluir</Text>
              </Pressable>
            </View>

            <Pressable style={styles.buttonCancel} onPress={fecharModal}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3e04c3',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonEdit: {
    backgroundColor: '#3e04c3', 
  },
  buttonDelete: {
    backgroundColor: '#f31282', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonCancel: {
    padding: 8,
  },
  cancelText: {
    color: '#9345b0',
    fontSize: 16,
    fontWeight: 'bold',
  }
});