import React, { useState } from "react";
import {
  Ionicons,
  Feather,
  EvilIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styled from "styled-components/native";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_POST_ID, CREATE_LIKE, CREATE_COMMENT } from "../../config/queries";

const PostDetailScreen = ({ route }) => {
  const { postId } = route.params;
  const [isLike, setIsLike] = useState(false);
  const [commentContent, setCommentContent] = useState(""); // Added missing state for comment content
  const { data, loading, error } = useQuery(GET_POST_ID, {
    variables: { getPostByIdId: postId },
  });

  const onLike = () => {
    setIsLike(!isLike);
    console.log("like");
  };

  const [
    CreateLike,
    { data: mutateData, loading: mutateLoading, error: mutateError },
  ] = useMutation(CREATE_LIKE, {
    onCompleted: async (res) => {
      console.log(res, "CREATE LIKE");
    },
  });

  const [
    CreateComment,
    {
      data: mutateCommentData,
      loading: mutateCommentLoading,
      error: mutateCommentError,
    },
  ] = useMutation(CREATE_COMMENT, {
    onCompleted: async (res) => {
      console.log(res, "CREATE COMMENT");
    },
  });

  const addComment = async () => {
    console.log("Add Comment");
    try {
      await CreateComment({
        variables: {
          updatePostCommentId: postId,
          payload: {
            content: commentContent,
            username: "", // You may replace this with the actual username logic
            createdAt: null,
            updatedAt: null,
          },
        },
      });
      // Reset comment content after submitting
      setCommentContent("");
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async () => {
    console.log("Like Post");
    try {
      await CreateLike({
        variables: {
          updatePostLikeId: postId,
          payload: {
            username: "",
            createdAt: null,
            updatedAt: null,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const post = data?.getPostById?.data;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={{ flex: 1 }} vertical={true}>
        <ContainerPostBig>
          <Post>
            <ImagePost
              source={{
                uri: post?.imgUrl,
              }}
            />
            <View style={{ flexDirection: "column" }}>
              <HeaderRight>
                <HeaderPostDown>
                  <TouchableOpacity onPress={likePost}>
                    <MaterialIcons
                      name={isLike ? "favorite-border" : "favorite"}
                      color={isLike ? "#fff" : "red"}
                      size={28}
                    />
                  </TouchableOpacity>
                  <Feather name="message-circle" color="#fff" size={28} />
                  <Feather name="send" color="#fff" size={28} />
                </HeaderPostDown>
                <Feather name="bookmark" color="#fff" size={28} />
              </HeaderRight>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <TextSmall>{post?.content}</TextSmall>
                <TextSmall2>{post?.description}</TextSmall2>
              </View>
            </View>
          </Post>
        </ContainerPostBig>
        <View style={{ padding: 10 }}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Share your comment..."
              placeholderTextColor="#fff"
              onChangeText={(text) => setCommentContent(text)}
              value={commentContent}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={addComment}>
            <Text style={styles.loginText}>Add Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostDetailScreen;

const HeaderRight = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const Title = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 25px;
`;

const TextSmall = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 14px;
`;

const TextSmall2 = styled.Text`
  color: #fff;
  font-weight: 400;
  font-size: 14px;
`;

const Post = styled.View`
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
  margin-bottom: 5px;
`;

const HeaderPostDown = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  gap: 20px;
`;

const ImagePost = styled.Image`
  width: 100%;
  height: 80%;
  object-fit: cover;
  border-radius: 3px;
`;

const ContainerPostBig = styled.View`
  flex: 1;
`;

const styles = StyleSheet.create({
  inputView: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 10,
    height: 50,
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    padding: 20,
  },
  inputText: {
    height: 30,
    color: "#fff",
    fontWeight: "300",
  },
});
