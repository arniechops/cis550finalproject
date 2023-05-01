import { Badge, Box, Center, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'

export default function CityResults({results}) {
    
    const colors = {
        "sleep": "purple",
        "eat": "orange",
        "other": "gray",
        "see": "green",
        "drink": "blue"
    }

  return (
    <Center>

        <Grid templateColumns='repeat(4, 1fr)' gap={6} maxW={'80%'}>
            {
                results.map(res => {
                    return <GridItem p="5" maxW="320px" borderWidth="1px">
                        {/* <Image borderRadius="md" src="https://bit.ly/2k1H1t6" /> */}
                        <Flex align="baseline" mt={2}>
                        <Badge colorScheme={colors[res.type]}>{res.type}</Badge>
                        <Text
                            ml={2}
                            textTransform="uppercase"
                            fontSize="sm"
                            fontWeight="bold"
                            color={`${colors[res.type]}.400`}
                        >
                            {res.article}
                        </Text>
                        </Flex>
                        <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                        {res.title}
                        </Text>
                        <Text mt={2}>{res.description}</Text>
                        <Flex mt={2} align="center">
                        {/* <Box as={MdStar} color="orange.400" /> */}
                        <Text ml={1} fontSize="sm">
                            <b>4.84</b> (190)
                        </Text>
                        </Flex>
                    </GridItem>
                })
            }
        </Grid>
    </Center>
  )
}
