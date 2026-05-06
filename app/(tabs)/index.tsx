import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image, 
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../banco/firebaseConfig";


export default function login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
 
async function fazerLogin() {
  if (!email || !senha) {
    Alert.alert("Erro", "Preencha email e senha");
    return; // 🔥 ISSO FALTAVA
  }

  try {
    await signInWithEmailAndPassword(auth, email, senha);

    router.replace("/(tabs)/fullcalendar");

  } catch (error) {
    Alert.alert("Erro no login", "Email ou senha inválidos");
  }
}

  return (
   <KeyboardAvoidingView
  style={styles.container}
  behavior={Platform.OS === "ios" ? "padding" : undefined}
>
  <View style={styles.form}>

    {/* 🔹 IMAGEM */}
    <Image
      //source={require("../assets/logo.png")} // troca pelo seu caminho
      style={styles.logo}
      resizeMode="contain"
    />

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
      secureTextEntry
    />

    {/* 🔹 BOTÃO LOGIN */}
    <TouchableOpacity style={styles.botao} onPress={fazerLogin}>
      <Text style={styles.textoBotao}>Login</Text>
    </TouchableOpacity>

    {/* 🔹 LINKS */}
    <TouchableOpacity onPress={() => router.push("/cadastro")}>
      <Text style={styles.link}>ME CADASTRAR</Text>
    </TouchableOpacity>

    <TouchableOpacity>
      <Text style={styles.link}>ESQUECI SENHA</Text>
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
    width: "90%",
    maxWidth: 400, // 👈 padrão profissional
  },

  titulo: {
    textAlign: "center",
    fontSize: 50,
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

  logo: {
  width: 180,
  height: 100,
  alignSelf: "center",
  marginBottom: 20,
},

link: {
  color: "#00e5ff", // 🔥 azul neon
  fontWeight: "bold",
  textAlign: "center",
  marginTop: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#00e5ff",
  paddingBottom: 3,
},
});