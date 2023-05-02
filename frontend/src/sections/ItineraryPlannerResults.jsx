import { Card, SimpleGrid, Heading, GridItem, Text, Box } from '@chakra-ui/react'
import React from 'react'
import ItineraryPlannerTable from '../components/ItineraryPlannerTable'

export default function ItineraryPlannerResults({results}) {
  return (
    <Box>
        <Card>
            <Heading>
                Your Itinerary
            </Heading>
            <Heading fontSize={'lg'}>
                Flights
            </Heading>
            <SimpleGrid columns={2} spacing={10}>
                <GridItem>
                    <Text>
                        DXB to PHL
                    </Text>
                </GridItem>
                <GridItem>
                    <Text>
                        PHL to SFO
                    </Text>
                </GridItem>
            </SimpleGrid>
            <Heading fontSize={'lg'}>
                Hotels
            </Heading>
            <SimpleGrid columns={2} spacing={10}>
                <GridItem>
                    <Text>
                        Philadelphia
                    </Text>
                </GridItem>
                <GridItem>
                    <Text>
                        San Francisco
                    </Text>
                </GridItem>
            </SimpleGrid>
            <Heading fontSize={'lg'}>
                Places to Visit
            </Heading>
            <SimpleGrid columns={2} spacing={10}>
                <GridItem>
                    <Text>
                        Philadelphia
                    </Text>
                </GridItem>
                <GridItem>
                    <Text>
                        San Francisco
                    </Text>
                </GridItem>
            </SimpleGrid>
        </Card>
        <ItineraryPlannerTable/>
    </Box>
  )
}
