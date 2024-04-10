// Necessary imports:
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
// Chakra UI imports:
import {Card, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Heading, Text} from '@chakra-ui/react'
import { AuthContext } from "../context/auth.context"; 
import axios from "axios"; // --> axios is used to send requests to the server.

// Assign our URL to a variable.
const API_URL_AUTH = 'http://localhost:3000/auth' || import.meta.API_URL_AUTH;

// Create the functional component Login that will handle the user login process.
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    //Accessing the value from AuthContext by the useContext hook  
    const {saveToken, authenticateUser} = useContext(AuthContext); 

    // Initialize the useNavigate
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    // Create the handleLoginSubmit function which will be called when the form is submitted.
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };

        axios
            .post(`${API_URL_AUTH}/login`, requestBody)  // Send a POST request with the data in the request body.
            .then((response) => {
                console.log("JWT token", response.data.authToken);

                //setIsLoading(false);
                // Save the token in the localStorage
                saveToken(response.data.authToken);
                // Authenticate the user
                authenticateUser();
                // Redirect the user to the main page after successful login.
                navigate("/profile"); // --> change the path for feed page!!!!
            })
            .catch((error) => {
                const errorDescription = error.response.data.message || "An error occurred. Please try again.";
                setErrorMessage(errorDescription);
            })
    }

    // If isLoading is true, return a loading message.
    if (isLoading) {
        return <div>Loading...</div>
    }


  return (
    <Card bg={"white"} color={"brand.700"} p={4} borderRadius={10} boxShadow={"lg"} h={"fit"} w={"400px"} alignItems={"center"} m={"auto"} display={"flex"} mt={"10%"}  sx={{
        borderWidth: '2px',
       /*  borderStyle: 'solid', */
        borderColor: 'brand.700', 
      }} >
        <Heading>Login</Heading>
        <form onSubmit={handleLoginSubmit}>
        <FormControl mt={4} p={4}  >
            <FormLabel>Email</FormLabel >
            <Input bg={"white"} mb={6}
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
            
            {!email && !password && <FormHelperText>Fill in the fields</FormHelperText>}
            {errorMessage && (
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
            )}
        </FormControl>
        </form>
            <Button type="submit" onClick={handleLoginSubmit} mt={4} bg={"brand.600"} color={"white"}>
                Login
            </Button>
        <Text m={8}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </Text>
    </Card>
  )
}

export default Login;