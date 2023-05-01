import { Avatar, Button, Card, Flex, Spacer, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export default function FlightResults({results}) {
  return (
    <div>
        <VStack spacing={3} mt={4}>
            {
                results?.map(res => {
                return <Card p={4} w="700px" key={res.name}>
                    <Flex>
                        <Flex>
                            <Avatar name={res.name} mr="6"/>
                            <VStack spacing={2} align="left">
                                <Text size="lg" as="b" align={"left"}>{res.name}</Text>
                                <Text color={'gray'} align={"left"}>{res.id}</Text>
                            </VStack>
                        </Flex>
                        <Spacer/>
                        <Button colorScheme={'blue'}>
                            Add to Cart!
                        </Button>
                    </Flex>
                </Card>
                })
            }
        </VStack>
    </div>
  )
}
