import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
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
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import SaveButton from "../../../shared/save-button"

interface NewBlogSectionProps {
  state: IState
}

const NewBlogSection: React.FC<NewBlogSectionProps> = (
  props: NewBlogSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()
  const token = props.state.user?.access as string
  const toast = useToast()

  interface BlogCategory {
    id: number
    title: string
  }

  const [data, setData] = useState<BlogCategory[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        "/api/dashboard/blog-categories/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: BlogCategory[] = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token])

  interface IFormData {
    display_article: boolean
    author: string
    title: string
    category_id: string
    short_description: string
    description: string
    featured_image: string
    tags: string
    meta_description: string
  }

  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("display_article", data.display_article.toString())
    formData.append("category_id", data.category_id)
    formData.append("author", data.author)
    formData.append("title", data.title)
    formData.append("short_description", data.short_description)
    formData.append("description", data.description)
    formData.append("tags", data.tags)
    formData.append("meta_description", data.meta_description)

    if (data.featured_image !== null && data.featured_image.length === 1) {
      formData.append("featured_image", data.featured_image[0])
    }

    try {
      const res = await axiosInstance.post("/api/dashboard/blogs/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: { message: string } = res.data

      toast({
        title: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      router.push("/dashboard/blog")
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          type elementType =
            | "display_article"
            | "category_id"
            | "title"
            | "author"
            | "description"
            | "short_description"
            | "tags"
            | "meta_description"
            | "featured_image"

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
        <title>New Blog | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        New Blog
      </Heading>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="full"
        align="start"
        spacing={4}
        pt={2}
        alignItems="baseline"
      >
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
              Display Article
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} pt={3} w="full" alignItems="end">
            <Controller
              control={control}
              name="display_article"
              defaultValue={false}
              render={({ field: { onChange, value, ref } }) => (
                <Switch
                  size="sm"
                  ring={0}
                  _hover={{ ring: 0 }}
                  onChange={onChange}
                  isChecked={value}
                  ref={ref}
                />
              )}
            />
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
              Author
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.author !== undefined}>
              <Input
                size="sm"
                placeholder="Author"
                {...register("author", {
                  required: "Author should not be empty.",
                })}
              />
              {errors.author && (
                <FormHelperText>{errors.author?.message}</FormHelperText>
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
              Category
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Select
              placeholder="Select..."
              size="sm"
              {...register("category_id", {
                required: "Category should not be empty",
              })}
            >
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
            <FormControl isInvalid={errors.title !== undefined}>
              <Input
                size="sm"
                placeholder="Title"
                {...register("title", {
                  required: "Title should not be empty.",
                })}
              />
              {errors.title && (
                <FormHelperText>{errors.title?.message}</FormHelperText>
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full">
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Short Description
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <FormControl isInvalid={errors.short_description !== undefined}>
              <Textarea
                placeholder="Short Description"
                size="sm"
                {...register("short_description", {
                  required: "Short description should not be empty.",
                })}
              />
              {errors.short_description && (
                <FormHelperText>
                  {errors.short_description?.message}
                </FormHelperText>
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
            <FormControl isInvalid={errors.description !== undefined}>
              <Textarea
                minH={400}
                placeholder="Write Markdown* here..."
                size="sm"
                {...register("description", {
                  required: "Description should not be empty.",
                })}
              />
              {errors.description && (
                <FormHelperText>{errors.description?.message}</FormHelperText>
              )}
            </FormControl>
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
            <FormControl isInvalid={errors.featured_image !== undefined}>
              <Input
                size="sm"
                type="file"
                {...register("featured_image", {
                  required: "Feature Image should not be empty.",
                })}
              />
              {errors.featured_image && (
                <FormHelperText>
                  {errors.featured_image?.message}
                </FormHelperText>
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full">
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Tags
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <FormControl isInvalid={errors.tags !== undefined}>
              <Input
                size="sm"
                placeholder="Ex- digital-marketing,seo,content-writing"
                {...register("tags")}
              />
              {errors.title && (
                <FormHelperText>{errors.title?.message}</FormHelperText>
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
            <FormControl isInvalid={errors.meta_description !== undefined}>
              <Textarea
                placeholder="Meta Description"
                size="sm"
                {...register("meta_description")}
              />
              {errors.meta_description && (
                <FormHelperText>
                  {errors.meta_description?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Flex>
        </HStack>
        <Divider />

        <HStack
          w={["full", "full", 260, 320, 330]}
          justifyContent={["start", "start", "end", "end", "end"]}
        >
          <SaveButton isLoading={isLoading} isSubmitting={isSubmitting} />
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

export default withAuth(NewBlogSection)
