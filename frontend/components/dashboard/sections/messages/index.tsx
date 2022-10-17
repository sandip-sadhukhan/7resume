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
import dayjs from "dayjs"
import Head from "next/head"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { FaEye, FaTrash } from "react-icons/fa"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import MessagesSkeleton from "./messages-skeleton"

interface MessagesSectionProps {
  state: IState
}

const MessagesSection: React.FC<MessagesSectionProps> = (
  props: MessagesSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const token = props.state.user?.access as string
  const toast = useToast()

  interface Message {
    id: number
    name: string
    email: string
    created_at: string
  }

  const [data, setData] = useState<Message[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/api/dashboard/messages/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: Message[] = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token])

  const deleteMessage = async (id: number) => {
    if (data === null) return

    let newMessages = [...data]
    newMessages = newMessages.filter((message) => message.id !== id)
    setData(newMessages)

    const response = await axiosInstance.delete(
      `/api/dashboard/message/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
            {isLoading &&
              [1, 2, 3].map((ele) => <MessagesSkeleton key={ele} />)}
            {data &&
              data.map((message) => (
                <Tr key={message.id}>
                  <Td>
                    <Text fontSize={13}>{message.name}</Text>
                  </Td>

                  <Td>
                    <Text fontSize={13}>{message.email}</Text>
                  </Td>

                  <Td>
                    <Text fontSize={13}>
                      {dayjs(message.created_at).format("DD MMM, YYYY, HH:mm")}
                    </Text>
                  </Td>

                  <Td>
                    <HStack
                      w="full"
                      align="start"
                      flexDir={["column", "row", "row", "row", "row"]}
                      gap={2}
                      spacing={[0, 2, 2, 2, 2]}
                    >
                      <Link href={`/dashboard/messages/view/${message.id}`}>
                        <a>
                          <Button size="sm" rounded={0} colorScheme="orange">
                            <FaEye fontSize={13} />
                            <Text fontSize={13} ps={2}>
                              View
                            </Text>
                          </Button>
                        </a>
                      </Link>
                      <Button
                        size="sm"
                        rounded={0}
                        colorScheme="red"
                        onClick={() => deleteMessage(message.id)}
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

export default withAuth(MessagesSection)
