import {
  Button,
  Divider,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import { FaEye, FaTrash } from "react-icons/fa"

const RequestedAppointmentsSection = () => {
  const bgColor = useColorModeValue("white", "gray.700")

  return (
    <VStack
      bgColor={bgColor}
      w="full"
      align="start"
      py={5}
      px={[2, 2, 4, 8, 8]}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>Requested Appointments | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Requested Appointments
        </Heading>
      </HStack>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack w="full" pt={5} align="start" spacing={4} overflowX="auto">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th>Subject</Th>
              <Th>Name</Th>
              <Th>Appointments</Th>
              <Th>Created</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Text fontSize={13}>Redesign of my website</Text>
              </Td>

              <Td>
                <Text fontSize={13}>Maronia Muhammad</Text>
              </Td>

              <Td>
                <Text fontSize={13}>06/22/2020 - 3:28 pm</Text>
              </Td>

              <Td>
                <Text fontSize={13}>2020-06-12 00:29:06</Text>
              </Td>

              <Td>
                <HStack
                  w="full"
                  align="start"
                  flexDir={["column", "row", "row", "row", "row"]}
                  gap={2}
                  spacing={[0, 2, 2, 2, 2]}
                >
                  <Link href="/dashboard/appointments/requested/view/1">
                    <a>
                      <Button size="sm" rounded={0} colorScheme="orange">
                        <FaEye fontSize={13} />
                        <Text fontSize={13} ps={2}>
                          Details
                        </Text>
                      </Button>
                    </a>
                  </Link>
                  <Button size="sm" rounded={0} colorScheme="red">
                    <FaTrash fontSize={13} />
                    <Text fontSize={13} ps={2}>
                      Delete
                    </Text>
                  </Button>
                </HStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </VStack>
    </VStack>
  )
}

export default RequestedAppointmentsSection
