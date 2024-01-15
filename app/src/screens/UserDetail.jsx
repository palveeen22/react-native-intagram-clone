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
import { GET_USER_ID } from "../../config/queries";
import { LoginContext } from "../../context/LoginContext";

const UserDetail = ({ route }) => {
  const [isFollow, setIsFollow] = useState(false);

  const { userId } = route.params;
  //   console.log(userId, "<<< id");

  const { data, loading, error } = useQuery(GET_USER_ID, {
    variables: {
      profileUserId: userId,
    },
  });

  const userDetail = data?.profileUser?.data || {};

  // Calculate total followers and following
  const totalFollowers = userDetail.Followers ? userDetail.Followers.length : 0;
  const totalFollowing = userDetail.Following ? userDetail.Following.length : 0;
  const totalPost = userDetail.Posts || [];

  const onFollow = () => {
    setIsFollow(!isFollow);
    console.log("follow");
  };

  //   console.log(totalPost, "<<<<");
  //   console.log("Total Followers:", totalFollowers);
  //   console.log("Total Following:", totalFollowing);

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <ContainerHeader>
            <HeaderLeft>
              <Title>{userDetail?.username}</Title>
              <EvilIcons name="chevron-down" color="#a6a6a6" size={30} />
            </HeaderLeft>
            <HeaderRight>
              <Octicons name="diff-added" color="#fff" size={25} />
              <Feather name="menu" color="#fff" size={25} />
            </HeaderRight>
          </ContainerHeader>

          <ContainerProfile>
            <ContainerImage>
              <Image
                source={{
                  uri:
                    userDetail?.profilePicture ||
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
                <TextSmall>12</TextSmall>
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
            <TextBio>{userDetail?.name}</TextBio>
            <TextStory>Цирк</TextStory>
            <TextStory>📍 307 Code</TextStory>
            <TextStory>🌴🥥🏄🏻‍♂️🧘🏻‍♂️🦦🕺🏻🛹🌯🧑‍💻</TextStory>
          </ContainerBio>

          <NavFollow>
            {isFollow ? (
              <ButtonFollow onPress={onFollow}>
                <Text style={{ color: "#fff" }}>You followed</Text>
              </ButtonFollow>
            ) : (
              <ButtonFollowed onPress={onFollow}>
                <Text style={{ color: "#fff" }}>Follow</Text>
              </ButtonFollowed>
            )}
            <ButtonFollow>
              <Text style={{ color: "#fff" }}>Message</Text>
            </ButtonFollow>
          </NavFollow>

          <ContainerDown>
            <NavIconDown>
              <Feather name="grid" color="#fff" size={23} />
              <Feather name="film" color="#fff" size={23} />
              <Feather name="user" color="#fff" size={23} />
            </NavIconDown>

            <HorizontalBorder></HorizontalBorder>

            <ContainerPostDown>
              {totalPost?.map((e) => {
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

export default UserDetail;

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

const ButtonFollowed = styled.TouchableOpacity`
  background-color: #0064e0;
  width: 50%;
  border-radius: 5px;
  align-items: center;
  padding: 5px;
`;

const ContainerPostDown = styled.View`
  flex-direction: row;
  justify-content: start;
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
  padding-top: 5px;
  border-bottom-width: 0.5;
  border-bottom-color: #fff;
`;
