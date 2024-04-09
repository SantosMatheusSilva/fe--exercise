import axios from "axios";

// Here are all the functions that will be used in the post service.
// The functions will be used to fetch data from the server.
// The functions will also be used to update data in the server.

const API_URL = "http://localhost:3000/posts"; // This is where we define our URL for the API.

// Follower:
// Function to get all followers from a user by user ID
export async function getFollowersByUserId(userId) {
    try {
        const response = await axios.get(`${API_URL}/${userId}/followers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching follower data:', error);
        throw error;
    }
}

// Function to remove a follower from a user by user ID
export async function removeFollower(userId, {userId: unfollowedId}) {
    try {
        const response = await axios.delete(`${API_URL}/${userId}/followers/${unfollowedId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing follower:', error);
        throw error;
    }
}



// Following:
// Function to get all following users from a user by user ID
export async function getFollowingByUserId(userId) {
    try {
        const response = await axios.get(`${API_URL}/${userId}/following`);
        return response.data;
    } catch (error) {
        console.error('Error fetching following data:', error);
        throw error;
    }
}

// Functtion to unfollow a user by user ID 
export async function removeFromFollowing(userId, {userId: unfollowedId}) {
    try {
        const response = await axios.delete(`${API_URL}/${userId}/following/${unfollowedId}`);
        return response.data;
    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
}

// Function to add a new following on a user by user ID
export async function addToFollowing(userId, {userId: followedId}) {
    try {
        const response = await axios.post(`${API_URL}/${userId}/followers`);
        return response.data;
    } catch (error) {
        console.error('Error creating new following:', error);
        throw error;
    }
}

// Function to add a new follower on a user by user ID
/* export async function addNewFollower(userId, {userId: followerId}) {
    try {
        const response = await axios.post(`${API_URL}/${userId}/followers`, {followerId});
        return response.data;
    } catch (error) {
        console.error('Error creating new follower:', error);
        throw error;
    }
}
 */
// Function to unfollow a user by user ID
/*  export async function unfollowUser(userId, {userId: unfollowedId}) {
   try {
        const response = await axios.delete(`${API_URL}/${userId}/followers/${unfollowedId}`);
        return response.data;
    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
} */