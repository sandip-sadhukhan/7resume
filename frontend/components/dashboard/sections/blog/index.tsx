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
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import Head from "next/head"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { FaPencilAlt, FaPlusSquare, FaTrash } from "react-icons/fa"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import BlogSkeleton from "./blog-skeleton"

interface BlogSectionProps {
  state: IState
}

const BlogSection: React.FC<BlogSectionProps> = (props: BlogSectionProps) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const token = props.state.user?.access as string
  const toast = useToast()

  interface Blog {
    id: number
    title: string
    views: number
    created_at: string
  }

  const [data, setData] = useState<Blog[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/api/dashboard/blogs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: Blog[] = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token])

  const deleteBlog = async (id: number) => {
    if (data === null) return

    let newBlog = [...data]
    newBlog = newBlog.filter((blog) => blog.id !== id)
    setData(newBlog)

    const response = await axiosInstance.delete(`/api/dashboard/blog/${id}`, {
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
        <title>Blog | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Blog
        </Heading>
        <Link href="/dashboard/blog/new">
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
              <Th>Title</Th>
              <Th>Visits</Th>
              <Th>Created</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && [1, 2, 3].map((ele) => <BlogSkeleton key={ele} />)}
            {data &&
              data.map((blog) => (
                <Tr key={blog.id}>
                  <Td>
                    <HStack
                      w="full"
                      align="start"
                      alignItems="center"
                      flexDir={["column", "row", "row", "row", "row"]}
                      gap={2}
                      spacing={[0, 2, 2, 2, 2]}
                    >
                      <Text fontSize={13}>{blog.title}</Text>
                    </HStack>
                  </Td>

                  <Td>
                    <Text fontSize={13}>{blog.views}</Text>
                  </Td>

                  <Td>
                    <Text fontSize={13}>
                      {dayjs(blog.created_at).format("DD/MM/YYYY hh:mm a")}
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
                      <Link href={`/dashboard/blog/edit/${blog.id}`}>
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
                        onClick={() => deleteBlog(blog.id)}
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

export default withAuth(BlogSection)
