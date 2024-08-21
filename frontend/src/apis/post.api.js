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

export const get_post_by_postId = async (postId) => {
    try {
        const response = await api.get(`/getposts?postId=${postId}`);

        return response
    } catch (error) {
        console.log(error);
    }
}

export const get_post_by_postSlug = async (postSlug) => {
    try {
        const response = await api.get(`/getposts?slug=${postSlug}`);

        return response
    } catch (error) {
        console.log(error);
    }
}

export const update_post = async (formData, userId) => {
    try {
        const response = await api.put(`/updatepost/${formData._id}/${userId}`, formData);

        return response
    } catch (error) {
        console.log(error);
    }
}

export const deletepost = async (postIdToDelete, userId) => {
    try {
        const response = await api.delete(`/deletepost/${postIdToDelete}/${userId}`);

        return response
    } catch (error) {
        console.log(error);
    }
}