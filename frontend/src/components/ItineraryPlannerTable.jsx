import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Card,
  } from '@chakra-ui/react'

export default function ItineraryPlannerTable({data}) {

//   const data = [{
//     "firstNumStops": 1,
//     "first": "Detroit Metro Wayne Co",
//     "second": "General Mariano Escobedo Intl",
//     "firstAirline": "AeroMéxico",
//     "secondAirline": "Interjet (ABC Aerolineas)",
//     "third": "Mc Carran Intl",
//     "secondNumStops": 1,
//     "fourth": "Heathrow",
//     "thirdAirline": "Iberia Airlines",
//     "fourthAirline": "American Airlines",
//     "fifth": "Charles De Gaulle"
// }]

  return (
    <TableContainer>
        <Table variant='simple'>
            <TableCaption>Flights available</TableCaption>
            <Thead>
            <Tr>
                <Th>First</Th>
                <Th>Airline 1</Th>
                <Th>Second</Th>
                <Th>Airline 2</Th>
                <Th>Third</Th>
                <Th>Airline 3</Th>
                <Th>Fourth</Th>
                <Th>Airline 4</Th>
                <Th>Fifth</Th>
            </Tr>
            </Thead>
            <Tbody>
              {
                data.map(elt => {
                  return <Tr>
                    <Td>{elt.first}</Td>
                    <Td>{elt.firstAirline}</Td>
                    <Td>{elt.second}</Td>
                    <Td>{elt.secondAirline}</Td>
                    <Td>{elt.third}</Td>
                    <Td>{elt.thirdAirline}</Td>
                    <Td>{elt.fourth}</Td>
                    <Td>{elt.fourthAirline}</Td>
                    <Td>{elt.fifth}</Td>
                  </Tr>
                })
              }
            </Tbody>
        </Table>
        </TableContainer>
  )
}
