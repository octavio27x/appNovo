import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.titulo}>Login</Text>

        <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        />

        <TextInput
        style={styles.input}
        placeholder="senha"
        value={senha}
        onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={login}>
          <Text style={styles.textoBotao}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/cadastro")}>
          <Text style={{color:"blue, marginTop 10 "}}>Me Cadastrar</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1, // ocupa toda a tela
    alignItems: 'center', // centraliza horizontal
    justifyContent: 'center', // centraliza vertical
  },

  form: {
    width: "100%",
    maxWidth: 400, // 👈 padrão profissional
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  
  input:{
     borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
  },

   botao: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

   textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

});