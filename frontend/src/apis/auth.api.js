import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/auth",
    withCredentials: true
})

export const register_user = async (formData) => {
    const response = await api.post('/register', formData);

    return response
}

export const login_user = async (formData) => {
    const response = await api.post('/login', formData);

    return response
}

export const login_with_google = async (formData) => {
    const response = await api.post('/google', formData);

    return response
}

export const logout = async () => {
    const response = await api.post('/logout');

    return response
}