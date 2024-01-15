import React, { useState } from "react";
import styled from "styled-components/native";
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
	ScrollView,
	TouchableOpacity,
} from "react-native";
import timeChange from "../utils/timeChange";

//here for gql
import { useQuery } from "@apollo/client";
import { GET_HOMESCREEN } from "../../config/queries";

const HomeScreen = ({ navigation }) => {
	const [isLike, setIsLike] = useState(false);

	const { data, loading, error } = useQuery(GET_HOMESCREEN, {
		variables: {
			getMeId: "",
		},
	});

	const dataUsers = data?.getAllUsers?.data || [];
	const dataPost = data?.getPosts || [];
	const getMe = data?.getMe?.data || [];
	// console.log(getMe);

	const onLike = () => {
		setIsLike(!isLike);
		console.log("like");
	};

	const onPressItem = (user) => {
		navigation.navigate("Post-Detail", { postId: user });
		console.log(user);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
			<ScrollView contentContainerStyle={{ flex: 1 }} vertical={true}>
				<ContainerHeader>
					<HeaderLeft>
						<Title>Instagram</Title>
						<EvilIcons name="chevron-down" color="#a6a6a6" size={30} />
					</HeaderLeft>
					<HeaderRight>
						<MaterialIcons name="favorite-border" color="#fff" size={25} />
						<Ionicons
							name="chatbubble-ellipses-outline"
							color="#fff"
							size={25}
						/>
					</HeaderRight>
				</ContainerHeader>

				{/* story  */}
				<ContainerStory>
					<ScrollView horizontal={true}>
						<HeaderLeft>
							<ContainerImage>
								<Image
									source={{
										uri:
											getMe?.profilePicture ||
											"https://www.pitzer.edu/staffcouncil/wp-content/uploads/sites/47/2021/11/nonprofile.png",
									}}
									style={{
										width: 75,
										height: 75,
										borderRadius: 50,
										resizeMode: "cover",
									}}
								/>
								<TextStory>You</TextStory>
							</ContainerImage>
							{dataUsers?.map((e) => {
								return (
									<ContainerImage>
										<Image
											source={{
												uri: e?.profilePicture,
											}}
											style={{
												width: 75,
												height: 75,
												borderRadius: 50,
												resizeMode: "cover",
											}}
										/>
										<TextStory>{e?.username}</TextStory>
									</ContainerImage>
								);
							})}
						</HeaderLeft>
					</ScrollView>
				</ContainerStory>

				<ContainerPostBig>
					{dataPost?.data?.map((e) => {
						return (
							<Post>
								<ContainerPost>
									<HeaderPost>
										<Image
											source={{
												uri: e?.Author?.profilePicture,
											}}
											style={{
												width: 35,
												height: 35,
												borderRadius: 50,
												resizeMode: "cover",
											}}
										/>
										<TextSmall>{e?.Author?.username}</TextSmall>
									</HeaderPost>
									<Feather name="more-horizontal" color="#fff" size={20} />
								</ContainerPost>
								<TouchableOpacity onPress={() => onPressItem(e?._id)}>
									<ImagePost
										source={{
											uri: e?.imgUrl,
										}}
										onPress={() => onPressItem(e?._id)}
									/>
								</TouchableOpacity>
								<View style={{ flexDirection: "column" }}>
									<HeaderRight>
										<HeaderPostDown>
											<TouchableOpacity onPress={onLike}>
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
								</View>
							</Post>
						);
					})}
				</ContainerPostBig>
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

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
	gap: 15px;
`;

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

const ContainerImage = styled.View`
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

const TextStory = styled.Text`
	color: #fff;
	font-weight: 400;
	font-size: 12px;
`;

const ContainerStory = styled.View`
	flex-direction: row;
	align-items: center;
	padding-top: 5px;
	margin: 10px;
`;

const Post = styled.View`
	flex-direction: column;
	margin-top: 10px;
	gap: 10px;
	margin-bottom: 5px;
`;

const ContainerPost = styled.View`
	padding-horizontal: 10px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const ContainerDesc = styled.View`
	padding-horizontal: 10px;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	gap: 5px;
	margin: 5px;
`;

const HeaderPost = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
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

{
	/* <View style={{ flexDirection: "column" }}>
                    <TextSmall>{e?.Author?.username}</TextSmall>
                    <TextSmall2>{e?.description}</TextSmall2>
                    <TextSmall>{e?.Author?.username}</TextSmall>
                    <TextSmall2>{e?.description}</TextSmall2>
                  </View> */
}
