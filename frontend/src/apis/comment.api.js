import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/comment",
    withCredentials: true
})

// Lấy ra tất cả comments
export const get_all_comments = async () => {
    try {
        const response = await api.get(`/getcomments`)

        return response
    } catch (error) {
        console.log(error);
    }
}

// Lấy ra các comment của từng bài post
export const get_comments = async (postId) => {
    try {
        const response = await api.get(`/getPostComments/${postId}`)

        return response
    } catch (error) {
        console.log(error);
    }
}

export const get_recent_comments = async (limit) => {
    try {
        const response = await api.get(`/getcomments?limit=${limit}`)

        return response
    } catch (error) {
        console.log(error);
    }
}

// Thêm comment 
export const add_comment = async (formData) => {
    try {
        const response = await api.post("/create", formData)

        return response
    } catch (error) {
        console.log(error);
    }
}

// Chỉnh sửa Comment
export const edit_comment = async (commentId, editedContent) => {
    try {
        const response = await api.put(`/editComment/${commentId}`, { content: editedContent })

        return response
    } catch (error) {
        console.log(error);
    }
}

// 
export const like_comment = async (commentId) => {
    try {
        const response = await api.put(`/likeComment/${commentId}`)

        return response
    } catch (error) {
        console.log(error);
    }
}

// Xóa comment
export const delete_comment_by_commentId = async (commentId) => {
    const response = await api.delete(`/deleteComment/${commentId}`)

    return response
}