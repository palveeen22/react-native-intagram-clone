import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { Octicons, Feather, EvilIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//here for gql
import { gql, useQuery } from "@apollo/client";
import { GET_PROFILE } from "../../config/queries";
import { LoginContext } from "../../context/LoginContext";

const ProfileScreen = () => {
  const { userId, deleteTokenLogin } = useContext(LoginContext);
  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: { getMeId: "" },
    refetchQueries: [GET_PROFILE],
  });

  const profile = data?.getMe?.data || [];

  // Calculate total followers and following
  const totalPost = profile.Post ? profile.Post.length : 0;
  const posts = profile.Posts || {};
  const totalFollowers = profile.Followers ? profile.Followers.length : 0;
  const totalFollowing = profile.Following ? profile.Following.length : 0;

  const logout = async () => {
    await deleteTokenLogin();
    // navigation.replace("Login");
  };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <ContainerHeader>
            <HeaderLeft>
              <Title>{profile?.username}</Title>
              <EvilIcons name="chevron-down" color="#a6a6a6" size={30} />
            </HeaderLeft>
            <HeaderRight>
              <Octicons name="diff-added" color="#fff" size={25} />
              <TouchableOpacity onPress={logout}>
                <Feather name="menu" color="#fff" size={25} />
              </TouchableOpacity>
            </HeaderRight>
          </ContainerHeader>

          <ContainerProfile>
            <ContainerImage>
              <Image
                source={{
                  uri:
                    profile?.profilePicture ||
                    "https://www.pitzer.edu/staffcouncil/wp-content/uploads/sites/47/2021/11/nonprofile.png",
                }}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 50,
                  resizeMode: "cover",
                }}
              />
            </ContainerImage>

            <ContainerText>
              <TextFollow>
                <TextSmall>{totalPost}</TextSmall>
                <TextStory>Публикации</TextStory>
              </TextFollow>
              <TextFollow>
                <TextSmall>{totalFollowers}</TextSmall>
                <TextStory>Подписчики</TextStory>
              </TextFollow>
              <TextFollow>
                <TextSmall>{totalFollowing}</TextSmall>
                <TextStory>Подписки</TextStory>
              </TextFollow>
            </ContainerText>
          </ContainerProfile>

          <ContainerBio>
            <TextBio>{profile?.name}</TextBio>
            <TextStory>Цирк</TextStory>
            <TextStory>📍 307 Code</TextStory>
            <TextStory>🌴🥥🏄🏻‍♂️🧘🏻‍♂️🦦🕺🏻🛹🌯🧑‍💻</TextStory>
          </ContainerBio>

          <NavFollow>
            <ButtonFollow>
              <Text style={{ color: "#fff" }}>Edit Profile</Text>
            </ButtonFollow>
            <ButtonFollow>
              <Text style={{ color: "#fff" }}>Share Profile</Text>
            </ButtonFollow>
          </NavFollow>

          <ContainerDown>
            <NavIconDown>
              <Feather name="grid" color="#fff" size={23} />
              <Feather name="film" color="#fff" size={23} />
              <Feather name="user" color="#fff" size={23} />
            </NavIconDown>

            {/* <HorizontalBorder></HorizontalBorder> */}

            <ContainerPostDown>
              {posts?.map((e) => {
                return (
                  <ImageWrapper>
                    <Image
                      source={{
                        uri: e?.imgUrl,
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </ImageWrapper>
                );
              })}
            </ContainerPostDown>
          </ContainerDown>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default ProfileScreen;

const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 18px;
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const HeaderRight = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const TextFollow = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
`;

const Title = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 25px;
`;

const TextSmall = styled.Text`
  color: #fff;
  font-weight: 500;
  font-size: 15px;
`;

const ContainerProfile = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  gap: 10px;
`;

const ContainerImage = styled.View`
  flex-direction: row;
  justify-content: start;
  align-items: start;
  width: 30%;
  padding: 10px;
  gap: 10px;
`;

const ContainerText = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  gap: 18px;
`;

const TextStory = styled.Text`
  color: #fff;
  font-weight: 300;
  font-size: 12.5px;
`;

const ContainerBio = styled.View`
  flex-direction: column;
  justify-content: start;
  margin-top: 5px;
  padding-horizontal: 18px;
  gap: 4px;
`;

const TextBio = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 15px;
`;

const ContainerDown = styled.View`
  flex-direction: column;
  justify-content: start;
  margin-top: 15px;
  padding-horizontal: 18px;
  gap: 4px;
`;

const NavIconDown = styled.View`
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
`;

const ContainerPostDown = styled.View`
  flex-direction: row;
  justify-content: center;
  /* margin-bottom: 10px; */
  gap: 4px;
`;

const ImageWrapper = styled.View`
  margin-top: 5px;
  width: 36%;
  height: 75%;
  object-fit: cover;
`;
const HorizontalBorder = styled.View`
  border-bottom-width: 0.5;
  border-bottom-color: #fff;
`;

const ImageComponent = styled.Image`
  width: 100%;
  height: 100%;
  /* border-radius: 5px; */
`;

const NavFollow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
  padding: 15px;
`;

const ButtonFollow = styled.TouchableOpacity`
  background-color: #3d3d3d;
  width: 50%;
  border-radius: 5px;
  align-items: center;
  padding: 5px;
`;
