import {
  Button,
  Divider,
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
import { FaChevronLeft } from "react-icons/fa"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"

interface ViewMessageSectionProps {
  state: IState
}

const ViewMessageSection: React.FC<ViewMessageSectionProps> = (
  props: ViewMessageSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()
  const mailTextColor = useColorModeValue("gray", "gray.400")
  const token = props.state.user?.access as string
  const messageId = router.query.id as string

  interface Message {
    id: number
    name: string
    email: string
    message: string
    created_at: string
  }

  const [data, setData] = useState<Message | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!messageId) return

    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/api/dashboard/message/${messageId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: Message = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token, messageId])

  return (
    <VStack
      bgColor={bgColor}
      w="full"
      align="start"
      py={10}
      px={10}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>View Message | Dashboard</title>
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
        <VStack w="full" align="start" spacing={0} fontSize={14} pb={3}>
          <HStack fontSize={14}>
            <Text fontWeight="semibold">{data?.name}</Text>
            <Text color={mailTextColor} fontSize={13}>
              ({data?.email}) to
            </Text>
            <Text fontWeight="semibold">me</Text>
          </HStack>
          <Text color="gray.400" fontWeight="light">
            {data && dayjs(data.created_at).format("DD MMM, YYYY, HH:mm")}
          </Text>
        </VStack>
        <Divider />
        {!isLoading ? (
          <Text
            textAlign="justify"
            py={3}
            fontSize={14}
            lineHeight="tall"
            letterSpacing="wide"
            whiteSpace="pre"
          >
            {data?.message}
          </Text>
        ) : (
          <Spinner />
        )}
        <Divider />
      </VStack>
    </VStack>
  )
}

export default withAuth(ViewMessageSection)
