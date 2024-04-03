import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

function Note(props) {
  function evaluateEquation() {
    // Eval has an important security risk, it can execute any code passed to it
    // It would be better to use another library to evaluate the mathemathical expression
    const result = eval(props.text);

    Alert.alert("Result", "Result: " + result);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.text}>{props.text}</Text>

      <View style={styles.evaluateContainer}>
        <Button title="Evaluate" onPress={evaluateEquation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
  evaluateContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Note;
