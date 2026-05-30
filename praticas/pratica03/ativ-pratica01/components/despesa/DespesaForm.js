import { useState } from 'react';
import { StyleSheet, Text, View, Alert, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './Input';
import Button from '../Button'; 

export default function DespesaForm({ onCancel, onSubmit, submitButtonLabel }) {
  const [inputs, setInputs] = useState({
    valor: '',
    data: new Date(), 
    descricao: '',
    categoria: '', 
  });

  const [showPicker, setShowPicker] = useState(false);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return { ...curInputs, [inputIdentifier]: enteredValue };
    });
  }

  function dateChangedHandler(event, selectedDate) {
    const currentDate = selectedDate || inputs.data;
    setShowPicker(Platform.OS === 'ios');
    inputChangedHandler('data', currentDate);
  }

  function submitHandler() {
    const despesaData = {
      valor: +inputs.valor, 
      data: inputs.data, 
      descricao: inputs.descricao,
      categoria: inputs.categoria, 
    };

    const valorValido = !isNaN(despesaData.valor) && despesaData.valor > 0;
    const descricaoValida = despesaData.descricao.trim().length > 0;
    const categoriaValida = despesaData.categoria.trim().length > 0; 

    if (!valorValido || !descricaoValida || !categoriaValida) {
      Alert.alert('Dados Inválidos', 'Por favor, confira os campos preenchidos e informe uma categoria.');
      return;
    }

    onSubmit(despesaData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Sua Despesa</Text>
      
      <View style={styles.inputsRow}>
        <View style={styles.rowInput}>
          <Input
            label="Valor"
            textInputConfig={{
              keyboardType: 'decimal-pad',
              onChangeText: inputChangedHandler.bind(this, 'valor'),
              value: inputs.valor,
            }}
          />
        </View>

        <View style={styles.rowInput}>
          <Pressable onPress={() => setShowPicker(true)}>
            <View pointerEvents="none">
              <Input
                label="Data"
                textInputConfig={{
                  value: inputs.data.toISOString().slice(0, 10),
                  editable: false, 
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>

      <Input
        label="Descrição"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'descricao'),
          value: inputs.descricao,
        }}
      />

      <Input
        label="Categoria (ex: Lazer, Contas, Saúde)"
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'categoria'),
          value: inputs.categoria,
        }}
      />

      {showPicker && (
        <DateTimePicker
          value={inputs.data}
          mode="date"
          display="default"
          onChange={dateChangedHandler}
        />
      )}

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancelar
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'black', marginVertical: 16, textAlign: 'center' },
  inputsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  rowInput: { flex: 1, marginHorizontal: 4 }, 
  buttons: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  button: { minWidth: 120, marginHorizontal: 8 },
});