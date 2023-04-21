import { Box, HStack, Input, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

export default function DropdownInput({placeholder, width=200}) {
    const l = ["Option1", "Option2", "Option3"]
    const [focus, setFocus] = useState(false)
    const [text, setText] = useState("")
    const inputRef = useRef()
  return (
    <Box position={"relative"}>
        <Input width={`${width}px`} placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onChange={e => setText(e.target.value)}
        value={text}
        ref={inputRef}/>
        {
            focus && (
                <Box pt={2} pb={2} rounded={"md"} border={"1px"} borderColor={"gray.200"} bg={"white"} position={"absolute"} top={'45px'} zIndex={100}>
                <VStack spacing={0}>
                    {
                        l.map(elt => {
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
