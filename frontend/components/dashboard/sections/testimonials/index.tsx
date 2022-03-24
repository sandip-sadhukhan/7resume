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
import { FaPencilAlt, FaPlusSquare, FaTrash } from "react-icons/fa"
import Image from "../../../image"

const TestimonialSection = () => {
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
        <title>Testimonials | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Testimonials
        </Heading>
        <Link href="/dashboard/testimonials/new">
          <a>
            <Button size="xs" colorScheme="green" rounded={0}>
              <FaPlusSquare fontSize={13} />
              <Text fontSize={12} ps={1}>
                Add New Record
              </Text>
            </Button>
          </a>
        </Link>
      </HStack>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack w="full" pt={5} align="start" spacing={4} overflowX="auto">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Position</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <HStack
                  w="full"
                  align="start"
                  alignItems="center"
                  flexDir={["column", "row", "row", "row", "row"]}
                  gap={2}
                  spacing={[0, 2, 2, 2, 2]}
                >
                  <Image
                    width={40}
                    height={40}
                    src="/1.png"
                    alt="service image"
                  />
                  <Text fontSize={13}>Sandip Sadhukhan</Text>
                </HStack>
              </Td>

              <Td>
                <Text fontSize={13}>Web Developer</Text>
              </Td>

              <Td>
                <HStack
                  w="full"
                  align="start"
                  flexDir={["column", "row", "row", "row", "row"]}
                  gap={2}
                  spacing={[0, 2, 2, 2, 2]}
                >
                  <Link href="/dashboard/testimonials/edit/1">
                    <a>
                      <Button size="sm" rounded={0} colorScheme="orange">
                        <FaPencilAlt fontSize={13} />
                        <Text fontSize={13} ps={2}>
                          Edit
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

export default TestimonialSection
