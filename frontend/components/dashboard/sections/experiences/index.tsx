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
import ExperienceSkeleton from "./experience-skeleton"

interface ExperienceSectionProps {
  state: IState
}

const ExperienceSection: React.FC<ExperienceSectionProps> = (
  props: ExperienceSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const token = props.state.user?.access as string
  const toast = useToast()

  interface Experience {
    id: number
    image: string
    company: string
    position: string
    date_from: string
    date_to: string | null
    currently_working: boolean
  }

  const [data, setData] = useState<Experience[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/api/dashboard/experiences/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: Experience[] = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token])

  const deleteExperience = async (id: number) => {
    if (data === null) return

    let newExperience = [...data]
    newExperience = newExperience.filter((experience) => experience.id !== id)
    setData(newExperience)

    const response = await axiosInstance.delete(
      `/api/dashboard/experience/${id}`,
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
        <title>Experiences | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Experiences
        </Heading>
        <Link href="/dashboard/experiences/new">
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
              <Th>Company</Th>
              <Th>Position</Th>
              <Th>Duration</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading &&
              [1, 2, 3].map((ele) => <ExperienceSkeleton key={ele} />)}
            {data &&
              data.map((experience) => (
                <Tr key={experience.id}>
                  <Td>
                    <HStack
                      w="full"
                      align="start"
                      alignItems="center"
                      flexDir={["column", "row", "row", "row", "row"]}
                      gap={2}
                      spacing={[0, 2, 2, 2, 2]}
                    >
                      <Text fontSize={13}>{experience.company}</Text>
                    </HStack>
                  </Td>

                  <Td>
                    <Text fontSize={13}>{experience.position}</Text>
                  </Td>

                  <Td>
                    <Text fontSize={13}>
                      {experience.date_from} -{" "}
                      {experience.currently_working
                        ? "Current"
                        : experience.date_to}
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
                        href={`/dashboard/experiences/edit/${experience.id}`}
                      >
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
                        onClick={() => deleteExperience(experience.id)}
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

export default withAuth(ExperienceSection)
