import { Badge, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function SmallAttractionsComponent({name, type}) {
    const colors = {
        "sleep": "purple",
        "eat": "orange",
        "other": "gray",
        "see": "green",
        "drink": "blue"
    }
  return (
    <Flex border={"gray.200"} p={2}>
        <Badge colorScheme={colors[type]} mr={2}>{type}</Badge>
        <Text>{name}</Text>
    </Flex>
  )
}
