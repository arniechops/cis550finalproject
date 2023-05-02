import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Card, Flex, Heading, HStack, Text } from '@chakra-ui/react'
import React from 'react'

export default function FlightPlanComponent() {

    const data = {
        "firstNumStops": 1,
        "first": "Detroit Metro Wayne Co",
        "second": "General Mariano Escobedo Intl",
        "firstAirline": "AeroMéxico",
        "secondAirline": "Interjet (ABC Aerolineas)",
        "third": "Mc Carran Intl",
        "secondNumStops": 1,
        "fourth": "Heathrow",
        "thirdAirline": "Iberia Airlines",
        "fourthAirline": "American Airlines",
        "fifth": "Charles De Gaulle"
    }

    const Flight = ({flightName, airport1Name, airport2Name}) => {
        return (
            (flightName && airport1Name && airport2Name) && <Box>
                <Heading fontSize={"xl"}>
                    Delta Airlines
                </Heading>
                <HStack alignItems={"center"} spacing={1}>
                    <Text>
                        Airport 1
                    </Text>
                    <ArrowForwardIcon/>
                    <Text>
                        Airport 2
                    </Text>
                </HStack>
            </Box>
        )
    }

  return (
    <Card p={4}>
        <HStack spacing={5}>
            <Flight flightName={data.firstAirline ?? null} airport1Name={data.first ?? null}
            airport2Name={data.second ?? null}/>
            <ArrowForwardIcon size="lg"/>
            <Flight/>
        </HStack>
    </Card>
  )
}
