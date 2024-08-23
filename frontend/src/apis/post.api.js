import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/post",
    withCredentials: true
})

// Lấy ra tất cả bài post
export const get_all_posts = async (userId) => {
    const response = await api.get(`/getposts?userId=${userId}`);

    return response
}

export const get_posts = async () => {
    try {
        const response = await api.get(`/getposts`);

        return response
    } catch (error) {
        console.log(error);
    }
}

export const get_posts_by_searchQuery = async (searchQuery) => {
    try {
        const response = await api.get(`/getposts?${searchQuery}`);

        return response
    } catch (error) {
        console.log(error);
    }
}

// Lấy ra các bài post với limit
export const get_recent_posts_with_limit = async (limit) => {
    const response = await api.get(`/getposts?limit=${limit}`);

    return response
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

// Tạo post
export const create_post = async (formData) => {
    try {
        const response = await api.post('/create', formData);

        return response
    } catch (error) {
        console.log(error);
    }
}

// Cập nhật post
export const update_post = async (formData, userId) => {
    const response = await api.put(`/updatepost/${formData._id}/${userId}`, formData);

    return response
}

// Xóa post
export const delete_post_by_postId = async (postIdToDelete, userId) => {
    const response = await api.delete(`/deletepost/${postIdToDelete}/${userId}`);

    return response
}