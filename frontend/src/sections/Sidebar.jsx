import { Box } from '@chakra-ui/react'
import React from 'react'
import SidebarComponent from '../components/SidebarComponent'

export default function Sidebar() {
  return (
    <Box h={"full"} borderRight={"2px"} borderColor={"gray.200"}>
        <SidebarComponent text={"Flights"}/>
        <SidebarComponent text={"Hotels"}/>
        <SidebarComponent text={"Restaurants"}/>
        <SidebarComponent text={"Cities"}/>
    </Box>
  )
}
