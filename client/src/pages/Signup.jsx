// Necessary imports:
import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useContext } from "react";
// Chakra UI imports:
import {
    Card, 
    FormControl, 
    FormLabel, 
    FormErrorMessage, 
    FormHelperText, 
    Input, 
    Button, 
    Heading, 
    Textarea
} from '@chakra-ui/react'
//import { AuthContext } from "../context/auth.context"; --> uncomment once the auth middleware is done.
import axios from "axios"; // --> axios is used to send requests to the server.

// Assign our URL to a variable.
const API_URL_AUTH = 'http://localhost:3001/auth' || import.meta.API_URL_AUTH;
const API_URL= 'http://localhost:3001/api' || import.meta.API_URL;
// Create the functional component Signup that will handle the user signup process.
function Signup() {
    const {userId} = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [bio, setBio] = useState("");

    // Inicialize the useNavigate
    const navigate = useNavigate();

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleUserName = (e) => setUsername(e.target.value);
    const handleProfilePic = (e) => setProfilePic(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const handleBio = (e) => setBio(e.target.value);
    
    // Create the handleSignupSubmit function which will be called when the form is submitted.
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // Check if all the fields are filled
        if(firstName === "" || lastName === "" || username === "" || email === "" || password === "" || confirmPassword === "") {
            setErrorMessage("Please fill in all the fields");
            return;
        }
        // Check if the passwords match
        if(password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        // Check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if(!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address");
            return;
        }
        // CHeck if the password match a minimum of 8 characters and special caracters
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
            setErrorMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
            window.alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
            return;
        }
        // Check if a profilePic URL is provided if not use a default avatar 
        if(profilePic === "") {
          setProfilePic("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
        }
        // Check if the username or email is unique
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        //const existingUser = users.find(user => user.username === username);
        const existingEmail = users.find(user => user.email === email);
        if(existingEmail) {
            setErrorMessage("This email is already registered.");
            window.alert("This email is already registered.");
            return;
        }
        // Send a POST request with the data in the request body.
        const requestBody = { firstName, lastName, username, profilePic, email, password, confirmPassword };

        axios
            .post(`${API_URL_AUTH}/signup`, requestBody)  // Send a POST request with the data in the request body.
            .then(() => {
                setIsLoading(false);
                alert("Signup successful!!!");
                navigate("/");
            })
            .catch((error) => {
                setErrorMessage("An error occurred while trying to signup. Please try again.");
            })

        
        if(isLoading) {
            return <div>Loading...</div>
        }
        
    }
  return (
    <Card bg={"white"} color={"brand.700"} p={4} borderRadius={10} boxShadow={"lg"} h={"fit"} w={"400px"} alignItems={"center"} m={"auto"} display={"flex"} mt={"10%"}  sx={{
        borderWidth: '2px',
       /*  borderStyle: 'solid', */
        borderColor: 'brand.700', 
      }} >
        <Heading> Signup</Heading>
        <form onSubmit={handleSignupSubmit}>
        <FormControl m={4}>

            <FormLabel>First Name</FormLabel >
            <Input bg={"white"} mb={6}
            type="text" 
            id="firstName" 
            name="firstName" 
            value={firstName} 
            onChange={handleFirstName} />

            <FormLabel>Last Name</FormLabel>
            <Input  bg={"white"} mb={6}
            type="text" 
            id="lastName" 
            name="lastName" 
            value={lastName} 
            onChange={handleLastName} />

            <FormLabel>User Name</FormLabel>
            <Input  bg={"white"} mb={6}
            type="text" 
            id="username" 
            name="username" 
            value={username} 
            onChange={handleUserName} />

            <FormLabel>Profile Picture</FormLabel >
            <Input bg={"white"} mb={6}
            type="text" 
            id="profilePic" 
            name="profilePic" 
            value={profilePic} 
            onChange={handleProfilePic} />

            <FormLabel>Bio (optional) </FormLabel>
            <Textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={handleBio} />

            <FormLabel>Email</FormLabel>
            <Input  bg={"white"} mb={6}
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={handleEmail} />

            <FormLabel>Password</FormLabel>
            <Input  bg={"white"} mb={6}
            type="password" 
            id="password" 
            name="password"
            value={password} 
            onChange={handlePassword} />

            <FormLabel>Confirm Password</FormLabel>
            <Input  bg={"white"} mb={6}
            type="password" 
            id="confirm-password"  
            name="confirmpassword"
            value={confirmPassword}
            onChange={handleConfirmPassword} />

            {!email || !password || !confirmPassword || !firstName || !lastName || !username ? <FormHelperText>Fill in the fields</FormHelperText> : null}
            {errorMessage && (
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
            )}
        </FormControl>
        </form>
        <Button type="submit" onClick={handleSignupSubmit} mt={4} bg={"brand.600"} color={"white"}>
            Signup
        </Button>
    </Card>
  )
}

export default Signup;