import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

// Import AsyncStorage for secure data storage
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import CryptoJS for encryption and decryption
import CryptoJS from "crypto-js";
// Import react-native-config to read environment variables from .env file
import Config from "react-native-config";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Notes from "./Notes";
import Login from "./Login";

const ENCRYPTION_KEY = Config.ENCRYPTION_KEY;

function App() {
  const [signedInAs, setSignedInAs] = React.useState(false);

  const Stack = createNativeStackNavigator();

  // Function that uses AsyncStorage store user data in a secure way
  const securelyStoreUserData = async (userData) => {
    try {
      // Encrypt userData before storing (You should replace 'ENCRYPTION_KEY' with your encryption key)
      const encryptedUserData = encryptData(
        JSON.stringify(userData),
        ENCRYPTION_KEY
      );
      await AsyncStorage.setItem("userData", encryptedUserData);
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  // Function to securely retrieve user data from AsyncStorage
  const getSecurelyStoredUserData = async () => {
    try {
      const encryptedUserData = await AsyncStorage.getItem("userData");
      if (encryptedUserData !== null) {
        // Ensure that data is not empty before parsing
        if (encryptedUserData.trim() !== "") {
          const decryptedUserData = decryptData(
            encryptedUserData,
            ENCRYPTION_KEY
          );
          return JSON.parse(decryptedUserData);
        } else {
          console.error("Retrieved data is empty");
          return null;
        }
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
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

  // Function to handle user login
  const handleLogin = (user) => {
    // Store user data securely
    securelyStoreUserData(user);
    // Set signedInAs state to true
    setSignedInAs(user);
  };

  // Check if user is already signed in
  React.useEffect(() => {
    const checkUserSignIn = async () => {
      const storedUserData = await getSecurelyStoredUserData();
      if (storedUserData) {
        setSignedInAs(storedUserData);
      }
    };
    checkUserSignIn();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!signedInAs ? (
          <Stack.Screen name="Login">
            {(props) => <Login {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Notes"
            component={Notes}
            initialParams={{
              user: signedInAs,
              logout: () => setSignedInAs(false),
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
