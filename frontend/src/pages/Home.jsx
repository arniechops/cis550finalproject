import { HamburgerIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Flex, Grid, GridItem, Heading, HStack, Input, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import React, { createContext, useState } from 'react'
import CityResults from '../sections/CityResults';
import CitySearch from '../sections/CitySearch';
import FlightResults from '../sections/FlightResults';
import FlightSearch from '../sections/FlightSearch';
import Sidebar from '../sections/Sidebar';

export const FlightsContext = createContext()

export default function Home() {

    const [flightResults, setFlightResults] = useState([]);
    const [hotelResults, setHotelResults] = useState([]);

  return (
    <Box>
        <Flex shadow={"sm"} w="full" p={3} alignItems="center">
            <Heading fontSize={"xl"} as="b">
                Hotels and Flights
            </Heading>
            <Spacer/>
            <Button>
                <HamburgerIcon/>
            </Button>
        </Flex>
        <Tabs>
        <TabList>
            <Tab>Flights</Tab>
            <Tab>Hotels</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <FlightSearch setResults={setFlightResults}/>
                <FlightResults results={flightResults}/>
            </TabPanel>
            <TabPanel>
                <CitySearch setResults={setHotelResults}/>
                <CityResults results={hotelResults}/>
            </TabPanel>
        </TabPanels>
        </Tabs>
    </Box>
  )
}
