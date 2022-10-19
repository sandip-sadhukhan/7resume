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
import RequestedAppointmentsSkeleton from "./requested-appointments-skeleton"

interface RequestedAppointmentsSectionProps {
  state: IState
}

const RequestedAppointmentsSection: React.FC<
  RequestedAppointmentsSectionProps
> = (props: RequestedAppointmentsSectionProps) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const token = props.state.user?.access as string
  const toast = useToast()

  interface RequestedAppointment {
    id: number
    subject: string
    name: string
    appointment_time: string
    created_at: string
  }

  const [data, setData] = useState<RequestedAppointment[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        "/api/dashboard/requested-appointments/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: RequestedAppointment[] = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token])

  const deleteRequestedAppointment = async (id: number) => {
    if (data === null) return

    let newRequestedAppointments = [...data]
    newRequestedAppointments = newRequestedAppointments.filter(
      (requestedAppointment) => requestedAppointment.id !== id
    )
    setData(newRequestedAppointments)

    const response = await axiosInstance.delete(
      `/api/dashboard/requested-appointment/${id}/`,
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
            {isLoading &&
              [1, 2, 3].map((ele) => (
                <RequestedAppointmentsSkeleton key={ele} />
              ))}
            {data &&
              data.map((requestedAppointment) => (
                <Tr key={requestedAppointment.id}>
                  <Td>
                    <Text fontSize={13}>{requestedAppointment.subject}</Text>
                  </Td>

                  <Td>
                    <Text fontSize={13}>{requestedAppointment.name}</Text>
                  </Td>

                  <Td>
                    <Text fontSize={13}>
                      {dayjs(requestedAppointment.appointment_time).format(
                        "DD/MM/YYYY - hh:mm a"
                      )}
                    </Text>
                  </Td>

                  <Td>
                    <Text fontSize={13}>
                      {dayjs(requestedAppointment.created_at).format(
                        "DD/MM/YYYY - hh:mm a"
                      )}
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
                      <Link
                        href={`/dashboard/appointments/requested/view/${requestedAppointment.id}`}
                      >
                        <a>
                          <Button size="sm" rounded={0} colorScheme="orange">
                            <FaEye fontSize={13} />
                            <Text fontSize={13} ps={2}>
                              Details
                            </Text>
                          </Button>
                        </a>
                      </Link>
                      <Button
                        size="sm"
                        rounded={0}
                        colorScheme="red"
                        onClick={() =>
                          deleteRequestedAppointment(requestedAppointment.id)
                        }
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

export default withAuth(RequestedAppointmentsSection)
