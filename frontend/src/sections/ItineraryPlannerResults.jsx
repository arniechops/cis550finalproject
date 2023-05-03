import { Card, SimpleGrid, Heading, GridItem, Text, Box, Center, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FlightPlanComponent from '../components/FlightPlanComponent'
import ItineraryPlannerTable from '../components/ItineraryPlannerTable'
import SmallAttractionsComponent from '../components/SmallAttractionsComponent';

export default function ItineraryPlannerResults({results}) {

    const [citiesVisited, setCitiesVisited] = useState([]);
    const [hotels, setHotels] = useState({})
    const [attractions, setAttractions] = useState({})

    useEffect(() => {
        if (results.length>0) {
            let arr = []
            const plan = results[0]
            arr.push(plan.second)
            arr.push(plan.third)
            arr.push(plan.fourth)
            arr.push(plan.fifth)
            arr = arr.filter(x => x !== null)
            setCitiesVisited(arr)

            arr.forEach(x => {
                fetch(`/findclosesthotel?airport=${x}`)
                    .then(response => response.json())
                    .then(data => {
                        let temp = hotels
                        temp[x] = data[0] ?? null
                        setHotels(temp)
                    })
                fetch(`/findattractions?airport=${x}`)
                    .then(response => response.json())
                    .then(data => {
                        let temp = attractions
                        temp[x] = data
                        setAttractions(temp)
                    })
            })
            console.log(attractions)
        }
    }, [results])
    

  return (
    <Box>
        <Center>
            <Card p={6} minW={"500px"}>
                <VStack spacing={4}>
                    <Heading>
                        Your Optimal Itinerary
                    </Heading>
                    <Heading fontSize={'lg'}>
                        Flights
                    </Heading>
                        <ItineraryPlannerTable data={[results[0]??[]]}/>
                    <Heading fontSize={'lg'}>
                        Hotels
                    </Heading>
                    <SimpleGrid columns={citiesVisited.length??3} spacing={10}>
                        {
                            citiesVisited.map(x => {
                                return <GridItem>
                                <Text>
                                    {x}
                                </Text>
                                <Box>
                                    <Text>
                                        {hotels[x] ? hotels[x].title : "No hotels found"}
                                    </Text>
                                </Box>
                            </GridItem>
                            })
                        }
                    </SimpleGrid>
                    <Heading fontSize={'lg'}>
                        Places to Visit
                    </Heading>
                    <SimpleGrid columns={citiesVisited.length??3} spacing={10}>
                    {
                        citiesVisited.map(x => {
                            return <GridItem>
                            <Text>
                                {x}
                            </Text>
                            <Box>
                                {
                                    attractions[x] ? attractions[x].map(elt => {
                                        return <SmallAttractionsComponent name={elt.article} type={elt.type}/>
                                    }) : "No attractions found"
                                }
                            </Box>
                        </GridItem>
                        })
                    }
                    </SimpleGrid>
                </VStack>
            </Card>
        </Center>
        <Heading size={'lg'} m={2}>
            All Possible Routes
        </Heading>
        <ItineraryPlannerTable data={results}/>
        {/* <FlightPlanComponent/> */}
    </Box>
  )
}
