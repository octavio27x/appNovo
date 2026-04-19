import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>oi minha vida</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda a tela
    alignItems: 'center', // centraliza horizontal
    justifyContent: 'center', // centraliza vertical
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold'
  }
});