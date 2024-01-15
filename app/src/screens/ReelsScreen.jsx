import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const ReelsScreen = () => {
  return (
    <Container>
      <View>
        <Text style={{ color: "#fff" }}>Here sould be reels but i cant</Text>
      </View>
    </Container>
  );
};

export default ReelsScreen;
