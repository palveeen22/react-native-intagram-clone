import React, { useState, useContext } from "react";
import {
  Image,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useMutation } from "@apollo/client";
import { GET_HOMESCREEN, POST_CREATE } from "../../config/queries";
import { LoginContext } from "../../context/LoginContext";

const PostScreen = ({ navigation }) => {
  const { userId } = useContext(LoginContext); // Assuming your context provides userId

  const [form, setForm] = useState({
    content: "",
    description: "",
    imgUrl: "",
    tags: "",
  });

  const [addPost, { loading, error }] = useMutation(POST_CREATE, {
    onCompleted: () => {
      navigation.navigate("HomeTab"); // Navigate to the "HomeTab" screen
      Alert.alert("Success", "Your post has been added!");
    },
    onError: (err) => {
      Alert.alert("Error", "Failed to create post");
      console.error(err);
    },
    refetchQueries: [GET_HOMESCREEN], // Refetch the correct query
  });

  const onChangeForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const onCreate = async () => {
    try {
      const payload = {
        ...form,
        // like: [],
        // comment: [],
        authorId: "",
      };
      console.log(payload, "<<< payload create");
      // navigation.navigate("Home");
      await addPost({
        variables: {
          input: payload,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Add captions or polls..."
          placeholderTextColor="#fff"
          value={form.content}
          onChangeText={(text) => onChangeForm("content", text)}
        />
      </View>

      <View style={styles.inputViewDesc}>
        <TextInput
          style={styles.inputText}
          placeholder="Share your description..."
          placeholderTextColor="#fff"
          value={form.description}
          onChangeText={(text) => onChangeForm("description", text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Image URL for your post..."
          placeholderTextColor="#fff"
          value={form.imgUrl}
          onChangeText={(text) => onChangeForm("imgUrl", text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Share your tags..."
          placeholderTextColor="#fff"
          value={form.tags}
          onChangeText={(text) => onChangeForm("tags", text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={onCreate}>
        <Text style={styles.loginText}>Share</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },

  contentContainerOuter: {
    flex: 1,
    flexDirection: "column",

    padding: 10,
    gap: 5,
  },
  contentContainerInner: {
    flex: 1,
    flexDirection: "blue",
    padding: 10,
    gap: 5,
  },
  imageCover: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageFix: {
    width: 300,
    height: 200,
    objectFit: "cover",
    borderRadius: 10,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },

  inputViewDesc: {
    width: "100%",
    height: "30%",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 10,
    // marginBottom: 20,
    // justifyContent: "center",
    padding: 20,
  },

  inputView: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 10,
    height: 50,
    // marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 30,
    color: "#fff",
    fontWeight: "300",
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#4c68d7",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "#ffffff",
    fontWeight: "500",
  },
});
