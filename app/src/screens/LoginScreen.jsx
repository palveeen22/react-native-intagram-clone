import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import logo from "../assets/skout_logo.png";
import styled from "styled-components/native";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import { gql, useMutation } from "@apollo/client";
import { LOGIN } from "../../config/queries";
import ErrorText from "../components/ErrorText";

export default function LoginScreen({ navigation }) {
  const { setTokenLogin } = useContext(LoginContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [funcLogin, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: async (res) => {
      // console.log(res, "<<< res ");
      if (res?.login?.token) {
        await setTokenLogin(res.login.token);
      }
    },
    onError: (err) => {
      Alert.alert("Error", err.message);
    },
  });

  const onChangeForm = (value, key) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onLogin = async () => {
    try {
      const payload = form;
      // console.log(payload);
      await funcLogin({
        variables: payload,
      });
    } catch (error) {
      console.log(error);
    }
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
        <View style={{ width: 200, height: 60 }}>
          <Image
            source={require("../assets/ig.png")}
            style={{ width: 200, height: 50, resizeMode: "cover" }}
          />
        </View>
      </View>

      <ErrorText error={error} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Phone Number, Username, or Email"
          // placeholderTextColor="#AFAFAF"
          placeholderStyle={{ fontSize: 10 }} // Adjust the font size here
          value={form.email}
          keyboardType="email-address"
          onChangeText={(text) => onChangeForm(text, "email")}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          // placeholderTextColor="#AFAFAF"
          textContentType="password"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => onChangeForm(text, "password")}
        />
      </View>

      <Forgot>Forgot Password?</Forgot>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          onLogin();
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={{ marginHorizontal: 15 }}>
          <Text style={styles.signUpAsk}>Don't have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.forgot}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Signup
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
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
    textAlign: "right",
  },
  signUpAsk: {
    color: "#000",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

const Forgot = styled.Text`
  color: #0064e0;
  text-align: right;
`;
