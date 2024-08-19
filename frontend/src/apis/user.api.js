import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/user",
    withCredentials: true
})

export const update_user_by_userId = async (formData, userId) => {
    try {
        const response = await api.put(`/update/${userId}`, formData);

        return response
    } catch (error) {
        console.log(error);
        return error.response
    }
}
