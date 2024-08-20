import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/post",
    withCredentials: true
})

export const create_post = async (formData) => {
    try {
        const response = await api.post('/create', formData);

        return response
    } catch (error) {
        console.log(error);
    }
}

export const getposts = async (userId) => {
    try {
        const response = await api.get(`/getposts?userId=${userId}`);

        return response
    } catch (error) {
        console.log(error);
    }
}