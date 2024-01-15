import React from "react";
import styled from "styled-components/native";
import {
  Octicons,
  Ionicons,
  Feather,
  EvilIcons,
  Foundation,
  MaterialIcons,
} from "@expo/vector-icons";
import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";

const Post = styled.View`
  flex-direction: column;
`;

const ContainerPost = styled.View`
  padding-horizontal: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderPost = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 5px;
`;

const ImagePost = styled.Image`
  width: 100%;
  height: 70%;
  object-fit: cover;
`;

const TextSmall = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 14px;
`;

const PostCard = () => {
  return (
    <>
      {/* post */}
      <Post>
        <ContainerPost>
          <HeaderPost>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
              }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                resizeMode: "cover",
              }}
            />
            <TextSmall>Alvinjustkidding</TextSmall>
          </HeaderPost>
          <Feather name="more-horizontal" color="#fff" size={20} />
        </ContainerPost>
        <ImagePost
          source={{
            uri: "https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
      </Post>
    </>
  );
};

export default PostCard;
