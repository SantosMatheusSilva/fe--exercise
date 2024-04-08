// Necessary imports:
import react from "react";
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

function Profile() {


    
    // Control modal visibility
    const {onOpen, onClose, isOpen} = useDisclosure()

  return (
    <section style={{marginBottom: "100px"}} >
        <Center bg={"brand.600"} color={"white"} maxW={"breakpoints"}  h={"300"} opacity={0.5}  sx={{borderBottom: '3px', borderStyle: 'solid', borderColor: "brand2.gray"}}>
            <Heading>
            Hello!
            </Heading>
        </Center>
        <Container maxW='container.lg' h={"fit"} p={4} display={"flex"} direction={"row"} justifyContent={"space-between"} alignItems={"center"} borderRadius={5} sx={{border: '3px', borderStyle: 'solid', borderColor: "brand2.gray", borderTop: "none"}}>
        
        <Flex direction={"row"} gap={10} alignItems={"center"} justifyContent={"center"}>
        <Avatar src="https://i.pravatar.cc/300" size={"2xl"}/>
        <Box >
            <Flex gap={4} direction={"column"}>
            <Text>Firstname Lastname</Text>
            <Box display={"flex"} direction={"row"} gap={4}>
            <Text>Followers</Text>
            <Text>Following</Text>
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
            {/* <Card>
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
                            <Text>likes</Text>
                            <Text>comments</Text>
                        </Flex>
                    </Box>
                </CardBody>
                <Divider />
                <CardFooter justify={"space-between"} flexWrap={"wrap"} sx={{'& > button': {minW: '136px',},}}>
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                    Like
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                    Comment
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                    Share
                    </Button>
                </CardFooter>
            </Card> */}
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
            {/* <Card>
                <CardHeader>
                        <Flex gap={4}>
                            <Avatar />
                            <Box>
                                <Heading>First Name Last Name</Heading>
                                <Text>date</Text>
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
                            <Text>likes</Text>
                            <Text>comments</Text>
                        </Flex>
                    </Box>
                </CardBody>
                <Divider />
                <CardFooter justify={"space-between"} flexWrap={"wrap"} sx={{'& > button': {minW: '136px',},}}>
                    <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                    Like
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                    Comment
                    </Button>
                    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                    Share
                    </Button>
                </CardFooter>
            </Card> */}
            </TabPanel>
            </TabPanels>
            </Tabs>
        </Container>
    </section>
  )
}

export default Profile