import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

export default function DropdownInput({placeholder, width=200, setter, route, dataItemShow, dataItemSet}) {

    const [focus, setFocus] = useState(false)
    const [text, setText] = useState("")
    const inputRef = useRef()
    const [options, setOptions] = useState()

    function handleChange (e) {
        const str = e.target.value
        setText(str)
        fetch(`${route}${str}`)
            .then(res => res.json())
            .then(data => setOptions(data))
    }

  return (
    <Box position={"relative"}>
        <InputGroup>
            <Input width={`${width}px`} placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onChange={e => handleChange(e)}
            value={text}
            ref={inputRef}/>
            <InputRightElement children={<Button size="xs" onClick={() => {
                setText("")
                setter("")
                setFocus(false)
            }}><CloseIcon size={"sm"}/></Button>} />
        </InputGroup>
        {
            (focus && options?.length > 0) && (
                <Box pt={2} pb={2} rounded={"md"} border={"1px"} borderColor={"gray.200"} bg={"white"} position={"absolute"} top={'45px'} zIndex={100}>
                <VStack spacing={0}>
                    {
                        options.map(elt => {
                            return <Box
                            key={elt.id}
                            p={2}
                            _hover={{bg: 'gray.50', cursor: 'pointer'}}
                            onClick={() => {
                                setter(elt[dataItemSet])
                                setText(elt[dataItemShow])
                                setFocus(false)
                            }}
                            width={inputRef.current.offsetWidth}>{
                                elt[dataItemShow]
                            }</Box>
                        })
                    }
                </VStack>
                </Box>
            )
        }
    </Box>
  )
}
