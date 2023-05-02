import { Box, Button, Center, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'
import DropdownInput from '../components/DropdownInput'

export default function AirlinesSearch({setResults}) {

    const [country, setCountry] = useState("")
    const [airlines, setAirlines] = useState([])

    const handleSubmit = function() {
        console.log("submitted")
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
                    <Button colorScheme="teal" onClick={handleSubmit}>Search for airlines!</Button>
                </Center>
            </TabPanel>
            <TabPanel>
                <HStack w="100wh" align="center" justify="center" mt={10} spacing={2} mb={3}>
                    <DropdownInput width={500} placeholder="Enter an airline" route={"/getdistinctairlines?country="}
                    setter={setAirlines} dataItemSet={"name"} dataItemShow={"name"}/>
                </HStack>
                <Center>
                    <Button colorScheme="teal" onClick={handleSubmit}>Search for routes!</Button>
                </Center>
            </TabPanel>
        </TabPanels>
    </Tabs>
  )
}
