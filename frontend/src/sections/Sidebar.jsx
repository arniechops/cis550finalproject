import { Box } from '@chakra-ui/react'
import React from 'react'
import SidebarComponent from '../components/SidebarComponent'

export default function Sidebar({handleMenuItemChange, menuItem}) {
  return (
    <Box h={"full"} borderRight={"2px"} borderColor={"gray.200"}>
        <SidebarComponent selected={menuItem === 1} onClick={() => handleMenuItemChange(1)} text={"Flights"}/>
        <SidebarComponent selected={menuItem === 2} onClick={() => handleMenuItemChange(2)} text={"Hotels"}/>
        <SidebarComponent selected={menuItem === 3} onClick={() => handleMenuItemChange(3)} text={"Restaurants"}/>
        <SidebarComponent selected={menuItem === 4} onClick={() => handleMenuItemChange(4)} text={"Cities"}/>

    </Box>
  )
}
