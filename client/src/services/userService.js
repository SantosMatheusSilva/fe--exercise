import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useParams } from "react-router-dom";
// Here are all the functions that will be used in the user service.
// The functions will be used to fetch data from the server.
// The functions will also be used to update data in the server.



const API_URL = import.meta.API_URL || 'http://localhost:3001/api'; // This is where we define our URL for the API.

// Function to get all users
export async function getAllUsers() {
    
   try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    } 
}

// Function to fetch user data by user ID
export async function getUser(userId) {
    const authToken = localStorage.getItem('authToken') || null;
    try {
        if(!authToken){
            throw new Error('Token not found');
        }
        
        const response = await axios.get(`${API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        if(!response.data){
            throw new Error('User not found');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    } 
}

// Function to update user profile
export async function updateUserProfile(userId, updatedProfileData) {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, updatedProfileData);
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

