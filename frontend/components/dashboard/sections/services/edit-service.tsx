import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  HStack,
  Input,
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
import Image from "../../../image"
import SaveButton from "../../../shared/save-button"

interface EditServiceProps {
  state: IState
}

const EditService: React.FC<EditServiceProps> = (props: EditServiceProps) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const token = props.state.user?.access as string
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
  const toast = useToast()
  const router = useRouter()
  const serviceId = router.query.id as string

  interface IFormData {
    title: string
    description: string
    image: string
  }

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const [isLoading, setLoading] = useState<boolean>(true)
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/api/dashboard/service/${serviceId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: IFormData = response.data
      setValue("title", data.title)
      setValue("description", data.description)
      setImage(data.image)
      setLoading(false)
    }

    fetchData()
  }, [token, setValue, serviceId])

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("title", data.title)
    formData.append("description", data.description)

    if (data.image !== null && data.image.length === 1) {
      formData.append("image", data.image[0])
    }

    try {
      const res = await axiosInstance.patch(
        `/api/dashboard/service/${serviceId}`,
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
      router.push("/dashboard/services")
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          type elementType = "title" | "description" | "image"
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
        <title>Edit Service | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Edit Service
      </Heading>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack
        w="full"
        align="start"
        spacing={4}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
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
              Title
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <FormControl isInvalid={errors.title !== undefined}>
              <Input
                w="full"
                size="sm"
                placeholder="Title"
                {...register("title", {
                  required: "Title should not be empty",
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
              Description
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <FormControl isInvalid={errors.description !== undefined}>
              <Textarea
                placeholder="Description"
                size="sm"
                {...register("description", {
                  required: "Description should not empty",
                })}
              />
              {errors.description && (
                <FormHelperText>{errors.description?.message}</FormHelperText>
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
              Image
            </Text>
          </Flex>
          <Flex flex={[1, 1, 5, 6, 8]} w="full">
            <FormControl isInvalid={errors.image !== undefined}>
              <Input
                w="full"
                type="file"
                size="sm"
                placeholder="Title"
                {...register("image")}
              />
              {errors.image && (
                <FormHelperText>{errors.image?.message}</FormHelperText>
              )}
            </FormControl>
          </Flex>
          <Flex flex={[1, 1, 1, 2, 2]} w="full">
            {image && (
              <Image
                width={40}
                height={40}
                src={`${BASE_API_URL}${image}`}
                alt={`${getValues("title")} service`}
              />
            )}
          </Flex>
        </HStack>
        <Divider />
        <HStack
          w={["full", "full", 260, 320, 330]}
          justifyContent={["start", "start", "end", "end", "end"]}
        >
          <SaveButton isSubmitting={isSubmitting} isLoading={isLoading} />
          <Button
            size="sm"
            rounded={0}
            colorScheme="red"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default withAuth(EditService)
