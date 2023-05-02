import React, { useContext, useEffect, useState } from 'react'
import { AddIcon, ArrowForwardIcon, CloseIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Checkbox, Flex, HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import DropdownInputFlights from '../components/DropdownInputFlights';
import DropdownInput from '../components/DropdownInput';

export default function ItineraryPlannerSearch({setResults }) {

    const [extraStop, setExtraStop] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [final, setFinal] = useState("");


    function handleSubmit() {
        if (!from || !to || (extraStop && !final)) {
            alert("Not all fields have been filled")
            return
        }
        if (from === to || final === to) {
            alert("Two of the stops are the same")
            return
        }
        const url = '/flightswiththreestops';
        const params = {
            fromCity: from,
            midCity: to,
            toCity: final
        };

        const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');

        fetch(`${url}?${queryString}`)
            .then(response => response.json())
            .then(data => {
                setResults(data)
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            });
    }
  return (
    <div>
        <HStack w="100wh" align="center" justify="center" mt={10} spacing={2} mb={3}>
            <DropdownInput placeholder={"City"} setter={setFrom} route={'/getdistinctcities?string='}
            dataItemShow="city" dataItemSet="city"/>
            <Box align="center" justify="center">
                <ArrowForwardIcon w="6" h="6" />
            </Box>
            <DropdownInput placeholder={"City"} setter={setTo} route={'/getdistinctcities?string='}
            dataItemShow="city" dataItemSet="city"/>
            {
                extraStop && (
                    <>
                        <Box align="center" justify="center">
                            <ArrowForwardIcon w="6" h="6" />
                        </Box>
                        <DropdownInput placeholder={"City"} setter={setFinal} route={'/getdistinctcities?string='}
            dataItemShow="city" dataItemSet="city"/>                    </>
                )
            }
            <IconButton size="sm" rounded={"full"} colorScheme={extraStop ? "red" : "gray"}
            icon={extraStop ? <CloseIcon/> : <AddIcon/>}
            onClick={() => setExtraStop(!extraStop)}/>
        </HStack>
        <Flex w="full" justify={"center"}>
            <Button colorScheme="teal" onClick={handleSubmit}>Search for flights!</Button>
        </Flex>
    </div>
  )
}
