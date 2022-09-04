import {
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Select,
  Switch,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { AxiosError } from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import SaveButton from "../../../shared/save-button"

interface NewProjectSectionProps {
  state: IState
}

const NewProjectSection: React.FC<NewProjectSectionProps> = (
  props: NewProjectSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()
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

  interface IFormData {
    display_project: boolean
    category_id: string
    title: string
    link: string
    published: string
    featured_image: string
    description: string
    meta_description: string
    facebook: string
    twitter: string
    pinterest: string
  }

  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("display_project", data.display_project.toString())
    formData.append("category_id", data.category_id)
    formData.append("title", data.title)
    formData.append("link", data.link)
    formData.append("published", data.published)
    formData.append("description", data.description)
    formData.append("meta_description", data.meta_description)
    formData.append("facebook", data.facebook)
    formData.append("twitter", data.twitter)
    formData.append("pinterest", data.pinterest)

    if (data.featured_image !== null && data.featured_image.length === 1) {
      formData.append("featured_image", data.featured_image[0])
    }

    try {
      const res = await axiosInstance.post(
        "/api/dashboard/projects/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: { message: string } = res.data

      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      router.push("/dashboard/projects")
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          type elementType =
            | "display_project"
            | "category_id"
            | "title"
            | "link"
            | "published"
            | "featured_image"
            | "description"
            | "meta_description"
            | "facebook"
            | "twitter"
            | "pinterest"

          const element = ele as elementType
          setError(element, { message: data[ele].join(",") })
        })
      } else {
        toast({
          status: "error",
          title: err.response?.statusText,
        })
      }
    }
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
        <title>New Project | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        New Project
      </Heading>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack w="full" align="start" spacing={4} pt={2} alignItems="baseline">
        <HStack
          align="start"
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDir={["column", "column", "row", "row", "row"]}
          gap={4}
        >
          <Flex flex={[1, 1, 1, 2, 2]} w="full" alignItems="center">
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Display Project
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} pt={3} w="full" alignItems="end">
            <Switch checked={true} />
          </Flex>
        </HStack>
        <Divider />

        <HStack
          align="start"
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDir={["column", "column", "row", "row", "row"]}
          gap={4}
        >
          <Flex
            flex={[1, 1, 1, 2, 2]}
            w="full"
            alignItems="center"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Category
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Select placeholder="Select..." size="sm">
              {data &&
                data.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
            </Select>
          </Flex>
        </HStack>
        <Divider />

        <HStack
          align="start"
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDir={["column", "column", "row", "row", "row"]}
          gap={4}
        >
          <Flex
            flex={[1, 1, 1, 2, 2]}
            w="full"
            alignItems="center"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Title
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.company !== undefined}>
              <Input
                size="sm"
                placeholder="Company"
                {...register("company", {
                  required: "Company name should not be empty.",
                })}
              />
              {errors.company && (
                <FormHelperText>{errors.company?.message}</FormHelperText>
              )}
            </FormControl>
          </Flex>
        </HStack>
        <Divider />

        <HStack
          align="start"
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDir={["column", "column", "row", "row", "row"]}
          gap={4}
        >
          <Flex
            flex={[1, 1, 1, 2, 2]}
            w="full"
            alignItems="center"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Link
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Input w="full" size="sm" placeholder="Link" type="url" />
          </Flex>
        </HStack>
        <Divider />

        <HStack
          align="start"
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDir={["column", "column", "row", "row", "row"]}
          gap={4}
        >
          <Flex
            flex={[1, 1, 1, 2, 2]}
            w="full"
            alignItems="center"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Published
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Input w="full" size="sm" placeholder="Published" type="date" />
          </Flex>
        </HStack>
        <Divider />

        <HStack
          align="start"
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDir={["column", "column", "row", "row", "row"]}
          gap={4}
        >
          <Flex
            flex={[1, 1, 1, 2, 2]}
            w="full"
            alignItems="center"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Featured Image
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Input w="full" size="sm" placeholder="image" type="file" />
          </Flex>
        </HStack>
        <Divider />

        <HStack
          align="start"
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDir={["column", "column", "row", "row", "row"]}
          gap={4}
        >
          <Flex flex={[1, 1, 1, 2, 2]} w="full">
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Description
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" flexDir="column" gap={2}>
            <Textarea
              minH={400}
              placeholder="Write Markdown* here..."
              size="sm"
            />
            <Text color="gray" fontSize={13}>
              *Learn about markdown from here -{" "}
              <a
                href="https://www.markdownguide.org/cheat-sheet/"
                target="_blank"
                rel="noreferrer"
                style={{ color: "blueviolet" }}
              >
                Markdown CheetSheet
              </a>
            </Text>
          </Flex>
        </HStack>
        <Divider />

        <HStack
          align="start"
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDir={["column", "column", "row", "row", "row"]}
          gap={4}
        >
          <Flex flex={[1, 1, 1, 2, 2]} w="full">
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Meta Description
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <Textarea placeholder="Meta Description" size="sm" />
          </Flex>
        </HStack>
        <Divider />

        <HStack
          w={["full", "full", 260, 320, 330]}
          justifyContent={["start", "start", "end", "end", "end"]}
        >
          <SaveButton isSubmitting={isSubmitting} isLoading={isLoading} />
          <Button
            onClick={() => router.back()}
            size="sm"
            rounded={0}
            colorScheme="red"
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default withAuth(NewProjectSection)
