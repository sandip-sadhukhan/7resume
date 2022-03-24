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

const MessagesSection = () => {
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
        <title>Messages | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Messages
        </Heading>
      </HStack>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack w="full" pt={5} align="start" spacing={4} overflowX="auto">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Created</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Text fontSize={13}>Dark Looter</Text>
              </Td>

              <Td>
                <Text fontSize={13}>darklooter@gmail.com</Text>
              </Td>

              <Td>
                <Text fontSize={13}>2018-03-23 21:35:00</Text>
              </Td>

              <Td>
                <HStack
                  w="full"
                  align="start"
                  flexDir={["column", "row", "row", "row", "row"]}
                  gap={2}
                  spacing={[0, 2, 2, 2, 2]}
                >
                  <Link href="/dashboard/messages/view/1">
                    <a>
                      <Button size="sm" rounded={0} colorScheme="orange">
                        <FaEye fontSize={13} />
                        <Text fontSize={13} ps={2}>
                          View
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

export default MessagesSection
