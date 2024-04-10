// Necessary imports:
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Chakra UI imports:
import { 
    Box, 
    Flex, 
    Tag, Heading, Spacer, ButtonGroup, Button, Avatar,Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'
import { 
    MdLogout 
} from "react-icons/md";
// Sevices imports:
import {getUser} from "../services/userService"
import { AuthContext } from "../context/auth.context";

// Create the functional component
function Navbar({userId, token}) {
    const { isLoggedIn, logOut} = useContext(AuthContext);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    console.log('Component is rendering');

    // Fetch user data 
    useEffect(() => {
        console.log('useEffect is running');
        async function fetchUser(userId) {
            console.log('user:', user);
            console.log('token:', token);
            try {
                const fetchedUser = await getUser(userId, token);
                
                setUser(fetchedUser);
              console.log('user:', user);
            } catch (error) {
                console.error('Error fetching user data:', error);
                
            } finally {
                setIsLoading(false);
            }
        }
        if(userId && token) {
            fetchUser();
        }
     
    }, [userId, token]); 

    const handleLogout = () => {
        logOut();
        navigate("/");
        setUserData(null);
    };

    if (isLoading) {
        setIsLoading(false);
        return <div>Loading...</div>;
    }
  /*   console.log(user);
    console.log(isLoggedIn); */
    return(
        
            <Flex w={"breakpoints"} h={20} bg={"brand.700"} p={4} borderBottom={2} borderColor={"brand.900"} color={"white"} display={"flex"} alignItems={"center"} >
                <Box>
                    <Link to= "/">
                    <Heading>Logo</Heading>
                    </Link>
                </Box>
                <Spacer />
                {isLoggedIn ? ( 
                    <Box>
                        <Popover justifyContent={"center"}>
                            <PopoverTrigger>
                                <Avatar  src={user?.profilePic} ></Avatar>
                            </PopoverTrigger>
                            <PopoverContent color={"brand.700"}>
                                <PopoverArrow />
                                <PopoverHeader > Hey {user?.userName}!</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Link to="/profile">Profile</Link><br/>
                                </PopoverBody>
                                <PopoverFooter>
                                    <Button onClick={handleLogout} rightIcon={<MdLogout />} color={"brand.700"}>
                                        Logout
                                    </Button>
                                </PopoverFooter>
                            </PopoverContent>
                        </Popover>
                    </Box>

                ) : (
                    <ButtonGroup gap={'2'} color={"white"} variant="outline">
                    <Link to= "/">
                        <Button color={"white"}>Log in</Button>
                    </Link>
                </ButtonGroup>
                )}

            </Flex>
    )
}

export default Navbar;