import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

//here for gql
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../config/queries";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [registerUser, { data, loading, error }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      if (data.register.statusCode === 200) {
        navigation.navigate("Login");
      } else {
        setErrorMessage(data.register.message);
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleRegister = () => {
    const emailFormat = /\S+@\S+\.\S+/;
    if (!username || !email || !password) {
      setErrorMessage("Username, email, and password are required");
      return;
    }
    if (!emailFormat.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }
    if (password.length < 5) {
      setErrorMessage("Password must be at least 5 characters long");
      return;
    }

    registerUser({
      variables: {
        input: {
          name,
          username,
          email,
          password,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 15,
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <View style={{ width: 200, height: 50 }}>
          <Image
            source={require("../assets/ig.png")}
            style={{ width: 200, height: 50, resizeMode: "cover" }}
          />
        </View>

        <Text
          style={{
            textAlign: "center",
            color: "#737373",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Sign up to see photos and videos from your friends.
        </Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.inputText}
          placeholder="Full name"
          // placeholderTextColor="#060101"
          placeholderStyle={{ fontSize: 10 }} // Adjust the font size here
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.inputText}
          placeholder="Username"
          // placeholderTextColor="#AFAFAF"
          placeholderStyle={{ fontSize: 10 }} // Adjust the font size here
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputText}
          placeholder="Email"
          // placeholderTextColor="#AFAFAF"
          placeholderStyle={{ fontSize: 10 }} // Adjust the font size here
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          // placeholderTextColor="#AFAFAF"
          textContentType="password"
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        // onPress={() => {
        //   navigation.navigate("HomeTab");
        // }}
        onPress={handleRegister}
      >
        <Text style={styles.loginText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={{ marginHorizontal: 15 }}>
          <Text style={styles.signUpAsk}>Have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.forgot}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 30,
    color: "#777777",
    fontWeight: "800",
  },
  singUp: {
    color: "#0064e0",
    fontWeight: "500",
  },

  loginBtn: {
    width: "80%",
    backgroundColor: "#0064e0",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "#ffffff",
    fontWeight: "800",
  },
  actions: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  logoView: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    marginTop: 0,
  },
  logo: {
    marginBottom: 25,
    width: 250,
    height: 100,
  },
  forgot: {
    color: "#0064e0",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  signUpAsk: {
    color: "#000",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

const ContainerTitle = styled.View`
  position: flex;
  flex-direction: row;
  column-gap: 7px;
`;

const ContainerHeader = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 25%;
  width: 100%;
`;
const TitleText = styled.Text`
  font-size: 40px;
  color: #39b54a;
  font-weight: 800;
`;
