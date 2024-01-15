import { NavigationContainer } from "@react-navigation/native";
import { LoginProvider } from "./context/LoginContext";
import StackHolder from "./src/stacks/StackHolder";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <NavigationContainer>
          <StackHolder />
        </NavigationContainer>
      </LoginProvider>
    </ApolloProvider>
  );
}
