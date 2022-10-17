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

interface EditClientSectionProps {
  state: IState
}

const EditClientSection: React.FC<EditClientSectionProps> = (
  props: EditClientSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()
  const token = props.state.user?.access as string
  const toast = useToast()
  const clientId = router.query.id as string
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

  interface IFormData {
    name: string
    image: string
  }

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const [isLoading, setLoading] = useState<boolean>(true)
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    if (!clientId) return

    const fetchData = async () => {
      const res = await axiosInstance.get(
        `/api/dashboard/client/${clientId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = res.data as IFormData

      setValue("name", data.name)
      setImage(data.image)

      setLoading(false)
    }

    fetchData()
  }, [clientId, token, setValue])

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("name", data.name)

    if (data.image !== null && data.image.length === 1) {
      formData.append("image", data.image[0])
    }

    try {
      const res = await axiosInstance.patch(
        `/api/dashboard/client/${clientId}/`,
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
      router.push("/dashboard/clients")
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          type elementType = "name" | "image"

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
        <title>Edit Client | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Edit Client
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
              Name
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.name !== undefined}>
              <Input
                size="sm"
                placeholder="Name"
                {...register("name", {
                  required: "Name should not be empty.",
                })}
              />
              {errors.name && (
                <FormHelperText>{errors.name?.message}</FormHelperText>
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
              Image
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.image !== undefined}>
              <Input size="sm" type="file" {...register("image")} />
              {errors.image && (
                <FormHelperText>{errors.image?.message}</FormHelperText>
              )}
            </FormControl>
          </Flex>
          <Flex>
            {image && (
              <Image
                src={`${BASE_API_URL}${image}`}
                alt="character's image"
                height={40}
                width={40}
              />
            )}
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

export default withAuth(EditClientSection)
