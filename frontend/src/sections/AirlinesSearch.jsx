import { Box, Button, Center, HStack, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import DropdownInput from '../components/DropdownInput'

export default function AirlinesSearch({setResults}) {

    const [country, setCountry] = useState("")
    const [airlines, setAirlines] = useState([])

    const handleSubmitCountry = function() {
        fetch(`/airlinesbycountry?country=${country}`)
                    .then(response => response.json())
                    .then(data => {
                        setAirlines(data)
                    })
    }

  return (
    <Tabs>
        <TabList>
            <Tab>
                By Country
            </Tab>
            <Tab>
                By Airline
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
                            airlines.map(a => {
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
                    <DropdownInput width={500} placeholder="Enter an airline" route={"/getdistinctairlines?country="}
                    setter={setAirlines} dataItemSet={"name"} dataItemShow={"name"}/>
                </HStack>
                <Center>
                    <Button colorScheme="teal" onClick={handleSubmitCountry}>Search for routes!</Button>
                </Center>
            </TabPanel>
        </TabPanels>
    </Tabs>
  )
}
