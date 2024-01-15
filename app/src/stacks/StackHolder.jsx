import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ButtonTab from "./ButtonTab";
import WelcomeScreen from "../screens/WelcomeScreen";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import UserDetail from "../screens/UserDetail";
import PostDetailScreen from "../screens/PostDetailScreen";

const Stack = createStackNavigator();

const StackHolder = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen name="HomeTab" component={ButtonTab} />
          <Stack.Screen name="User-Detail" component={UserDetail} />
          <Stack.Screen name="Post-Detail" component={PostDetailScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackHolder;
