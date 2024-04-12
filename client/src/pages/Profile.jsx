// Necessary imports:
import react from "react";
import { useState, useEffect, useContext } from "react";
import{ AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import axios from "axios";
// Chakra UI imports:
import { 
    Card, 
    CardHeader, 
    CardFooter, 
    CardBody, 
    Button, 
    Image,  
    Heading, 
    Text, 
    Container, 
    Center, 
    Flex, 
    Avatar, 
    Box, 
    Divider, 
    Tab, 
    Tabs, 
    TabList, 
    TabPanel, 
    TabPanels,
    useDisclosure
} from '@chakra-ui/react'
import { 
    BiLike, 
    BiChat, 
    BiShare 
} from "react-icons/bi";


// Components import:
import UpdateProfile  from '../components/UpdateProfile';
import PostList  from '../components/PostList';
// Service import:
import { getUser } from '../services/userService';

const API_URL = import.meta.API_URL /* || 'http://localhost:3001' */;
function Profile() {
    const { userId, isLoggedIn, logOut} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    //const {userId} = useParams();
    // Control modal visibility
    const {onOpen, onClose, isOpen} = useDisclosure()

     useEffect (() => {
        setIsLoading(true);
        async function fetchUserData() {
            try {
                const data = await getUser(userId);
                console.log('userdata ---->',data);
                setUserData(data);
                setIsLoading(false);
            } catch (error) {
                console.error("error fetching user data in the profile:", error);
                setIsLoading(false);
                setError('An error occurred while trying to fetch user data');
            }
        }
        fetchUserData();
    }, [userId]); 

    /* useEffect(() => {
        if(isLoggedIn){
        setIsLoading(true);
        axios
        .get(`${API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        })
        .then((response) => {
            setUserData(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
            setIsLoading(false);
            setError("An error occurred while trying to fetch user data");
        })
        
        }
    }) */
      

  return (
    <section style={{marginBottom: "100px"}} >
        <Center bg={"brand.600"} color={"white"} maxW={"breakpoints"}  h={"300"} opacity={0.5}  sx={{borderBottom: '3px', borderStyle: 'solid', borderColor: "brand2.gray"}}>
            <Heading>
            Hello {userData?.firstName ? userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1) : ''}!
            </Heading>
        </Center>
        <Container maxW='container.lg' h={"fit"} p={4} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"} borderRadius={5} sx={{border: '3px', borderStyle: 'solid', borderColor: "brand2.gray", borderTop: "none"}}>
        
        <Flex direction={"row"} gap={10} alignItems={"center"} justifyContent={"center"}>
        <Avatar src={userData?.profilePic} size={"2xl"}/>
        <Box >
            <Flex gap={4} direction={"column"}>
            <Heading>{userData?.firstName} {userData?.lastName}</Heading>
            <Box display={"flex"} direction={"row"} gap={4}>
               
            <Text>{userData?.followers}Followers</Text>
            <Text>{userData?.following}Following</Text>
            {/* {userData?.followers.length || userData?.following.lenght == 0 || null ? <Text>0 followers</Text> && <Text>0 follows</Text>: null } */}
            </Box>
            <Box>
                {userData?.bio === null || "" ? <Text>No bio</Text> : null}
            <Text>{userData?.bio}</Text>
            </Box>
            </Flex>
            </Box>
            
        </Flex>
        <Button colorScheme='teal' onClick={onOpen}>
            Edit Profile
        </Button>
        {isOpen &&<UpdateProfile isOpen={isOpen} onClose={onClose}  />}
        </Container>
        <Container  mt={10} maxW='container.lg' h={"fit"} p={4} borderRadius={5} sx={{border: '3px', borderStyle: 'solid', borderColor: "brand2.gray"}}>
            <Tabs>
                <TabList m={4} justifyContent={"space-between"}>
                    <Tab>Posts</Tab>
                    <Tab>Followers</Tab>
                    <Tab>Following</Tab>
                    <Tab>Likes</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <PostList />
            </TabPanel>
            <TabPanel>
                <Flex gap={5} p={4} borderRadius={10} sx={{border: '1px', borderStyle: 'solid', borderColor: "brand2.gray"}}>
                    <Avatar />
                   <Box>
                    <Text>Username</Text>
                   <Text>First Name Last Name</Text>
                   </Box>
                </Flex>
            </TabPanel>
            <TabPanel>
                <Flex gap={5} p={4} borderRadius={10} sx={{border: '1px', borderStyle: 'solid', borderColor: "brand2.gray"}}>
                    <Avatar />
                   <Box>
                    <Text>Username</Text>
                   <Text>First Name Last Name</Text>
                   </Box>
                </Flex>
            </TabPanel>
            <TabPanel>
                <PostList />
            </TabPanel>
            </TabPanels>
            </Tabs>
        </Container>
    </section>
  )
}

export default Profile