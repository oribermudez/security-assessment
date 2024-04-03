import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TRootStackParamList } from "./App";

// Import CryptoJS for password hashing
import CryptoJS from "crypto-js";

export default function Login(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const users = [
    // Hashed passwords
    { username: "joe", password: hashPassword("secret") },
    { username: "bob", password: hashPassword("password") },
  ];

  function login() {
    if (!username || !password) {
      Alert.alert("Error", "Username or password cannot be empty.");
      return;
    }

    // Hash the entered password
    const hashedPassword = hashPassword(password);

    let foundUser = false;

    for (const user of users) {
      if (username === user.username && hashedPassword === user.password) {
        foundUser = user;
        break;
      }
    }

    if (foundUser) {
      props.onLogin(foundUser);
    } else {
      Alert.alert("Error", "Invalid username or password.");
    }
  }

  // Function to hash the password
  function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.username}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.password}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true} // Hide password input
      />
      <Button title="Login" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  username: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  password: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});
