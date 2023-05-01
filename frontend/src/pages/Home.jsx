import { AddIcon, ArrowForwardIcon, CloseIcon, HamburgerIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Flex, Grid, GridItem, HStack, Input, Spacer, Text, VStack } from '@chakra-ui/react'
import React, { createContext, useState } from 'react'
import CitySearch from '../sections/CitySearch';
import FlightSearch from '../sections/FlightSearch';
import Sidebar from '../sections/Sidebar';

export const FlightsContext = createContext()

export default function Home() {

    const [menuItem, setMenuItem] = useState(1)
    const [flightResults, setFlightResults] = useState([]);

    const handleMenuItemChange = (val) => {
        setMenuItem(val)
    }

    const context = {
        setFlightResults
    }

  return (
    <Box>
        <Flex shadow={"sm"} w="full" p={3}>
            <Text fontSize={"lg"} as="b">
                Hotels and Flights
            </Text>
            <Spacer/>
            <Button>
                <HamburgerIcon/>
            </Button>
        </Flex>
        <FlightsContext.Provider value={context}>
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
        </FlightsContext.Provider>
        <VStack spacing={3} mt={4}>
            {
                flightResults?.map(res => {
                return <Card p={4} w="700px" key={res.name}>
                    <Flex>
                        <Flex>
                            <Avatar name={res.name} mr="6"/>
                            <VStack spacing={2} align="left">
                                <Text size="lg" as="b" align={"left"}>{res.name}</Text>
                                <Text color={'gray'} align={"left"}>{res.id}</Text>
                            </VStack>
                        </Flex>
                        <Spacer/>
                        <Button colorScheme={'blue'}>
                            Add to Cart!
                        </Button>
                    </Flex>
                </Card>
                })
            }
        </VStack>
    </Box>
  )
}
