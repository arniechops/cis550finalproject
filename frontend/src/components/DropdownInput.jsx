import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import useGet from '../hooks/useGet'

export default function DropdownInput({placeholder, width=200, route='/getallflights'}) {

    const [focus, setFocus] = useState(false)
    const [text, setText] = useState("")
    const inputRef = useRef()
    const [options, setOptions] = useState(["Option 1", "Option 2"])
    
    const {result, loading} = useGet(route, setOptions);

    function handleChange (e) {
        setText(e.target.value)
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
                setFocus(false)
            }}><CloseIcon size={"sm"}/></Button>} />
        </InputGroup>
        {
            focus && (
                <Box pt={2} pb={2} rounded={"md"} border={"1px"} borderColor={"gray.200"} bg={"white"} position={"absolute"} top={'45px'} zIndex={100}>
                <VStack spacing={0}>
                    {
                        options.map(elt => {
                            return <Box
                            key={elt}
                            p={2}
                            _hover={{bg: 'gray.50', cursor: 'pointer'}}
                            onClick={() => {
                                setText(elt)
                                setFocus(false)
                            }}
                            width={inputRef.current.offsetWidth}>{elt}</Box>
                        })
                    }
                </VStack>
                </Box>
            )
        }
    </Box>
  )
}
