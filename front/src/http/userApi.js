import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (username, name, surname, patronymic, role, userClass) => {
    return await $authHost.post('api/user/registration', {username, name, surname, patronymic, role, userClass});
}

export const deleting = async (username) => {
    return await $authHost.post('api/user/deleteUser', {username});
}

export const login = async (username, password) => {
    const {data} = await $host.post('api/user/login', {username, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const page = async (id) => {
    const {data} = await $authHost.get('api/user/id:' + id);
    return data;
}

export const check = async () => {
    const {data} =  await $authHost.post('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}