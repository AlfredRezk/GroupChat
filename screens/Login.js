import React, { useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Platform} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';

const backgroundImage = require("../assets/imgs/bg3.jpg");

const Login = (props) => {
  
  const { setUser} = props
  const [name, setName] = useState("");
  
  const addUser = async () => {
    if (name) {
      const _id = Math.random().toString(36).substring(7);
      const user = { _id, name };
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);      
    }
	};


  return (


    <ImageBackground source={backgroundImage} style={ styles.container}>
         <StatusBar style="light"/>
      <View style={ styles.platform}>
        <View style={styles.header}>
          <Text style={styles.title}> GROUP 
              <Text style={{ color: "lightgreen" }}> CHAT</Text>
          </Text>
          <Ionicons name="ios-chatbox-ellipses" size={120} color="lightgreen" />
        </View>
        
        <View style={ styles.inputContainer }>
          <TextInput style={ [styles.input, Platform.OS === 'web' && { outlineStyle: 'none' }] }
            placeholder="Enter Your name" value={ name }
            onChangeText={ setName } onSubmitEditing={ addUser }
          />
          <TouchableOpacity style={styles.button} onPress={addUser}>
            <Text style={styles.buttonText}>Enter Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
		</ImageBackground>
	);
}

export default Login

const styles = StyleSheet.create({
	container: {
    flex: 1,
    width:'100%',
    alignItems: "center",
	},

  platform: {
    flex: 1,
    width: Platform.OS == 'web' ? '60%' : '100%',
  },
 
	header: {
    marginTop: 60,
    marginBottom:50,
		alignItems: "center",
		justifyContent: "center",
	},


	title: {
		fontSize: 45,
		fontWeight: "bold",
		color: "#fff",
	},

	inputContainer: {
		flex: 1,
    alignItems: "center",
    marginTop:20
	},

	input: {
		height: 50,
		width: "80%",
		padding: 15,
		marginBottom: 20,
		backgroundColor: "#fff",
		borderRadius: 15,
		fontSize: 18,
		textAlign: "center",
	},
	button: {
		borderRadius: 15,
		overflow: "hidden",
		backgroundColor: "darkgreen",
		paddingVertical: 15,
		paddingHorizontal: 40,
		fontSize: 18,
    fontWeight: "bold",
    elevation:3
	},
	buttonText: {
		fontSize: 16,
    color:'#fff'
	},
});
