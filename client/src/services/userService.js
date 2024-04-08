import axios from "axios";

//
const API_URL = "http://localhost:3000/users";
// Function to get all users

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

//