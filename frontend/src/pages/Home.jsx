import { AddIcon, ArrowForwardIcon, CloseIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Flex, Grid, GridItem, HStack, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import DropdownInput from '../components/DropdownInput';
import CitySearch from '../sections/CitySearch';
import FlightSearch from '../sections/FlightSearch';
import Sidebar from '../sections/Sidebar';

export default function Home() {

    const [menuItem, setMenuItem] = useState(1)

    const handleMenuItemChange = (val) => {
        setMenuItem(val)
    }

  return (
    <Box>
        <Flex w="full" align={"center"} justify="center" mt={10}>
            <Grid templateColumns='1fr 4fr' h="auto" rounded={'md'}
            w={'70%'} minW={"500px"} shadow='sm'>
                <GridItem w="100%">
                    <Sidebar handleMenuItemChange={handleMenuItemChange} menuItem={menuItem}/>
                </GridItem>
                <GridItem w="100%">
                    {
                        menuItem === 1 ? <FlightSearch/> : <CitySearch/> 
                    }
                </GridItem>
            </Grid>
        </Flex>
        <VStack spacing={3} mt={4}>
            <Card p={4} w="700px">
                <Flex>
                    <Avatar name='City' mr="6"/>
                    <VStack spacing={2} align="left">
                        <Text size="lg" as="b" align={"left"}>Flight X</Text>
                        <Text color={'gray'} align={"left"}>From DXB to JFK</Text>
                    </VStack>
                </Flex>
            </Card>
        </VStack>
    </Box>
  )
}
