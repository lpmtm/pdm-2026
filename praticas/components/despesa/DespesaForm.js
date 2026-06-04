import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Platform, Pressable, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './Input';
import Button from '../Button'; 
import { MoneyContext } from '../../constants/GlobalState.jsx';

export default function DespesaForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const { categories } = useContext(MoneyContext);

  const [inputs, setInputs] = useState({
    valor: defaultValues ? defaultValues.value.toString() : '',
    data: defaultValues ? new Date(defaultValues.date) : new Date(), 
    descricao: defaultValues ? defaultValues.description : '',
    categoria: defaultValues ? defaultValues.category?.displayName : '', 
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
      Alert.alert('Dados Inválidos', 'Por favor, confira os campos preenchidos e selecione uma categoria.');
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

      <Text style={styles.labelCategoria}>Categoria</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriaScroll}>
        <View style={styles.categoriaContainer}>
          {categories.map((cat) => {
            const isSelected = inputs.categoria === cat.displayName;
            
            return (
              <Pressable
                key={cat.id}
                style={[styles.chip, isSelected && styles.chipSelected]}
                onPress={() => inputChangedHandler('categoria', cat.displayName)}
              >
                <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                  {cat.displayName}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

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
  labelCategoria: { fontSize: 12, color: '#5f2ee3', marginBottom: 4, marginLeft: 4, marginTop: 8 },
  categoriaScroll: { marginBottom: 16 },
  categoriaContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 4 },
  chip: { backgroundColor: '#e6e6fa', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: 'transparent' },
  chipSelected: { backgroundColor: '#3e04c3', borderColor: '#3e04c3' },
  chipText: { color: '#3e04c3', fontSize: 14, fontWeight: 'bold' },
  chipTextSelected: { color: 'white' },
  buttons: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  button: { minWidth: 120, marginHorizontal: 8 },
});