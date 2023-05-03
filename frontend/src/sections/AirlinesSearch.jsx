import { Box, Button, Center, Heading, HStack, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import DropdownInput from '../components/DropdownInput'
import { v4 as uuidv4 } from 'uuid';

export default function AirlinesSearch({setResults}) {

    const [country, setCountry] = useState("")
    const [airline, setAirline] = useState("")
    const [airlines, setAirlines] = useState([])
    const [airports, setAirports] = useState([])
    const [busiestAirports, setBusiestAirports] = useState([])
    const [busiestAirlines, setBusiestAirlines] = useState([])
    const [hotels, setHotels] = useState([])

    const handleSubmitCountry = function() {
        fetch(`/airlinesbycountry?country=${country}`)
                    .then(response => response.json())
                    .then(data => {
                        setAirlines(data)
                    })
    }

    const handleSubmitAirline = function() {
        fetch(`/findunited?airline=${airline}`)
                    .then(response => response.json())
                    .then(data => {
                        setAirports(data)
                    })
    }

    const handleSubmitBusiestAirports = function() {
        fetch(`/findbusiestairports`)
                    .then(response => response.json())
                    .then(data => {
                        setBusiestAirports(data)
                    })
    }

    const handleSubmitBusiestAirlines = function() {
        fetch(`/findbusiestairlines`)
                    .then(response => response.json())
                    .then(data => {
                        setBusiestAirlines(data)
                    })
    }

    const handleSubmit = function() {
        handleSubmitBusiestAirlines();
        handleSubmitBusiestAirports();
    }

    const handleSubmitHotels = function() {
        fetch(`/findhotelswithincomingflights?country=${country}`)
                    .then(response => response.json())
                    .then(data => {
                        setHotels(data)
                    })
    }

  return (
    <Tabs>
        <TabList>
            <Tab>
                Popular Airlines by Country
            </Tab>
            <Tab>
                Popular Airports by Airline
            </Tab>
            <Tab>
                Top 10 Statistics
            </Tab>
            <Tab>
                Find Popular Hotels by Country
            </Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <HStack w="100wh" align="center" justify="center" mt={10} spacing={2} mb={3}>
                    <DropdownInput width={500} placeholder="Enter a country" route={"/getdistinctcountries?country="}
                    setter={setCountry} dataItemSet={"country"} dataItemShow={"country"}/>
                </HStack>
                <Center>
                    <Button colorScheme="teal" onClick={handleSubmitCountry}>Search for airlines!</Button>
                </Center>
                <TableContainer>
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Airline</Th>
                        <Th>Number of Trips</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            airlines?.map(a => {
                                return <Tr key={a.name}>
                                    <Td>{a.name}</Td>
                                    <Td>{a.n}</Td>
                                </Tr>
                            })
                        }
                    </Tbody>
                </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel>
                <HStack w="100wh" align="center" justify="center" mt={10} spacing={2} mb={3}>
                    <DropdownInput width={500} placeholder="Enter an airline" route={"/getdistinctairlines?airline="}
                    setter={setAirline} dataItemSet={"name"} dataItemShow={"name"}/>
                </HStack>
                <Center>
                    <Button colorScheme="teal" onClick={handleSubmitAirline}>Search for routes!</Button>
                </Center>
                <TableContainer>
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Airport</Th>
                        <Th>City</Th>
                        <Th>Number of Times Travelled</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            airports?.map(a => {
                                return <Tr key={uuidv4()}>
                                    <Td>{a.name}</Td>
                                    <Td>{a.city}</Td>
                                    <Td>{a.cnt}</Td>
                                </Tr>
                            })
                        }
                    </Tbody>
                </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel>
                <Heading size={"lg"}>Top 10 busiest airports <Button colorScheme="teal" onClick={handleSubmit}>Refresh</Button></Heading>
                <TableContainer>
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Airport</Th>
                        <Th>Number of Flights</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            busiestAirports?.map(a => {
                                return <Tr key={uuidv4()}>
                                    <Td>{a.airport_name}</Td>
                                    <Td>{a.num_flights}</Td>
                                </Tr>
                            })
                        }
                    </Tbody>
                </Table>
                </TableContainer>

                <Heading size={"lg"}>Top 10 busiest airlines</Heading>
                <TableContainer>
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Airport</Th>
                        <Th>Number of Routes</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            busiestAirlines?.map(a => {
                                return <Tr key={uuidv4()}>
                                    <Td>{a.airline_name}</Td>
                                    <Td>{a.num_routes}</Td>
                                </Tr>
                            })
                        }
                    </Tbody>
                </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel>
                <HStack w="100wh" align="center" justify="center" mt={10} spacing={2} mb={3}>
                        <DropdownInput width={500} placeholder="Enter a country" route={"/getdistinctcountries?country="}
                        setter={setCountry} dataItemSet={"country"} dataItemShow={"country"}/>
                    </HStack>
                    <Center>
                        <Button colorScheme="teal" onClick={handleSubmitHotels}>Search for hotels!</Button>
                    </Center>
                    <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Address</Th>
                        <Th>Latitude</Th>
                        <Th>Longitude</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {
                            hotels?.map(a => {
                                return <Tr key={uuidv4()}>
                                    <Td>{a.title}</Td>
                                    <Td>{a.address}</Td>
                                    <Td>{a.latitude}</Td>
                                    <Td>{a.longitude}</Td>
                                </Tr>
                            })
                        }
                    </Tbody>
                </Table>
            </TabPanel>
        </TabPanels>
    </Tabs>
  )
}
