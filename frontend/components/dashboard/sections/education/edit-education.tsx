import {
  Button,
  Checkbox,
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
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import Image from "../../../image"
import SaveButton from "../../../shared/save-button"

interface EditEducationSectionProps {
  state: IState
}

const EditEducationSection: React.FC<EditEducationSectionProps> = (
  props: EditEducationSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()
  const token = props.state.user?.access as string
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
  const toast = useToast()
  const educationId = router.query.id as string

  interface IFormData {
    school: string
    field: string
    image: string
    description: string
    date_from: string
    date_to: string
    currently_studying: boolean
  }

  const {
    watch,
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const watchCurrentlyStudying = watch("currently_studying", false)

  const [isLoading, setLoading] = useState<boolean>(true)
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/api/dashboard/education/${educationId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: IFormData = response.data
      setValue("school", data.school)
      setValue("field", data.field)
      setValue("description", data.description)
      setValue("date_from", data.date_from)
      setValue("date_to", data.date_to)
      setValue("currently_studying", data.currently_studying)
      setImage(data.image)
      setLoading(false)
    }

    fetchData()
  }, [token, setValue, educationId])

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("school", data.school)
    formData.append("field", data.field)
    formData.append("description", data.description)
    formData.append("date_from", data.date_from)
    formData.append("date_to", data.date_to)
    formData.append("currently_studying", data.currently_studying.toString())

    if (data.image !== null && data.image.length === 1) {
      formData.append("image", data.image[0])
    }

    try {
      const res = await axiosInstance.patch(
        `/api/dashboard/education/${educationId}`,
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
      router.push("/dashboard/educations")
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          type elementType =
            | "school"
            | "field"
            | "image"
            | "description"
            | "date_from"
            | "date_to"
            | "currently_studying"

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
        <title>Edit Education | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Edit Education
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
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              School
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.school !== undefined}>
              <Input
                size="sm"
                placeholder="School"
                {...register("school", {
                  required: "School name should not be empty.",
                })}
              />
              {errors.school && (
                <FormHelperText>{errors.school?.message}</FormHelperText>
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full" alignItems="center">
            <Text
              w="full"
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Field
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.field !== undefined}>
              <Input
                size="sm"
                placeholder="Field"
                {...register("field", {
                  required: "Field should not be empty.",
                })}
              />
              {errors.field && (
                <FormHelperText>{errors.field?.message}</FormHelperText>
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full" alignItems="center">
            <Text
              w="full"
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Image
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.image !== undefined}>
              <Input type="file" size="sm" {...register("image")} />
              {errors.image && (
                <FormHelperText>{errors.image?.message}</FormHelperText>
              )}
            </FormControl>
          </Flex>
          {image && (
            <Flex>
              <Image
                width={40}
                height={40}
                src={`${BASE_API_URL}${image}`}
                alt={`${getValues("school")} school`}
              />
            </Flex>
          )}
        </HStack>
        <Divider />

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
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Description
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.description !== undefined}>
              <Textarea
                size="sm"
                placeholder="Description"
                {...register("description")}
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full" alignItems="center">
            <Text
              w="full"
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Date From
            </Text>
          </Flex>
          <Flex
            flex={[1, 1, 8, 8, 10]}
            w="full"
            alignItems={["start", "start", "end", "end", "end"]}
            gap={[4, 4, 8, 8, 8]}
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Flex flex={2}>
              <FormControl isInvalid={errors.date_from !== undefined}>
                <Input
                  type="date"
                  size="sm"
                  {...register("date_from", {
                    required: "Date From Field should not be empty.",
                  })}
                />
                {errors.date_from && (
                  <FormHelperText>{errors.date_from?.message}</FormHelperText>
                )}
              </FormControl>
            </Flex>
            <Flex flex={3} gap={3} alignItems="center">
              <Text fontSize={14} minW={50}>
                Date To
              </Text>
              <FormControl isInvalid={errors.date_to !== undefined}>
                <Input
                  type="date"
                  size="sm"
                  placeholder="Plan Name"
                  {...register("date_to")}
                  disabled={watchCurrentlyStudying}
                />
                {errors.date_to && (
                  <FormHelperText>{errors.date_to?.message}</FormHelperText>
                )}
              </FormControl>
            </Flex>
          </Flex>
        </HStack>
        <HStack
          w="full"
          justifyContent={["start", "start", "end", "end", "end"]}
          pe={[0, 0, "30%", "30%", "30%"]}
        >
          <Controller
            control={control}
            name="currently_studying"
            defaultValue={false}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox
                p={0}
                size="sm"
                onChange={onChange}
                isChecked={value}
                ref={ref}
              >
                I currently study
              </Checkbox>
            )}
          />
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

export default withAuth(EditEducationSection)
