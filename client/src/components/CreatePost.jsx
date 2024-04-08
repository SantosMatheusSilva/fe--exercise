// Necessary imports:
import React from 'react'

// Components import:

// Chakra UI imports:
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalContent,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Textarea,
    Avatar,
    Box,
    Card, 
    CardHeader, 
    CardFooter, 
    CardBody, 
    Image,  
    Heading, 
    Text, 
    Flex, 
    Divider,
    Container,
    Button,
  } from '@chakra-ui/react';
 function CreatePost() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <Container maxW='container.lg' p={4} >
        <Card p={4} sixe={"md"} justify={"center"}>          
           <CardBody>
           <Flex gap={4}>
                <Avatar />
                <Input 
                placeholder="What's on your mind, userFirstName?" 
                w={"full"} 
                onClick={onOpen} 
                cursor={"pointer"}/>
            </Flex>
           </CardBody>
           <Divider></Divider>
           {/* <CardFooter justify={"flex-end"}>
                <Button>Post</Button>
           </CardFooter> */}
        </Card>
    </Container>
    <Container>
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> 
            <Text align={"center"}>
            Create your post
            </Text>
          </ModalHeader>
          <ModalCloseButton bg={"brand2.gray"}/>
          <Divider></Divider>
          <ModalBody pb={6}>
            <Flex gap={4} align={"center"} p={4}>
                <Avatar />
                <Text>Firstname Lastname</Text>
            </Flex>
           <Textarea size="xl" border={"none"} placeholder="What's on your mind?">
           </Textarea>

            <FormControl mt={4}>
              <FormLabel>Want to add an image?</FormLabel>
              <Input placeholder='http;//image.png' />
            </FormControl>
          </ModalBody>

          <ModalFooter justify={"center"}>
            <Button colorScheme='blue'>
             Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
    </>
  )
}

export default CreatePost;
