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
import { withAuth } from "../../../../../auth/context"
import { IState } from "../../../../../types/auth"
import axiosInstance from "../../../../../utils/axiosInstance"
import ProjectCategorySkeleton from "./project-category-skeleton"

interface ProjectCategorySectionProps {
  state: IState
}

const ProjectCategorySection: React.FC<ProjectCategorySectionProps> = (
  props: ProjectCategorySectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const token = props.state.user?.access as string
  const toast = useToast()

  interface ProjectCategory {
    id: number
    title: string
  }

  const [data, setData] = useState<ProjectCategory[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        "/api/dashboard/project-categories/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: ProjectCategory[] = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token])

  const deleteProjectCategory = async (id: number) => {
    if (data === null) return

    let newProjectCategory = [...data]
    newProjectCategory = newProjectCategory.filter(
      (project) => project.id !== id
    )
    setData(newProjectCategory)

    const response = await axiosInstance.delete(
      `/api/dashboard/project-category/${id}/`,
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
        <title>Project Categories | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Project Categories
        </Heading>
        <Link href="/dashboard/projects/categories/new">
          <a>
            <Button size="xs" colorScheme="green" rounded={0}>
              <FaPlusSquare fontSize={13} />
              <Text fontSize={12} ps={1}>
                Add
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
              <Th>Title</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading &&
              [1, 2, 3].map((ele) => <ProjectCategorySkeleton key={ele} />)}
            {data &&
              data.map((projectCategory) => (
                <Tr key={projectCategory.id}>
                  <Td>
                    <HStack
                      w="full"
                      align="start"
                      alignItems="center"
                      flexDir={["column", "row", "row", "row", "row"]}
                      gap={2}
                      spacing={[0, 2, 2, 2, 2]}
                    >
                      <Text fontSize={13}>{projectCategory.title}</Text>
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
                      <Link
                        href={`/dashboard/projects/categories/edit/${projectCategory.id}`}
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
                        onClick={() =>
                          deleteProjectCategory(projectCategory.id)
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

export default withAuth(ProjectCategorySection)
