import { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validate = () => {
    const newErrors = { username: "", password: "" };
    if (!username.trim()) {
      newErrors.username = "Vui lòng nhập Username";
    }
    if (!password.trim()) {
      newErrors.password = "Vui lòng nhập Password";
    }
    setErrors(newErrors);
    const isValid = !newErrors.username && !newErrors.password;
    if (isValid) {
      Alert.alert("Thông báo", "Đăng nhập thành công");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Đăng nhập</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={[styles.input, errors.username && styles.inputError]}
        />
        {!!errors.username && <Text style={styles.error}>{errors.username}</Text>}

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, errors.password && styles.inputError]}
        />
        {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <Pressable style={styles.button} onPress={validate}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    paddingHorizontal: 24,
  },
  form: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cfd3d8",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  error: {
    color: "#e74c3c",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1d4ed8",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
