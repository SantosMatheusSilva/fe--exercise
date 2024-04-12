import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
// Initialize context
const AuthContext = React.createContext();

// Create provider
const API_URL_AUTH = import.meta.env.API_URL_AUTH;
const API_URL = import.meta.env.API_URL;

function AuthProviderWrapper(props) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const {userId} = useParams();

    const API_URL_AUTH = import.meta.env.API_URL_AUTH;
    const API_URL = import.meta.env.API_URL;

    const saveToken = (token) => {
        localStorage.setItem("authToken", token);
    };

    const removeToken = () => {
        localStorage.removeItem("authToken");
    };

    const authenticateUser = async () => {
        const storedToken = localStorage.getItem("authToken");

        if (storedToken) {
            try {
                const response = await axios.get(`${API_URL_AUTH}/verify`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                });
                setUser(response.data);
                setIsLoggedIn(true);
            } catch (err) {
                console.log("Failed to authenticate user", err);
                setUser(null);
                setIsLoggedIn(false);
            }
        } else {
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    const logOut = () => {
        removeToken();
        authenticateUser();
    };

    const fetchUser = async () => {
        if (user && user.id) {
            try {
                const response = await axios.get(`${API_URL}/users/${userId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
                });
                setCurrentUser(response.data);
            } catch (err) {
                console.log("Failed to fetch user", err);
            }
        }
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    useEffect(() => {
        fetchUser();
    }, [user]); // Fetch user whenever user state changes

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                currentUser,
                saveToken,
                authenticateUser,
                logOut,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

/* function AuthProviderWrapper (props) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const {id} = useParams();

    // Save the login JWT Token in the browser local storage.
    const saveToken = (token) => {
        localStorage.setItem("authToken", token);
    }

    // Function to authenticate the user. verifies if the token is a valid one.
    const authenticateUser = async () => {
        const storedToken = localStorage.getItem("authToken");

        if(storedToken) {
            try {
            const response = await axios
            .get(`${API_URL_AUTH}/verify`, {headers: {Authorization: `Bearer ${storedToken}`},
            });
            setUser(response.data);
            setIsLoggedIn(true);
            }
            catch(err) {
            console.log("Failed to authenticate user", err);
            setUser(null);
            setIsLoggedIn(false);
            }
        }
        else {
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const logOut = () => {
        removeToken();
        authenticateUser();
    }

    useEffect(() => {
        authenticateUser();
    }, []);

    // Fetch user data when the component is mounted        
        const fetchUser = async () => {
        if(user &&user.id){
        try {
            // Fetch the user using your authentication token
            const response = await axios.get(`${API_URL}/users/${user.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
            });

            // Set the user with the response data
            setCurrentUser(response.data);
        } catch (err) {
            console.log("Failed to fetch user", err);
        }
        }
    };
    useEffect(() => {
        authenticateUser();
      }, []);
    

    return (
        <AuthContext.Provider 
            value = {{
                isLoggedIn, 
                user, 
                currentUser, 
                saveToken, 
                authenticateUser, 
                logOut,
                
                }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
 */

export {AuthContext, AuthProviderWrapper};
