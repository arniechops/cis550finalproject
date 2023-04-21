import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function SidebarComponent({selected=false, text}) {
  return (
    <Box rounded={"md"} bg={selected ? "gray.200" : "white"}
    _hover={{backgroundColor: "gray.50", cursor:"pointer"}} w={"full"} p={2}>
        <Text fontSize={"lg"} textAlign="center">
            <b>{text}</b>
        </Text>
    </Box>
  )
}
