// Necessary imports:
import { Link } from "react-router-dom";
import { Box, Flex, Tag, Heading, Spacer, ButtonGroup, Button} from '@chakra-ui/react'

// Create the functional component
function Navbar() {
    
    return(
        
            <Flex w={"breakpoints"} h={20} bg={"brand.700"} p={4} borderBottom={2} borderColor={"brand.900"} color={"white"} display={"flex"} alignItems={"center"} >
                <Box>
                    <Link to= "/">
                    <Heading>Logo</Heading>
                    </Link>
                </Box>
                <Spacer />
                <ButtonGroup gap={'2'} color={"white"} variant="outline">
                    <Link to= "/signup">
                        <Button color={"white"}>Sign Up</Button>
                    </Link>
                    <Link to= "/login">
                        <Button color={"white"}>Log in</Button>
                    </Link>
                </ButtonGroup>
            </Flex>
    )
}

export default Navbar;