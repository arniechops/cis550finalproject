import { InfoIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, HStack, IconButton } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import DropdownInput from '../components/DropdownInput'
import DropdownInputFlights from '../components/DropdownInputFlights'
import PopoverFilteringComponent from '../components/PopoverFilteringComponent'
import { FlightsContext } from '../pages/Home'

export default function CitySearch({setResults}) {

  const [value, setValue] = useState("")
  const [sliderVal, setSliderVal] = useState(10)

  function handleSubmit() {
    fetch(`/findnearbyhotels?airport=${value}&distance=${sliderVal}`)
            .then(response => response.json())
            .then(data => {
              setResults(data)
            })
            .catch(error => {
                console.error(error);
            });
  } 

  return (
    <form>
      <Box w="100wh" align="center" justify="center" mt={10} spacing={2} mb={3}>
        <HStack w="full" justify="center" align="center" mb={2} spacing={2}>
            <DropdownInput placeholder={"Give us a location or airport..."} width={400} setter={setValue}
            dataItemShow={"full"} dataItemSet={"name"} route={"/getflights?string="}
            />
        <PopoverFilteringComponent setter={setSliderVal}/>
        </HStack>
        <Flex w="full" justify={"center"}>
            <Button colorScheme="teal" onClick={handleSubmit}>Search for hotels!</Button>
        </Flex>
      </Box>
    </form>
  )
}
