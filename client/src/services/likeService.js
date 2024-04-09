import axios from "axios";

// Here are all the functions that will be used in the post service.
// The functions will be used to fetch data from the server.
// The functions will also be used to update data in the server.

const API_URL = "http://localhost:3000/posts"; // This is where we define our URL for the API.

// Function to get all likes from a post by post ID
export  async function getLikesByPostId(postId) {
    try {
        const response = await axios.get(`${API_URL}/${postId}/likes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching like data:', error);
        throw error;
    }
}

// Function to add a new like on a post by post ID --> maybe change the request for PUT
export async function giveLikeOnPost(postId, {userId}) {
    try {
        const response = await axios.post(`${API_URL}/${postId}/likes`, {userId});
        return response.data;
    } catch (error) {
        console.error('Error creating new like:', error);
        throw error;
    }
}

// Function to remove a like on a post by post ID --> maybe change the request for PUT
export async function removeLikeOnPost(postId, likeId) {
    try {
        const response = await axios.delete(`${API_URL}/${postId}/likes/${likeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting like:', error);
        throw error;
    }
}