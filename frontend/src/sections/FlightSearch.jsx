import React, { useContext, useEffect, useState } from 'react'
import { AddIcon, ArrowForwardIcon, CloseIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react'
import DropdownInput from '../components/DropdownInput';
import useGet from '../hooks/useGet';
import { FlightsContext } from '../pages/Home';

export default function FlightSearch() {

    const [extraStop, setExtraStop] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [final, setFinal] = useState("");

    const {setFlightResults} = useContext(FlightsContext);

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
                setFlightResults(data)
            })
            .catch(error => {
                console.error(error);
            });
    }

  return (
    <form>
        <HStack w="100wh" align="center" justify="center" mt={10} spacing={2} mb={3}>
            <DropdownInput placeholder={"From"} setter={setFrom}/>
            <Box align="center" justify="center">
                <ArrowForwardIcon w="6" h="6" />
            </Box>
            <DropdownInput placeholder={"To"} setter={setTo}/>
            {
                extraStop && (
                    <>
                        <Box align="center" justify="center">
                            <ArrowForwardIcon w="6" h="6" />
                        </Box>
                        <DropdownInput placeholder={"Final"} route={'/getallflights'} setter={setFinal}/>
                    </>
                )
            }
            <Button rounded={"full"} colorScheme={extraStop ? "red" : "gray"} onClick={() => setExtraStop(!extraStop)}>
                {
                    extraStop ? <CloseIcon/> : <AddIcon/>
                }
            </Button>
        </HStack>
        <Flex w="full" justify={"center"}>
            <Button colorScheme="teal" onClick={handleSubmit}>Search for flights!</Button>
        </Flex>
    </form>
  )
}
