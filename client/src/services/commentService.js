import axios from "axios";

// Here are all the functions that will be used in the post service.
// The functions will be used to fetch data from the server.
// The functions will also be used to update data in the server.

const API_URL = "http://localhost:3000/posts"; // This is where we define our URL for the API.

// Function to get all comments from a post
export async function getCommentsByPostId(postId) {
    try {
        const response = await axios.get(`${API_URL}/${postId}/comments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comment data:', error);
        throw error;
    }
}
// Function to add a new comment on a post
export async function addNewComment(postId, {text, userId}) {
    try {
        const response = await axios.post(`${API_URL}/${postId}/comments`, {text, userId});
        return response.data;
    } catch (error) {
        console.error('Error creating new comment:', error);
        throw error;
    }
}

// Function to edit a comment
export async function editComment({id, text}) {
    try {
        const response = await axios.put(`${API_URL}/${postId}/comments/${id}`, {text});
        return response.data;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
}

// Function to delete a comment
export async function removeComment(commentId) {
    try {
        const response = await axios.delete(`${API_URL}/${postId}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}