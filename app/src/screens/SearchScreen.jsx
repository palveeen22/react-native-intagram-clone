import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { EvilIcons } from "@expo/vector-icons";
import { SEARCH } from "../../config/queries";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data, loading, error, refetch } = useQuery(SEARCH, {
    variables: { query: searchQuery },
  });

  // console.log(data, "xoxoxo");

  useEffect(() => {
    refetch();
  }, [searchQuery, refetch]);

  useEffect(() => {
    if (data && data.searchUsers) {
      setSearchResults(data.searchUsers);
    }
  }, [data]);

  const handleSearch = () => {
    console.log("Search button pressed:", searchQuery);
  };

  const onPressItem = (user) => {
    navigation.navigate("User-Detail", { userId: user });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerSearch}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Добавьте подписи или опрос..."
            placeholderTextColor="#fff"
            placeholderStyle={{ fontSize: 10 }} // Adjust the font size here
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>
        <TouchableOpacity onPress={handleSearch}>
          <EvilIcons name="search" color="#fff" size={40} />
        </TouchableOpacity>
      </View>
      <View style={styles.fieldSearch}>
        {data?.searchUsers?.map((e) => {
          return (
            <TouchableOpacity onPress={() => onPressItem(e?._id)}>
              <HeaderPost>
                <Image
                  source={{
                    uri:
                      e?.profilePicture ||
                      "https://www.pitzer.edu/staffcouncil/wp-content/uploads/sites/47/2021/11/nonprofile.png",
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    resizeMode: "cover",
                  }}
                />
                <View>
                  <TextSmall>{e?.username}</TextSmall>
                  <TextSmall2>{e?.name}</TextSmall2>
                </View>
              </HeaderPost>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#000",
    gap: 30,
  },

  containerSearch: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },

  inputView: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ececec",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 30,
    color: "#fff",
    fontWeight: "300",
  },

  fieldSearch: {
    flex: 1,
    backgroundColor: "#000",
  },
});

const HeaderPost = styled.View`
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 10px;
  padding: 5px;
`;

const TextSmall = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 20px;
`;

const TextSmall2 = styled.Text`
  color: #fff;
  font-weight: 300;
  font-size: 15px;
`;
