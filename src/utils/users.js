import {createContext} from 'react';
import axios from 'axios';
import {BASE_URL} from './config';

export const UserContext = createContext();
export const noPhotoURL = "https://vk.com/images/camera_200.png"

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
    return await axios.get(BASE_URL + `/users/get/${id}`, {withCredentials: true}).then(res => {
        return res.data?.data?.__data__
    });
}

export async function userLogout() {
    return await axios.get(BASE_URL + '/auth/logout', {withCredentials: true}).then(res => {
        return res.data?.__data__
    });
}

export async function editMainData(firstName, lastName, email, about) {
    let editResult = await axios.post(BASE_URL + '/edit/main_data', {
        email,
        "first_name": firstName,
        "last_name": lastName,
        "birthdate": "2000-01-10",
        "about": about
    }, {withCredentials: true}).then(res => {
        return res.status == 200;
    });

    if (editResult) {
        return await userCurrentInfo();
    }

    return editResult;
}

export async function editPassword(password) {
    let editResult = await axios.post(BASE_URL + '/edit/password', {
        password
    }, {withCredentials: true}).then(res => {
        return res.status == 200
    })

    if (editResult) {
        return await userCurrentInfo();
    }

    return editResult;
}

export async function editStatus(status) {
    let editResult = await axios.post(BASE_URL + '/edit/status', {
        status
    }, {withCredentials: true}).then(res => {
        return res.status == 200
    })
}

export async function updatePhoto(file) {
    let formData = new FormData();
    formData.append('file', file);

    let updateResult = await axios.post(BASE_URL + '/edit/photo', formData, {
        withCredentials: true, headers: {
            'content-type': "multipart/form-data",
        }
    }).then(res => {
        return res.status == 200
    })
}

export async function getByName(name) {
    return await axios.get(BASE_URL + `/users/get_by_name?name=${name}`, {withCredentials: true}).then(res => {
        return res.data
    })
}