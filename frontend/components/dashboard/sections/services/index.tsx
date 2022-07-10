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
import ServiceSkeleton from "./service-skeleton"

interface ServicesSectionProps {
  state: IState
}

const ServicesSection: React.FC<ServicesSectionProps> = (
  props: ServicesSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const token = props.state.user?.access as string
  const toast = useToast()
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

  interface Service {
    id: number
    title: string
    image: string
  }

  const [data, setData] = useState<Service[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/api/dashboard/services/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: Service[] = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token])

  const deleteService = async (id: number) => {
    if (data === null) return

    let newServices = [...data]
    newServices = newServices.filter((service) => service.id !== id)
    setData(newServices)

    const response = await axiosInstance.delete(
      `/api/dashboard/service/${id}`,
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
      px={8}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>Services | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Services
        </Heading>
        <Link href="/dashboard/services/new">
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

      <VStack w="full" pt={5} align="start" spacing={4}>
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && [1, 2, 3].map((ele) => <ServiceSkeleton key={ele} />)}
            {data &&
              data.map((service) => (
                <Tr key={service.id}>
                  <Td>
                    <HStack
                      w="full"
                      alignItems={[
                        "start",
                        "center",
                        "center",
                        "center",
                        "center",
                      ]}
                      flexDir={["column", "row", "row", "row", "row"]}
                      gap={2}
                      spacing={[0, 2, 2, 2, 2]}
                    >
                      <Image
                        width={40}
                        height={40}
                        src={`${BASE_API_URL}${service.image}`}
                        alt={`${service.title} image`}
                      />
                      <Text fontSize={13}>{service.title}</Text>
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
                      <Link href={`/dashboard/services/edit/${service.id}`}>
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
                        onClick={() => deleteService(service.id)}
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

export default withAuth(ServicesSection)
