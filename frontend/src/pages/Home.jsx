import { HamburgerIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Flex, Grid, GridItem, Heading, HStack, Input, Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import React, { createContext, useState } from 'react'
import AirlinesSearch from '../sections/AirlinesSearch';
import CityResults from '../sections/CityResults';
import CitySearch from '../sections/CitySearch';
import FlightResults from '../sections/FlightResults';
import FlightSearch from '../sections/FlightSearch';
import ItineraryPlannerResults from '../sections/ItineraryPlannerResults';
import ItineraryPlannerSearch from '../sections/ItineraryPlannerSearch';

export const FlightsContext = createContext()

export default function Home() {

    const [flightResults1, setFlightResults1] = useState([]);
    const [flightResults2, setFlightResults2] = useState([]);
    const [hotelResults, setHotelResults] = useState([]);
    const [itineraryFlightResults, setItineraryFlightResults] = useState([])
    const [airlinesResults, setAirlinesResults] = useState([])

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
            <Tab>Itinerary Planner</Tab>
            <Tab>Airlines</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <FlightSearch setResults1={setFlightResults1} setResults2={setFlightResults2}/>
                <FlightResults results1={flightResults1} results2={flightResults2}/>
            </TabPanel>
            <TabPanel>
                <CitySearch setResults={setHotelResults}/>
                <CityResults results={hotelResults}/>
            </TabPanel>
            <TabPanel>
                <ItineraryPlannerSearch setResults={setItineraryFlightResults}/>
                <ItineraryPlannerResults results={itineraryFlightResults}/>
            </TabPanel>
            <TabPanel>
                <AirlinesSearch setResults={setAirlinesResults}/>
            </TabPanel>
        </TabPanels>
        </Tabs>
    </Box>
  )
}
