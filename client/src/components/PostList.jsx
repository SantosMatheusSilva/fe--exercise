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

function PostList() {
    //const {onToggle, onClose, isOpen, onOpen} = useDisclosure();

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    };

  return (
    <Container maxW='container.lg' p={4}>
    <Card>
                <CardHeader>
                        <Flex gap={4} justify={"space-between"}>
                           <Flex gap={4}>
                           <Box>
                            <Avatar />
                            </Box>
                            <Box>
                                <Heading>First Name Last Name</Heading>
                                <Text>date</Text>
                            </Box>
                           </Flex>
                            <Box display={"flex"} >
                            <Button>delete</Button>
                            </Box>
                        </Flex>
                </CardHeader>
                <Divider />
                <CardBody>
                    <Text>
                        the post content here the post content here  the post content here the post content here the post content here the post content here the post content here 
                    </Text>
                    <Image objectFit={"cover"} src={""}/>
                    <Box mt={4}>
                        <Flex justify={"space-between"}>
                            <Text>0 likes</Text>
                            <Text>0 comments</Text>
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
    </Container>
  )
}

export default PostList