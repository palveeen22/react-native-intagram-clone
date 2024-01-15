import styled from "styled-components/native";
import { Image, Text } from "react-native";
import { Octicons, Ionicons, Feather, Foundation } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReelsScreen from "../screens/ReelsScreen";
import PostScreen from "../screens/PostScreen";
import SearchScreen from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();
import { gql, useQuery } from "@apollo/client";
import { GET_PROFILE } from "../../config/queries";

const ButtonTab = () => {
  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: { getMeId: "" },
  });

  const profile = data?.getMe?.data || [];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#000" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          //   tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "home" : "home";
            const iconColor = focused ? "#fff" : "#fff";
            return <Foundation name={iconName} color={iconColor} size={24} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "search" : "search";
            const iconColor = focused ? "#fff" : "#fff";
            return <Ionicons name={iconName} color={iconColor} size={24} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Posts"
        component={PostScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "diff-added" : "diff-added";
            const iconColor = focused ? "#fff" : "#fff";
            return <Octicons name={iconName} color={iconColor} size={24} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Reels"
        component={ReelsScreen}
        options={{
          //   tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused ? "film" : "film";
            const iconColor = focused ? "#fff" : "#fff";
            return <Feather name={iconName} color={iconColor} size={24} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const imageSource = focused
              ? {
                  uri:
                    profile?.profilePicture ||
                    "https://www.pitzer.edu/staffcouncil/wp-content/uploads/sites/47/2021/11/nonprofile.png",
                }
              : {
                  uri:
                    profile?.profilePicture ||
                    "https://www.pitzer.edu/staffcouncil/wp-content/uploads/sites/47/2021/11/nonprofile.png",
                };
            return (
              <Image
                source={imageSource}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  resizeMode: "cover",
                }}
              />
            );
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default ButtonTab;
