import {$authHost, $host} from "./index";

export const createGrade = async (username, subject, value) => {
    return await $authHost.post('api/grades/createGrade', {username, subject, value});
}

export const fetchClasses = async () => {
    const {data} = await $authHost.get('api/grades/classes');
    return data;
}

export const fetchAllGrades = async () => {
    const {data} = await $authHost.get('api/grades/allGrades');
    return data;
}

export const fetchGrades = async (classId) => {
    const {data} = await $authHost.get('api/grades/grades/' + classId);
    return data;
}