import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function SidebarComponent({selected=false, text, onClick}) {
  return (
    <Box bg={selected ? "gray.50" : "white"}
    _hover={{backgroundColor: "gray.50", cursor:"pointer"}} w={"full"} p={2} onClick={onClick}>
        <Text fontSize={"lg"} textAlign="center">
            <b>{text}</b>
        </Text>
    </Box>
  )
}
