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
import EducationSkeleton from "./education-skeleton"

interface EducationSectionProps {
  state: IState
}

const EducationSection: React.FC<EducationSectionProps> = (
  props: EducationSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const token = props.state.user?.access as string
  const toast = useToast()
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

  interface Education {
    id: number
    image: string
    school: string
    field: string
    date_from: string
    date_to: string | null
    currently_studying: boolean
  }

  const [data, setData] = useState<Education[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/api/dashboard/educations/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: Education[] = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token])

  const deleteEducation = async (id: number) => {
    if (data === null) return

    let newEducation = [...data]
    newEducation = newEducation.filter((education) => education.id !== id)
    setData(newEducation)

    const response = await axiosInstance.delete(
      `/api/dashboard/education/${id}`,
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
        <title>Education | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Education
        </Heading>
        <Link href="/dashboard/educations/new">
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
              <Th>School</Th>
              <Th>Field</Th>
              <Th>Duration</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading &&
              [1, 2, 3].map((ele) => <EducationSkeleton key={ele} />)}
            {data &&
              data.map((education) => (
                <Tr key={education.id}>
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
                        src={`${BASE_API_URL}${education.image}`}
                        alt="service image"
                      />
                      <Text fontSize={13}>{education.school}</Text>
                    </HStack>
                  </Td>

                  <Td>
                    <Text fontSize={13}>{education.field}</Text>
                  </Td>

                  <Td>
                    <Text fontSize={13}>
                      {education.date_from} -{" "}
                      {education.currently_studying
                        ? "Present"
                        : education.date_to}
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
                      <Link href={`/dashboard/educations/edit/${education.id}`}>
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
                        onClick={() => deleteEducation(education.id)}
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

export default withAuth(EducationSection)
