import React, { useState, useEffect } from "react"
import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
  useToast,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useForm, SubmitHandler } from "react-hook-form"
import { AxiosError } from "axios"
import { IState } from "../../../../../types/auth"
import axiosInstance from "../../../../../utils/axiosInstance"
import { withAuth } from "../../../../../auth/context"
import SaveButton from "../../../../shared/save-button"

interface EditProjectCategorySectionProps {
  state: IState
}

const EditProjectCategorySection: React.FC<EditProjectCategorySectionProps> = (
  props: EditProjectCategorySectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const token = props.state.user?.access as string
  const toast = useToast()
  const router = useRouter()
  const projectCategoryId = router.query.id as string

  interface IFormData {
    title: string
  }

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/api/dashboard/project-category/${projectCategoryId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: IFormData = response.data
      setValue("title", data.title)
      setLoading(false)
    }

    fetchData()
  }, [token, setValue, projectCategoryId])

  const onSubmit: SubmitHandler<IFormData> = async (formData: IFormData) => {
    try {
      const res = await axiosInstance.patch(
        `/api/dashboard/project-category/${projectCategoryId}/`,
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
      router.push("/dashboard/projects/categories")
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          setError("title", { message: data[ele].join(",") })
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
        <title>Edit Project Category | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Edit Project Category
      </Heading>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="full"
        align="start"
        spacing={4}
        pt={4}
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

export default withAuth(EditProjectCategorySection)
