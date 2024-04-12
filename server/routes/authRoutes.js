const express = require('express');
const router = express.Router();
const {isAuthenticated} =  require ("../middleware/jwt.middleware.js");
const db = require('../db.json'); 
const fs = require('fs');

// Handles password encryption
const bcrypt = require("bcrypt");

// Handles password encryption
const jwt = require("jsonwebtoken");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;


// Authentication routes beloow:

// Route to sign up a new user - creates a new user 
router.post("/signup", (req, res) => {
    const {email, password, firstName, lastName, userName, profilePic, bio} = req.body;

    // Check if all the required fields are filled out
    if(email === "" || password === "" || firstName === "" || lastName === "" || userName === "" ) {
        res.status(400).json({message: "Please fill in all mandatory the fields"});
        return;
    }

   // CHeck if the password match a minimum of 8 characters and special caracters
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!passwordRegex.test(password)) {
         res.status(400).json({message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"});
        return;
    }

    // Check if the username or email is unique
    const userNameExists = db.users.some(user => user.userName === userName);
    const emailExists = db.users.some(user => user.email === email);

    if(userNameExists) {
        res.status(400).json({message: "This username already exists"});
        return;
    }
    if(emailExists) {
        res.status(400).json({message: "This email already exists"});
        return;
    }
    // Check if a profilePic URL is provided if not use a default avatar
    
    try{
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        // Create a new user with hashed password
        const newUser = {
            id: db.users.length + 1,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            userName,
            profilePic: "",
            bio: "",
            followers: [],
            following: [],
            posts: []
        };
        // Add the new user to the database 
        db.users.push(newUser);
        const dbJson = JSON.stringify(db, null, 2);

        // Write the JSON string back to db.json file
        fs.writeFileSync('./db.json', dbJson);


        res.status(201).json({message: "User created successfully"});
    } catch(error) {
        console.error('Error creating user:', error);
        res.status(500).json({message: "Error creating user"});
    }   
    
});

// Route to login an existing user
router.post("/login", (req, res) => {
    const {email, password} = req.body;
    
    // Check if all the required fields are filled out
    if(email === "" || password === "") {
        res.status(400).json({message: "Please provide email and password"});
        console.log("Please provide email and password");
        return;
    }

    // Find the user in the database
    const foundUser = db.users.find(user => user.email.toLocaleLowerCase() === email.toLocaleLowerCase());

    // If user not found return an error message
    if(!foundUser) {
        res.status(401).json({message: "Authentication failed"});
        console.log("email  incorrect");
        return;
    }

    // Check if the password is correct 
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    // If password is incorrect return an error message
    if(!passwordCorrect) {
        res.status(401).json({message: "Authentication failed"});
        console.log(" password incorrect");
        return;
    }
    if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { id, email, name };

        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
    // Return the token with status code
    res.status(200).json({ authToken: authToken});
}
});

// Route to logout an existing user by clearing their token from the cookies
/* router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: "Logout successful"});

});
 */
// Auth verify route - checks if the user is authenticated
router.get("/verify", isAuthenticated, (req, res) => {
    console.log('req.payload', req.payload);

    res.status(200).json(req.payload);
});

module.exports = router;

/* const plaintextPassword = 'yourPlaintextPassword';
const hashedPassword = bcrypt.hashSync(plaintextPassword, 10);

console.log('Hashed password:', hashedPassword); */

/* 
john = hqcgul
jane = blceov
sam = aecpsa
*/