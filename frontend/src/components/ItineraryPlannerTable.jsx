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

export default function ItineraryPlannerTable() {
  return (
    <TableContainer>
        <Table variant='simple'>
            <TableCaption>Flights available</TableCaption>
            <Thead>
            <Tr>
                <Th>First Flight</Th>
                <Th>Stop</Th>
                <Th>Final Flight</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
                <Td>
                <Card>
                Hi
                </Card>
                </Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
            </Tr>
            </Tbody>
            <Tfoot>
            <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
            </Tr>
            </Tfoot>
        </Table>
        </TableContainer>
  )
}
