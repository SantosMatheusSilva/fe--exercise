import { Link } from "react-router-dom";
import { Box, Flex, Tag, Heading, Spacer, Divider } from '@chakra-ui/react'

function Footer() {
  return (
    <Flex pos={"bottom"} w={"breakpoints"} h={20} bg={"brand.800"} p={4} >
      <Box >
        <Box>

        </Box>
        <Divider orientation={"horizontal"} color={"white"} w={"100%"}/>
        <Box>

        </Box>
      </Box>
    </Flex>
  )
}

export default Footer