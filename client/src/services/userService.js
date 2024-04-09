import axios from "axios";

// Here are all the functions that will be used in the user service.
// The functions will be used to fetch data from the server.
// The functions will also be used to update data in the server.



const API_URL = "http://localhost:3000/users"; // This is where we define our URL for the API.

// Function to get all users
export async function getAllUsers() {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Function to fetch user data by user ID
export async function getUser(userId) {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Function to update user profile
export async function updateUserPProfile(userId, updatedProfileData) {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, updatedProfileData);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}

// Function to delete user
export async function deleteUser(userId) {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}