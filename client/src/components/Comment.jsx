// Necessary imports:
import React from 'react'

// Chakra UI imports:
import {
    Collapse,
    Box,
    Avatar,
    Textarea,
    Flex,
    useDisclosure,
    Divider,
    Button,
    IconButton
} from '@chakra-ui/react';
import { 
    IoMdSend 
} from "react-icons/io";
function Comment({onToggle, isOpen}) {
    //const { isOpen, onToggle, onOpen } = useDisclosure();


  return (
    <>
    <Divider mb={4}></Divider>
    <Collapse in={isOpen} onToggle={onToggle} animateOpacity>
        <Box p={4}>
            
            <Flex gap={4}>
                <Avatar />
                <Textarea placeholder="Write a comment...">
                </Textarea>
                <IconButton mt={2}bg={"brand.600"} color={"white"} >
                    <IoMdSend />
                </IconButton>
            </Flex>
            
        </Box>
    </Collapse>
    </>
    
  )
}

export default Comment