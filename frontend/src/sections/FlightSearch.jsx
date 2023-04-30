import React, { useEffect, useState } from 'react'
import { AddIcon, ArrowForwardIcon, CloseIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react'
import DropdownInput from '../components/DropdownInput';
import useGet from '../hooks/useGet';

export default function FlightSearch() {

    const [extraStop, setExtraStop] = useState(false);

  return (
    <form>
        <HStack w="100wh" align="center" justify="center" mt={10} spacing={2} mb={3}>
            <DropdownInput placeholder={"From"}/>
            <Box align="center" justify="center">
                <ArrowForwardIcon w="6" h="6" />
            </Box>
            <DropdownInput placeholder={"To"}/>
            {
                extraStop && (
                    <>
                        <Box align="center" justify="center">
                            <ArrowForwardIcon w="6" h="6" />
                        </Box>
                        <DropdownInput placeholder={"Final"} route={'/getallflights'}/>
                    </>
                )
            }
            <Button rounded={"full"} colorScheme={extraStop ? "red" : "gray"} onClick={() => setExtraStop(!extraStop)}>
                {
                    extraStop ? <CloseIcon/> : <AddIcon/>
                }
            </Button>
        </HStack>
        <Flex w="full" justify={"center"}>
            <Button colorScheme="teal">Search for flights!</Button>
        </Flex>
    </form>
  )
}
