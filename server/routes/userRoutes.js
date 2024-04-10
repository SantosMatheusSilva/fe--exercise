const express = require('express');
const router = express.Router();
const {isAuthenticated} =  require ("../middleware/jwt.middleware.js");
const db = require('../db.json'); 


// User routes bellow:
// Route to get all users
router.get("/users", (req, res) => {
    return res.status(200).json(db.users);
})

// Route to fetch user data by user ID
router.get("/users/:userId", isAuthenticated, (req, res) => {
    const userId = req.params.userId;
    const user = db.users.find(user => user.id === userId);
    try{
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({message: "Error fetching user data"});
    }
});

// Route to update user profile
router.put("/users/:userId", isAuthenticated, (req, res) => {
    const {userId} = req.params;
    const {firstName, lastName, email, userName} = req.body;

     // Check if required fields are provided
     if (!firstName || !lastName || !email || !userName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if email is unique
    const existingEmailUser = db.users.find(user => user.email === email && user.id !== userId);
    if (existingEmailUser) {
        return res.status(400).json({ message: "Email is already in use" });
    }

    // Check if userName is unique
    const existingUsernameUser = db.users.find(user => user.userName === userName && user.id !== userId);
    if (existingUsernameUser) {
        return res.status(400).json({ message: "Username is already taken" });
    }

   // Find the index of the user in the db.json
   const userIndex = db.users.findIndex(user => user.id === userId);

   // If user not found 
   if (userIndex === -1) {
       return res.status(404).json({ message: "User not found" });
   }
   
   // Update user profile
   db.users[userIndex] = {
       ...db.users[userIndex],
       firstName: firstName || db.users[userIndex].firstName,
       lastName: lastName || db.users[userIndex].lastName,
       email: email || db.users[userIndex].email,
       userName: userName || db.users[userIndex].userName
   };

 
   // Send response
   res.status(200).json({ message: "User profile updated successfully", user: db.users[userIndex] });
});

/* ------------------------------------- FOLLOW ROUTES ------------------------------------- */

// Custom route to fetch all follower of a user by user ID
router.get("/users/:userId/followers", isAuthenticated, (req, res) => {
    const {userId} = req.params;

    // Find the user in the db.json
    const user = db.users.find(user => user.id === userId);
    // If user not found
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    // Return list of followers 
    res.status(200).json({followers: user.followers});
})

// Custom route to fetch all following of a user by user ID
router.get("/users/:userId/following", isAuthenticated, (req, res) => {
    const {userId} = req.params;

    // Find the user in the db.json
    const user = db.users.find(user => user.id === userId);
    // If user not found
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    // Return list of followers 
    res.status(200).json({following: user.following});
})

// Custom route to follow a user 
router.post("/users/:userId/follow", isAuthenticated, (req, res) => {
    const {userId} = req.params;
    const {followerId, followingId, userName} = req.body;

    // Find the user in the db.json
    const user = db.users.find(user => user.id === userId);
    // If user not found
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    // Check if the user is already being followed if so return error 
    const alreadyFollowing = user.following.find(follow => follow.followingId === followingId);
    if(alreadyFollowing){
        return res.status(400).json({message: "User is already being followed"});
    }

    // Add the followed user to the user following list 
    user.following.push({followingId, userId, userName});

    // Save the updated user back in the db.json
    db.users = db.users.map(u => (u.id === userId ? user : u));

     
    // Add the follower to the user being followed's followers list
    userBeingFollowed.followers.push({ followerId: userId, userName: user.userName });

    // Save the updated user being followed back in the db.json
    db.users = db.users.map(u => (u.id === followingId ? userBeingFollowed : u));

    // Return success message
    res.status(200).json({ message: "User followed successfully", following: user.following });

// Custom route to unfollow a user
router.put("/users/:userId/unfollow", isAuthenticated, (req, res) => {
    const {userId} = req.params;
    const {userIdToUnfollow} = req.body;

    // Find the index of the user in the db.json
    const userIndex = db.users.findIndex(user => user.id === userId);
    const userToUnfollowIndex = db.users.findIndex(user => user.id === userIdToUnfollow);

    // If user or userToUnfollow not found 
    if (userIndex === -1 || userToUnfollowIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // Remove userToUnfollow from following list of user
    db.users[userIndex].following = db.users[userIndex].following.filter(following => following.userId !== userIdToUnfollow);

    // Remove user from followers list of userToUnfollow
    db.users[userToUnfollowIndex].followers = db.users[userToUnfollowIndex].followers.filter(follower => follower.userId !== userId);

    // Save the updated users back in the db.json
    db.users = db.users.map(u => (u.id === userId ? db.users[userIndex] : u));
    db.users = db.users.map(u => (u.id === userIdToUnfollow ? db.users[userToUnfollowIndex] : u));

    // Send response
    res.status(200).json({ message: "User unfollowed successfully" });
})

})
module.exports = router;
