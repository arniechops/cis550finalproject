import React, { useContext, useEffect, useState } from 'react'
import { AddIcon, ArrowForwardIcon, CloseIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Checkbox, Flex, HStack, IconButton, Input, Text, VStack } from '@chakra-ui/react'
import DropdownInputFlights from '../components/DropdownInputFlights';
import useGet from '../hooks/useGet';
import { FlightsContext } from '../pages/Home';
import DropdownInput from '../components/DropdownInput';

export default function FlightSearch({setResults1, setResults2}) {

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
        const url = '/gettrip';
        const params = {
            from: from,
            to: to,
            final: final
        };

        const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');

        fetch(`${url}?${queryString}`)
            .then(response => response.json())
            .then(data => {
                setResults1(data)
            })
            .catch(error => {
                console.error(error);
            });
        
        const params2 = {
            from: to,
            to: from,
            final: final
        };

        const queryString2 = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');

        fetch(`${url}?${queryString2}`)
            .then(response => response.json())
            .then(data => {
                setResults2(data)
            })
            .catch(error => {
                console.error(error);
            });
    }

  return (
    <form>
        <HStack w="100wh" align="center" justify="center" mt={10} spacing={2} mb={3}>
            <DropdownInputFlights placeholder={"From"} setter={setFrom}/>
            <Box align="center" justify="center">
                <ArrowForwardIcon w="6" h="6" />
            </Box>
            <DropdownInputFlights placeholder={"From"} setter={setTo}/>
            {
                extraStop && (
                    <>
                        <Box align="center" justify="center">
                            <ArrowForwardIcon w="6" h="6" />
                        </Box>
                        <DropdownInputFlights placeholder={"Final"} route={'/getallflights'} setter={setFinal}/>
                    </>
                )
            }
            <IconButton size="sm" rounded={"full"} colorScheme={extraStop ? "red" : "gray"}
            icon={extraStop ? <CloseIcon/> : <AddIcon/>}
            onClick={() => setExtraStop(!extraStop)}/>
        </HStack>
        <Flex w="full" justify={"center"}>
            <Button colorScheme="teal" onClick={handleSubmit}>Search for flights!</Button>
        </Flex>
    </form>
  )
}
