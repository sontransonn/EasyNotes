import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/user",
    withCredentials: true
})

export const get_users = async () => {
    try {
        const response = await api.get("/getusers");

        return response
    } catch (error) {
        console.log(error);
    }
}

export const get_recent_users = async () => {
    try {
        const response = await api.get(`/getusers?limit=5`);

        return response
    } catch (error) {
        console.log(error);
    }
}

export const get_user_by_userId = async (userId) => {
    try {
        const response = await api.get(`/${userId}`);

        return response
    } catch (error) {
        console.log(error);
    }
}

export const update_user_by_userId = async (formData, userId) => {
    try {
        const response = await api.put(`/update/${userId}`, formData);

        return response
    } catch (error) {
        console.log(error);
    }
}

export const delete_user_by_userId = async (userId) => {
    try {
        const response = await api.delete(`/delete/${userId}`);

        return response
    } catch (error) {
        console.log(error);
    }
}
