import React, { useState, useEffect, useCallback} from 'react';
import {YellowBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GiftedChat } from "react-native-gifted-chat";

import { db } from './firebase';
import Login from './screens/Login'
import Chat from './screens/Chat'

YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])
const chatRef = db.collection('chats');

export default function App() {
	// setup states
	const [user, setUser] = useState(null);
	const [messages, setMessages] = useState([]);

	// Read User from local storage
	const readUser = async () => {
		const user = await AsyncStorage.getItem("user");
		user && setUser(JSON.parse(user));
	};

	// Remove User from local storage
	const logout = async () => {
		await AsyncStorage.removeItem("user");
		setUser(null);
	};

	const sendMessage = async (message) => {
		const writes = message.map((m) => chatRef.add(m));
		try {
			await Promise.all(writes);
		} catch (err) {
			console.log(err);
		}
	};

	// Fetch messages from Firestore
	const fetchMessages = () => {
		return chatRef.onSnapshot((query) => {
			const msgs = query
				.docChanges()
				.filter(({ type }) => type === "added")
				.map(({ doc }) => {
					const message = doc.data();
					return { ...message, createdAt: message.createdAt.toDate() };
				})
				.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
			setMessages((prev) => GiftedChat.append(prev, msgs));
		});
	};

	useEffect(() => {
		readUser();
    const unsubscribe = fetchMessages();
    
		return unsubscribe;
	}, []);

	// Render Page
	return !user ? (
		<Login setUser={setUser} />
	) : (
		<Chat
			logout={logout}
			handleSend={sendMessage}
			messages={messages}
			user={user}
		/>
	);
}
