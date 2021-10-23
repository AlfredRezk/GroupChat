import React from 'react'
import { StyleSheet, Text, View, TextInput, Platform, ImageBackground, TouchableOpacity } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';
import { StatusBar } from 'expo-status-bar';
const Chat = (props) => {
  
  const { handleSend, logout, messages, user } = props;
  const imageSource = require("../assets/imgs/chat.jpg")

  return (
    <View style={ styles.container }>
      <StatusBar style="light"/>
			<View style={Platform.OS === "web" ? styles.web : styles.mobile}>
				<ImageBackground source={imageSource} resizeMode="cover" style={styles.background}>
					<GiftedChat
			      messages={messages}
						user={user}
						onSend={handleSend}
						placeholder="Enter your message"
						showUserAvatar
          />
          
					<TouchableOpacity style={styles.button} onPress={logout}>
						<Text style={styles.buttonText}>Leave chat 👋</Text>
					</TouchableOpacity>
				</ImageBackground>
			</View>
		</View>
	);
}

export default Chat

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	web: {
		flex: 1,
		width: "75%",
		marginVertical: 30,
		shadowColor: "#000",
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 40,
		borderRadius: 15,
		overflow: "hidden",
	},

	mobile: {
		flex: 1,
		width: "100%",
  },
  background: {
    flex: 1,
    width:'100%'
  },
	input: {
		borderRadius: 50,
		margin: 50,
	},
	button: {
		backgroundColor: "#ff7f7f",
		position: "absolute",
		right: 15,
		top: 40,
		flex: 1,
		shadowColor: "#000",
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 40,
		elevation: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
	},
});
