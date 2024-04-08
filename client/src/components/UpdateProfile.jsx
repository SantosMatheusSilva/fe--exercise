// Necessary imports:
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
// Chakra UI imports:
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure
  } from '@chakra-ui/react'
  // Other imports
  // Import the server 
  //const API_URL = "http://localhost:5005";

function UpdateProfile(props) {
    const {firstName, lastName, userName, email, profilePic, isOpen, onClose} = props;
    //const {user} = useContext(AuthContext); --> uncomment once the auth middleware is done.
    //const {userId} = useParams();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({firstName: "", lastNName: "", userName: "", email: "", profilePic: ""});
    const [error, setError] = useState(undefined);

    // Initialize the useNavigate
    const navigate = useNavigate();

   // useEffect (() => {
     /*    axios
        .get(`${API_URL}/api/user/${user._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        })
        .then((response) => {
            setUserData(response.data);
            setLoading(false);
        })
        .catch((error) => console.log(error));
    }, [userId]); */

/*     const handleChange = event => {
        // Update form fields as user types
        const { name, value } = event.target;
        setUserData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };
 */
/*   const handleUpdate = (e) => {
      e.preventDefault();
 */
      /* axios
      .put(`${API_URL}/auth/profile`, userData)
      .then(() => {
        window.alert("Profile updated successfully!");
        window(location.reload());
        
      }) */
      
  /*     .catch((error) => {
        const errorDescription = error.response?.data?.message || "An unknown error occurred";
        setError(errorDescription);
        setLoading(false);
    })}; */

    // Modal controlers
  /*   const initialRef = React.useRef(null)
    const finalRef = React.useRef(null) */
    const {onOpen} = useDisclosure();

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    
  return (
    <Modal
        /* initialFocusRef={initialRef}
        finalFocusRef={finalRef} */
        onClose={onClose} 
        isOpen={isOpen}
        onOpen={onOpen}
        size="lg"
        >

        <ModalOverlay 
        bg={"white"}
        w={"400px"}
        h={"fit"}
        borderRadius={10}
        mt={"100px"}
        mx={"600px"}
        sx={{
            borderColor: "brand.600",
            borderWidth: "1px", 
        }}
        >

            <ModalHeader color={"brand.700"} textAlign={"center"}>Update Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody p={4}>
                <form /* onSubmit={handleUpdate} */>
                <FormControl py={2}>
                    <FormLabel>First name</FormLabel>
                    <Input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={userData.firstName} 
                        /* onChange={handleChange} *//>
                </FormControl>

                <FormControl py={2}>
                    <FormLabel>Last name</FormLabel>
                    <Input 
                    type="text"
                    id="lastName" 
                    name="lastName" 
                    value={userData.lastNName} 
                    /* onChange={handleChange}  *//>
                </FormControl>

                <FormControl py={2}>
                    <FormLabel>User Name</FormLabel>
                    <Input 
                    type='text'
                    id="userName"
                    name='userName'
                    value={userData.userName}
                    /* onChange={handleChange}  */ />
                </FormControl>

                <FormControl py={2}>
                    <FormLabel>Email address</FormLabel>
                    <Input 
                    type='email' 
                    id="email"
                    name='email'
                    value={userData.email}
                    /* onChange={handleChange} */ />
                </FormControl>

                <FormControl py={2}>
                    <FormLabel>Profile Picture</FormLabel>
                    <Input 
                    type='text' 
                    placeholder='http://image.png'
                    id='profilePic'
                    name='profilePic'
                    value={userData.profilePic}
                    /* onChange={handleChange} *//>
                </FormControl>
                </form>
                {error && <p>{error}</p>}
            </ModalBody>
            <ModalFooter>
                <Button 
                type='submit' 
                colorScheme='blue' 
                mr={3}>
                    Save
                </Button>
                <Button onClick={onClose} variant='ghost'>
                    Cancel
                </Button>
            </ModalFooter>
        </ModalOverlay>
    </Modal>
  )
}

export default UpdateProfile;