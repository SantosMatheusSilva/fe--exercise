import axios from "axios";

// Here are all the functions that will be used in the post service.
// The functions will be used to fetch data from the server.
// The functions will also be used to update data in the server.

const API_URL = "http://localhost:3000/posts"; // This is where we define our URL for the API.

// Function to get all posts
export async function getAllPosts() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post data:', error);
        throw error;
    }
}

// Function to fetch post data by post ID
export async function getPostById(id){
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post data:', error);
        throw error;
    }
}

// Function to fetch post data by user ID
export async function getPostsByUserId(userId) {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post data:', error);
        throw error;
    }
}

// Function to create a new post
export async function addNewPost({ imageUrl, text, userId }) {
    try {
        const response = await axios.post(`${API_URL}`, { imageUrl, text, userId });
        return response.data;
    } catch (error) {
        console.error('Error creating new post:', error);
        throw error;
    }
}

// Function to update a post
export async function editPost(id, {imageUrl, text}) {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { imageUrl, text });
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

// Function to delete a post
export async function removePost(id) {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}