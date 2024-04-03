import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Note from "./components/Note";

// Import CryptoJS for encryption
import CryptoJS from "crypto-js";

const Notes = ({ route, navigation }) => {
  const { logout } = route.params;
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteEquation, setNewNoteEquation] = useState("");

  useEffect(() => {
    const getStoredNotes = async () => {
      const suffix = hashCredentials(
        route.params.user.username,
        route.params.user.password
      );
      const value = await AsyncStorage.getItem("notes-" + suffix);
      if (value !== null) {
        setNotes(JSON.parse(decryptData(value, route.params.user.password)));
      } else {
        setNotes([]);
      }
    };
    getStoredNotes();
  }, [route.params.user.username, route.params.user.password]);

  useEffect(() => {
    const storeNotes = async () => {
      const suffix = hashCredentials(
        route.params.user.username,
        route.params.user.password
      );
      const jsonValue = encryptData(
        JSON.stringify(notes),
        route.params.user.password
      );
      await AsyncStorage.setItem("notes-" + suffix, jsonValue);
    };
    storeNotes();
  }, [notes, route.params.user.username, route.params.user.password]);

  const onNoteTitleChange = (value) => {
    setNewNoteTitle(value);
  };

  const onNoteEquationChange = (value) => {
    setNewNoteEquation(value);
  };

  const addNote = () => {
    const note = {
      title: newNoteTitle,
      text: newNoteEquation,
    };

    if (note.title === "" || note.text === "") {
      Alert.alert("Error", "Title and equation cannot be empty.");
      return;
    }

    setNotes([...notes, note]);
    setNewNoteTitle("");
    setNewNoteEquation("");
  };

  // Function to hash user credentials
  const hashCredentials = (username, password) => {
    return CryptoJS.SHA256(username + password).toString();
  };

  // Encryption function using CryptoJS
  const encryptData = (data, key) => {
    return CryptoJS.AES.encrypt(data, key).toString();
  };

  // Decryption function using CryptoJS
  const decryptData = (data, key) => {
    const bytes = CryptoJS.AES.decrypt(data, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      // Call the logout function
      logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Text style={styles.title}>
            {"Math Notes: " + route.params.user.username}
          </Text>
          <TextInput
            style={styles.titleInput}
            value={newNoteTitle}
            onChangeText={onNoteTitleChange}
            placeholder="Enter your title"
          />
          <TextInput
            style={styles.textInput}
            value={newNoteEquation}
            onChangeText={onNoteEquationChange}
            placeholder="Enter your math equation"
          />
          <Button title="Add Note" onPress={addNote} />

          <View style={styles.notes}>
            {notes.map((note, index) => (
              <Note key={index} title={note.title} text={note.text} />
            ))}
          </View>
        </View>
        <View style={styles.logoutButton}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  titleInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  notes: {
    marginTop: 15,
  },
  logoutButton: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default Notes;
