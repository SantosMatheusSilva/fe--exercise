// Necessary imports:
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

// Chakra UI imports:
import {
    Box,
    Card, 
    CardHeader, 
    CardFooter, 
    CardBody, 
    Button, 
    Image,  
    Heading, 
    Text, 
    Flex, 
    Avatar, 
    Divider,
    Container,
    useDisclosure,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverCloseButton,
    PopoverArrow,
    PopoverBody
    } from '@chakra-ui/react'
import { 
    BiLike, 
    BiChat, 
    BiShare 
} from "react-icons/bi";
// Components import:
import Comment from '../components/Comment';
// Services import:
import { getAllPosts } from '../services/postService';
import { getUser } from '../services/userService';

function PostList() {
    //const {onToggle, onClose, isOpen, onOpen} = useDisclosure();
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Fetch posts
    useEffect(() =>{
        setIsLoading(true);
        async function fetchPosts() {
            try{
                const postsData = await getAllPosts();
                setPosts(postsData);
                setIsLoading(false);
            }catch(error){
                console.error('Error fetching posts:', error);
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, []); 

    // Fetch user
   /*  useEffect(() =>{
        setIsLoading(true);
        async function fetchUser(userId) {
            try{
                const userData = await getUser(userId);
                setUserData(userData);
                setIsLoading(false);
            }catch(error){
                console.error('Error fetching user:', error);
                setIsLoading(false);
            }
        }
        fetchUser(userId);
    }); */
    
    // To show the comment input component
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

  return (
    <Container maxW='container.lg' p={4}>
        {posts.map((post) => (
            
        
    <Card key={posts.id} m={6} shadow={"lg"}>
                <CardHeader>
                        <Flex gap={4} justify={"space-between"}>
                           <Flex gap={4}>
                           <Box>
                            <Avatar src={userData.profilePic}/>
                            </Box>
                            <Box>
                                <Heading>{userData.userName}</Heading>
                                <Text>{post.postedAt}</Text>
                            </Box>
                           </Flex>
                            <Box display={"flex"} >
                            <Button>delete</Button>
                            </Box>
                        </Flex>
                </CardHeader>
                <Divider />
                <CardBody>
                    <Heading size='md'p={2}>{post.title}</Heading>
                    <Text p={2}>{post.text}</Text>
                    {post.image && <Image src={post.image} alt="post image" />}
                    <Box mt={4}>
                        <Flex justify={"space-between"}>
                            <Text>{post.likes.lenght}likes</Text>
                            <Text>{post.comments.length} comments</Text>
                        </Flex>
                    </Box>
                </CardBody>
                <Divider />
                <CardFooter justify={"space-between"} flexWrap={"wrap"} sx={{'& > button': {minW: '136px',},}}>
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />} >
                        Like
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />} onClick={handleToggle}>
                        Comment
                    </Button>
                    <Popover>
                        <PopoverTrigger>
                        <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                            Share
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>Sorry... Feature not available yet!</PopoverBody>
                        </PopoverContent>
                    </Popover>
                </CardFooter>
                {isOpen && <Comment isOpen={isOpen} onToggle={handleToggle}/>}
            </Card>
            ))}
    </Container>
  )
}

export default PostList