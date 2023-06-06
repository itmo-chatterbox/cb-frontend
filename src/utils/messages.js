import axios from 'axios';
import {BASE_URL} from './config';
import {userCurrentInfo} from './users';

export async function getChats() {
	return await axios.get(BASE_URL + '/messages/chats', {withCredentials: true}).then(res => {
		return res.data;
	});
}

export async function getMessages(chat) {
	return await axios.get(BASE_URL + `/messages/dialogue/${chat}`, {withCredentials: true}).then(res => {
		return res.data;
	});
}

export async function sendMessage(chat, text) {
	return await axios.post(BASE_URL + `/messages/dialogue/${chat}/send`, {
		chat, text
	}, {withCredentials: true}).then(res => {
		return res.data;
	});
}