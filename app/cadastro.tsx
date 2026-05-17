// import pega arquivos de outas pastas
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../banco/firebaseConfig";

function senhaForte(senha: string) {
  const regex = /^(?=.*[!@#$%]).{6,}$/;
  return regex.test(senha);
}

// 🔹 Tela de cadastro 
export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ra, setRa] = useState("");
  const router = useRouter();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erroSenha, setErroSenha] = useState("");
    const [erroEmail, setErroEmail] = useState("");

  //função de alertos para erros comuns
  async function cadastrar() {
    if (!nome || !email || !senha || !ra) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    if (!senhaForte(senha)) {
      Alert.alert("Atenção", "Senha deve conter pelo menos 6 caracteres e um dos seguintes símbolos: !@#$%");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        nome: nome,
        email: email,
        ra: ra,
      });

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");

      // limpar campos
      router.replace("/pages/calendar");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Erro", "Email já cadastrado");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Erro", "Senha deve ter no mínimo 6 caracteres");
      } else {
        Alert.alert("Erro", "Erro ao cadastrar");
      }
    }
  }

  //return é uma instrução usada dentro de funções para encerrar a execução e devolver um valor para quem chamou essa função.
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.form}>
      {/*<Image
         source={require("../../assets/logo.png")} // ajusta o caminho
          style={styles.logo}
          resizeMode="contain"
        />*/}
        <Text style={styles.titulo}>Criar conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          />

        <TextInput
          style={styles.input}
          placeholder="RA"
          value={ra}
          onChangeText={setRa}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.botao} onPress={cadastrar}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>VOLTAR</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

// 🔹 Estilos para a tela de cadastro
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },

  form: {
    width: "100%",
    maxWidth: 400,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
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
    color: "#00e5ff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#00e5ff",
    paddingBottom: 3,


    textShadowColor: "#00e5ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});