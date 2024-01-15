import styled from "styled-components/native";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { useContext } from "react";
import { View, Text, Image } from "react-native";
// import { AuthContext } from "../context/AuthContext";

const Container = styled.View`
  position: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #141414;
  row-gap: 5px;
`;

const FormContainer = styled.View`
  position: flex;
  flex-direction: column;
  row-gap: 25px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const TextInput = styled.TextInput`
  color: black;
  background-color: white;
  font-size: 28px;
  height: 45px;
  width: 80%;
  font-size: 16px;
  border-width: 1px;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
`;

const TitleText = styled.Text`
  font-size: 40px;
  color: white;
  font-weight: 800;
  /* font-family: "Billabong"; */
`;

const SignUpButton = styled.TouchableOpacity`
  height: 20px;
  position: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 80%;
  height: 45px;
  background-color: #0064e0;
`;

const SignInButton = styled.TouchableOpacity`
  height: 20px;
  position: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 80%;
  height: 45px;
  background-color: #535353;
`;

const TextLogin = styled.Text`
  font-size: 16px;
  color: #0064e0;
`;
const TextButton = styled.Text`
  font-size: 16px;
  color: white;
`;

const ContainerFooter = styled.View`
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
`;

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

const TouchButton = styled.TouchableOpacity`
  position: flex;
  justify-content: center;
  align-items: center;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  width: 100%;
`;

const WelcomeScreen = ({ navigation }) => {
  //   const { setIsSignedIn } = useContext(AuthContext);
  const pressLogin = () => {
    setIsSignedIn(true);
  };
  return (
    <>
      <Container>
        {/* Header */}
        <ContainerHeader>
          <ContainerTitle>
            <Entypo name="instagram" color="white" size={45} />
            <TitleText style={{ fontSize: 50, marginTop: -6 }}>
              Instagram
            </TitleText>
          </ContainerTitle>
        </ContainerHeader>
        {/* <View
          style={{
            padding: 15,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            position: "absolute",
            top: 100,
          }}
        >
          <View style={{ width: 200, height: 60 }}>
            <Image
              source={require("../assets/ig.png")}
              style={{ width: 200, height: 50, resizeMode: "cover" }}
            />
          </View>
        </View> */}

        {/* Form */}
        <KeyboardAvoidingView behavior={"padding"}>
          <FormContainer>
            <SignUpButton
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <TextButton>Create a new Account</TextButton>
            </SignUpButton>
            <TextLogin
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Login
            </TextLogin>
          </FormContainer>
        </KeyboardAvoidingView>

        {/* Footer */}
        <ContainerFooter>
          <TextButton>Instagram from Facebook</TextButton>
        </ContainerFooter>
      </Container>
    </>
  );
};

export default WelcomeScreen;
