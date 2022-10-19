import {
  Button,
  Divider,
  Heading,
  HStack,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import {
  FaCalendar,
  FaChevronLeft,
  FaEnvelopeOpen,
  FaHistory,
  FaPhone,
  FaUser,
} from "react-icons/fa"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"

interface ViewRequestedAppointmentProps {
  state: IState
}

const ViewRequestedAppointment: React.FC<ViewRequestedAppointmentProps> = (
  props: ViewRequestedAppointmentProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue("gray.600", "gray.400")
  const router = useRouter()
  const token = props.state.user?.access as string
  const requestedAppointmentId = router.query.id as string

  interface RequestedAppointment {
    id: number
    subject: string
    name: string
    phone: string
    appointment_time: string
    message: string
    created_at: string
  }

  const [data, setData] = useState<RequestedAppointment | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/api/dashboard/requested-appointment/${requestedAppointmentId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: RequestedAppointment = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token, requestedAppointmentId])

  return (
    <VStack
      bgColor={bgColor}
      w="full"
      align="start"
      py={10}
      px={[5, 5, 8, 10, 10]}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>View Requested Appointments | Dashboard</title>
      </Head>

      <VStack w="full" align="start">
        <VStack pb={4}>
          <Button
            onClick={() => router.back()}
            size="sm"
            rounded={0}
            colorScheme="gray"
          >
            <FaChevronLeft fontSize={13} />
            <Text ps={1} fontSize={13}>
              Back
            </Text>
          </Button>
        </VStack>

        <VStack w="full" align="start" spacing={2} fontSize={14} pb={3}>
          <Heading size="lg" fontWeight="normal">
            {data?.subject}
          </Heading>
          <HStack fontSize={13}>
            <FaHistory color="gray" fontSize={13} />
            <Text color="gray.400" fontWeight="light">
              Created:{" "}
              {data && dayjs(data.created_at).format("DD/MM/YYYY - hh:mm a")}
            </Text>
          </HStack>
        </VStack>

        <Divider />

        <HStack
          fontSize={13}
          color={textColor}
          spacing={[0, 0, 8, 10, 10]}
          gap={3}
          py={3}
          flexDir={["column", "column", "row", "row", "row"]}
          align="start"
        >
          <HStack>
            <FaUser />
            <Text>Sandip Sadhukhan</Text>
          </HStack>
          <HStack>
            <FaPhone />
            <Text>+91 9282683927</Text>
          </HStack>
          <HStack>
            <FaEnvelopeOpen />
            <Text>sandip.sendme@gmail.com</Text>
          </HStack>
          <HStack>
            <FaCalendar />
            <Text>
              {data &&
                dayjs(data.appointment_time).format("DD/MM/YYYY - hh:mm a")}
            </Text>
          </HStack>
        </HStack>

        <Divider />
        {isLoading ? (
          <Spinner />
        ) : (
          <Text
            py={5}
            fontSize={14}
            lineHeight="tall"
            letterSpacing="wide"
            whiteSpace="pre-wrap"
          >
            {data?.message}
          </Text>
        )}
        <Divider />
      </VStack>
    </VStack>
  )
}

export default withAuth(ViewRequestedAppointment)
