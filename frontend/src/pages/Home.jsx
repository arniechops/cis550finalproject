import { AddIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Card, Flex, Input, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export default function Home() {
  return (
    <Box>
        <Flex w="100wh" align="center" justify="center" mt={10}>
            <Input width="200px"/>
            <Box align="center" justify="center">
                <Button>
                    <ArrowForwardIcon w="6" h="6" />
                </Button>
            </Box>
            <Input width="200px"/>
        </Flex>
        <VStack spacing={3} mt={4}>
            <Card p={4} w="15%">
                <Flex>
                    <Avatar name='City' mr="6"/>
                    <VStack spacing={2} align="left">
                        <Text size="lg" as="b" align={"left"}>Flight X</Text>
                        <Text color={'gray'} align={"left"}>From DXB to JFK</Text>
                    </VStack>
                </Flex>
            </Card>
            <Card p={4} w="15%">
                <Flex>
                    <Avatar name='City' mr="6"/>
                    <VStack spacing={2} align="left">
                        <Text size="lg" as="b" align={"left"}>Flight X</Text>
                        <Text color={'gray'} align={"left"}>From DXB to JFK</Text>
                    </VStack>
                </Flex>
            </Card>
        </VStack>
    </Box>
  )
}
