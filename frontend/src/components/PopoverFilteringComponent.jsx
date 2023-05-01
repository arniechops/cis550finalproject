import { InfoIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Checkbox, Grid, GridItem, HStack, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function PopoverFilteringComponent({setter}) {

    const [sliderValue, setSliderValue] = useState(0)

    const labelStyles = {
      mt: '2',
      ml: '-2.5',
      fontSize: 'sm',
    }

    const colorOptions = ["sleep", "eat", "other", "do", "see", "drink"]

    const colors = {
        "sleep": "purple",
        "eat": "orange",
        "other": "gray",
        "see": "green",
        "drink": "blue",
        "do": "yellow"
    }

  return (
    <Popover>
        <PopoverTrigger>
            <IconButton icon={<InfoIcon/>}/>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Filter</PopoverHeader>
            <PopoverBody>
                <Box pt={6} pb={2} p={2}>
                    <Text mb={2} as="b">Distance</Text>
                    <Slider onChange={(val) => {
                        setSliderValue(val)
                        setter(val)
                    }} max={10}>
                        <SliderMark value={0} {...labelStyles}>
                        0
                        </SliderMark>
                        <SliderMark value={10} {...labelStyles}>
                        10
                        </SliderMark>
                        <SliderMark
                        value={sliderValue}
                        textAlign='center'
                        bg='blue.500'
                        color='white'
                        mt='-10'
                        ml='-5'
                        w='12'
                        >
                        {sliderValue}
                        </SliderMark>
                        <SliderTrack>
                        <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </Box>
                <Text as="b">Type</Text>
                <Grid templateColumns='repeat(3, 1fr)' gap={3} mt={2}>
                    {
                        colorOptions.map(elt => {
                            return <GridItem>
                                <Checkbox alignItems={"center"}>
                                    <Badge colorScheme={colors[elt]}>{elt}</Badge>
                                </Checkbox>
                            </GridItem>
                        })
                    }
                </Grid>
            </PopoverBody>
        </PopoverContent>
    </Popover>
  )
}
