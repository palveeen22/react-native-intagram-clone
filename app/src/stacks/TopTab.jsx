import React from "react";
import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Profile tabs screens
const PostsScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Posts</Text>
  </View>
);

const PhotosScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Photos</Text>
  </View>
);

const VideosScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Videos</Text>
  </View>
);

const Tab = createMaterialTopTabNavigator();

const TopTab = () => (
  <Tab.Navigator>
    <Tab.Screen name="Posts" component={PostsScreen} />
    <Tab.Screen name="Photos" component={PhotosScreen} />
    <Tab.Screen name="Videos" component={VideosScreen} />
  </Tab.Navigator>
);

export default TopTab;
