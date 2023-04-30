import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import DropdownInput from '../components/DropdownInput'

export default function CitySearch() {
  return (
    <form>
      <Box w="100wh" align="center" justify="center" mt={10} spacing={2} mb={3}>
        <Flex w="full" justify="center" align="center" mb={2}>
            <DropdownInput placeholder={"Give us a location..."} width={400}/>
        </Flex>
        <Flex w="full" justify={"center"}>
            <Button colorScheme="teal">Search for hotels!</Button>
        </Flex>
      </Box>
    </form>
  )
}
