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
import Image from "../../../image"
import SaveButton from "../../../shared/save-button"

interface EditProjectSectionProps {
  state: IState
}

const EditProjectSection: React.FC<EditProjectSectionProps> = (
  props: EditProjectSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()
  const token = props.state.user?.access as string
  const toast = useToast()
  const projectId = router.query.id as string
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

  interface ProjectCategory {
    id: number
    title: string
  }

  interface IFormData {
    display_project: boolean
    category_id: number | null
    title: string
    link: string
    published: string
    featured_image: string | null
    description: string
    meta_description: string
    facebook: string
    twitter: string
    pinterest: string
  }

  interface InitialData {
    project: IFormData
    categories: ProjectCategory[]
  }

  const [data, setData] = useState<ProjectCategory[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [image, setImage] = useState<string | null>(null)

  const {
    register,
    setError,
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  useEffect(() => {
    if (!projectId) return

    const fetchData = async () => {
      const res = await axiosInstance.get(
        `/api/dashboard/project/${projectId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const { categories: categoryData, project: projectData } =
        res.data as InitialData

      setData(categoryData)

      setValue("display_project", projectData.display_project)
      setValue("category_id", projectData.category_id)
      setValue("title", projectData.title)
      setValue("link", projectData.link)
      setValue("published", projectData.published)
      setValue("description", projectData.description)
      setValue("meta_description", projectData.meta_description)
      setValue("facebook", projectData.facebook)
      setValue("twitter", projectData.twitter)
      setValue("pinterest", projectData.pinterest)
      setImage(projectData.featured_image)

      setLoading(false)
    }

    fetchData()
  }, [projectId, token, setValue])

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("display_project", data.display_project.toString())

    if (!data.category_id) {
      data.category_id = null
    }

    if (data.category_id) {
      formData.append("category_id", data.category_id.toString())
    }

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
      const res = await axiosInstance.patch(
        `/api/dashboard/project/${projectId}/`,
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
        <title>Edit Project | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Edit Project
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
              Display Project
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} pt={3} w="full" alignItems="end">
            <Controller
              control={control}
              name="display_project"
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
              {...register("category_id")}
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
            <FormControl isInvalid={errors.link !== undefined}>
              <Input size="sm" placeholder="Link" {...register("link")} />
              {errors.link && (
                <FormHelperText>{errors.link?.message}</FormHelperText>
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
              Published
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.published !== undefined}>
              <Input
                size="sm"
                type="date"
                {...register("published", {
                  required: "Publish Date should not be empty.",
                })}
              />
              {errors.published && (
                <FormHelperText>{errors.published?.message}</FormHelperText>
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
              Featured Image
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.featured_image !== undefined}>
              <Input size="sm" type="file" {...register("featured_image")} />
              {errors.featured_image && (
                <FormHelperText>
                  {errors.featured_image?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Flex>
          <Flex>
            {image && (
              <Flex>
                <Image
                  width={40}
                  height={40}
                  src={`${BASE_API_URL}${image}`}
                  alt="Feature Image"
                />
              </Flex>
            )}
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
              Facebook
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.facebook !== undefined}>
              <Input
                size="sm"
                placeholder="Facebook"
                {...register("facebook")}
              />
              {errors.facebook && (
                <FormHelperText>{errors.facebook?.message}</FormHelperText>
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
              Title
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.twitter !== undefined}>
              <Input size="sm" placeholder="Twitter" {...register("twitter")} />
              {errors.twitter && (
                <FormHelperText>{errors.twitter?.message}</FormHelperText>
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
              Pinterest
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.pinterest !== undefined}>
              <Input
                size="sm"
                placeholder="Pinterest"
                {...register("pinterest")}
              />
              {errors.pinterest && (
                <FormHelperText>{errors.pinterest?.message}</FormHelperText>
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

export default withAuth(EditProjectSection)
