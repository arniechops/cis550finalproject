import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import DropdownInput from '../components/DropdownInput'

export default function CitySearch() {
  return (
    <form>
        <Flex w="full" justify="center" align="center" mb={2}>
            <DropdownInput placeholder={"From"} width={400}/>
        </Flex>
        <Flex w="full" justify={"center"}>
            <Button colorScheme="teal">Search for hotels!</Button>
        </Flex>
    </form>
  )
}
