import {createContext} from 'react';
import axios from 'axios';
import {BASE_URL} from './config';

export const UserContext = createContext();

export async function userLogin(email, password) {
	let loginResult = await axios.post(BASE_URL + '/auth/login', {
		email,
		password,
	}, {withCredentials: true}).then(res => {
		return res.status == 200;
	});

	if (loginResult) {
		return await userCurrentInfo();
	}

	return loginResult;

}

export async function userSignup(email, firstName, lastName, birthdate, password) {
	let signupResult = await axios.post(BASE_URL + '/auth/signup', {
		email,
		"first_name": firstName,
		"last_name": lastName,
		"birthdate": "2000-01-10",
		password,
	}, {withCredentials: true}).then(res => {
		return res.status == 200;
	});

	if (signupResult) {
		return await userCurrentInfo();
	}

	return signupResult;
}

export async function userCurrentInfo() {
	return await axios.get(BASE_URL + '/auth/whoami', {withCredentials: true}).then(res => {
		return res.data?.__data__
	});
}

export async function getUserInfo(id) {
	return await axios.get(BASE_URL + `/auth/user/${id}`, {withCredentials: true}).then(res => {
		return res.data?.data?.__data__
	});
}

export async function userLogout() {
	return await axios.get(BASE_URL + '/auth/logout', {withCredentials: true}).then(res => {
		return res.data?.__data__
	});
}