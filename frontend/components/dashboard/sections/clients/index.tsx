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
  useToast,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { FaPencilAlt, FaPlusSquare, FaTrash } from "react-icons/fa"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import Image from "../../../image"
import ClientSkeleton from "./client-skeleton"

interface ClientsSectionProps {
  state: IState
}

const ClientsSection: React.FC<ClientsSectionProps> = (
  props: ClientsSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const token = props.state.user?.access as string
  const toast = useToast()
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

  interface Client {
    id: number
    image: string
    name: string
  }

  const [data, setData] = useState<Client[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/api/dashboard/clients/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: Client[] = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token])

  const deleteClient = async (id: number) => {
    if (data === null) return

    let newClients = [...data]
    newClients = newClients.filter((client) => client.id !== id)
    setData(newClients)

    const response = await axiosInstance.delete(`/api/dashboard/client/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const resData: { message: string } = response.data

    toast({
      title: resData.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

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
        <title>Clients | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Clients
        </Heading>
        <Link href="/dashboard/clients/new">
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
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && [1, 2, 3].map((ele) => <ClientSkeleton key={ele} />)}
            {data &&
              data.map((client) => (
                <Tr key={client.id}>
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
                        src={`${BASE_API_URL}${client.image}`}
                        alt="service image"
                      />
                      <Text fontSize={13}>{client.name}</Text>
                    </HStack>
                  </Td>

                  <Td>
                    <HStack
                      w="full"
                      align="start"
                      flexDir={["column", "row", "row", "row", "row"]}
                      gap={2}
                      spacing={[0, 2, 2, 2, 2]}
                    >
                      <Link href={`/dashboard/clients/edit/${client.id}`}>
                        <a>
                          <Button size="sm" rounded={0} colorScheme="orange">
                            <FaPencilAlt fontSize={13} />
                            <Text fontSize={13} ps={2}>
                              Edit
                            </Text>
                          </Button>
                        </a>
                      </Link>
                      <Button
                        size="sm"
                        rounded={0}
                        colorScheme="red"
                        onClick={() => deleteClient(client.id)}
                      >
                        <FaTrash fontSize={13} />
                        <Text fontSize={13} ps={2}>
                          Delete
                        </Text>
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </VStack>
    </VStack>
  )
}

export default withAuth(ClientsSection)
