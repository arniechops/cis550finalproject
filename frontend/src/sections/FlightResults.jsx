import { Avatar, Button, Card, Center, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export default function FlightResults({results1, results2}) {
  return (
    <Center>
        <HStack spacing={10}>
            <VStack spacing={3} mt={4}>
                {results1?.length > 0  && <Text as="b">To</Text>}
                {
                    results1?.map(res => {
                    return <Card p={4} w={"full"} key={res.name}>
                        <Flex>
                            <Flex>
                                <Avatar name={res.name} mr="6"/>
                                <VStack spacing={2} align="left">
                                    <Text size="lg" as="b" align={"left"}>{res.name}</Text>
                                    <Text color={'gray'} align={"left"}>{res.id}</Text>
                                </VStack>
                            </Flex>
                            <Spacer/>
                            {/* <Button colorScheme={'blue'}>
                                Add to Cart!
                            </Button> */}
                        </Flex>
                    </Card>
                    })
                }
            </VStack>
            <VStack spacing={3} mt={4}>
                {results2?.length > 0  && <Text as="b">Back</Text>}
                {
                    results2?.map(res => {
                    return <Card p={4} w={"full"} key={res.name}>
                        <Flex>
                            <Flex>
                                <Avatar name={res.name} mr="6"/>
                                <VStack spacing={2} align="left">
                                    <Text size="lg" as="b" align={"left"}>{res.name}</Text>
                                    <Text color={'gray'} align={"left"}>{res.id}</Text>
                                </VStack>
                            </Flex>
                            <Spacer/>
                        </Flex>
                    </Card>
                    })
                }
            </VStack>
        </HStack>
    </Center>
  )
}
