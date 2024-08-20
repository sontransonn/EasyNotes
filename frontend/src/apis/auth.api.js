import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/auth",
    withCredentials: true
})

export const register_user = async (formData) => {
    try {
        const response = await api.post('/register', formData);

        return response
    } catch (error) {
        console.log(error);
        return error.response
    }
}

export const login_user = async (formData) => {
    try {
        const response = await api.post('/login', formData);

        return response
    } catch (error) {
        console.log(error);
        return error.response
    }
}

export const google = async (formData) => {
    try {
        const response = await api.post('/google', formData);

        return response
    } catch (error) {
        console.log(error);
    }
}

export const logout = async () => {
    try {
        const response = await api.post('/logout');

        return response
    } catch (error) {
        console.log(error);
    }
}