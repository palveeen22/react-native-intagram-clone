import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../config/queries";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      if (token) {
        setIsLoggedIn(true);
        // Fetch user ID when the app starts
        fetchUserIdFromToken(token);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const fetchUserIdFromToken = async (token) => {
    try {
      // Fetch user ID based on the provided token using a GraphQL query
      const { data } = await useQuery.query({
        query: GET_PROFILE,
        variables: { token },
      });

      if (data && data.getUserById) {
        setUserId(data.getUserById.id);
      }
    } catch (error) {
      console.log("Error fetching user ID:", error.message);
    }
  };

  const setTokenLogin = async (token) => {
    try {
      await SecureStore.setItemAsync("token", token);
      setIsLoggedIn(true);
      // Fetch user ID after setting the token
      fetchUserIdFromToken(token);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTokenLogin = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      setIsLoggedIn(false);
      setUserId(null); // Reset the user ID when logging out
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setTokenLogin,
        deleteTokenLogin,
        userId,
        setUserId,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
