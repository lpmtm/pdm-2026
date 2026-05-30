import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { GlobalStyles } from '../constants/styles'; // Importando a sua paleta de cores!

export default function Login({ navigation }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    if (nome.trim().length === 0 || senha.trim().length === 0) {
      Alert.alert('Erro', 'Por favor, preencha nome e senha para acessar.');
      return;
    }
    navigation.replace('DespesasOverview', { userName: nome });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Faça login para gerenciar suas despesas</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        placeholderTextColor={GlobalStyles.colors.primary200}
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        placeholderTextColor={GlobalStyles.colors.primary200}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry 
      />

      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} 
        onPress={handleLogin}
        android_ripple={{ color: GlobalStyles.colors.primary400 }}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary50, 
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary700, 
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: GlobalStyles.colors.primary500, 
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary200, 
    color: GlobalStyles.colors.primary700,
  },
  button: {
    backgroundColor: GlobalStyles.colors.primary500, 
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2, 
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});