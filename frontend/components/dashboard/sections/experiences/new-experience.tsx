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
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import SaveButton from "../../../shared/save-button"

interface NewExperienceSectionProps {
  state: IState
}

const NewExperienceSection: React.FC<NewExperienceSectionProps> = (
  props: NewExperienceSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()
  const token = props.state.user?.access as string
  const toast = useToast()

  interface IFormData {
    company: string
    position: string
    image: string
    description: string
    date_from: string
    date_to: string | null
    currently_working: boolean
  }

  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const watchCurrentlyWorking = watch("currently_working", false)

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("company", data.company)
    formData.append("position", data.position)
    formData.append("description", data.description)
    formData.append("date_from", data.date_from)
    formData.append("currently_working", data.currently_working.toString())

    if (data.date_to !== null) {
      formData.append("date_to", data.date_to)
    }

    if (data.image !== null && data.image.length === 1) {
      formData.append("image", data.image[0])
    }

    try {
      const res = await axiosInstance.post(
        "/api/dashboard/experiences/",
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
      router.push("/dashboard/experiences")
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          type elementType =
            | "company"
            | "position"
            | "image"
            | "description"
            | "date_from"
            | "date_to"
            | "currently_working"

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
        <title>New Experience | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        New Experience
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
              Company
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full" alignItems="center" gap={1}>
            <Text
              w="full"
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Image
            </Text>
            <Text color="red">*</Text>
          </Flex>
          <Flex ps={4} flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.image !== undefined}>
              <Input
                type="file"
                size="sm"
                {...register("image", {
                  required: "Image should not be empty.",
                })}
              />
              {errors.image && (
                <FormHelperText>{errors.image?.message}</FormHelperText>
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
              Position
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.position !== undefined}>
              <Input
                size="sm"
                placeholder="Position"
                {...register("position", {
                  required: "Position should not be empty.",
                })}
              />
              {errors.position && (
                <FormHelperText>{errors.position?.message}</FormHelperText>
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
                  disabled={watchCurrentlyWorking}
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
          <Checkbox p={0} size="sm" {...register("currently_working")}>
            I currently work
          </Checkbox>
        </HStack>
        <Divider />

        <HStack
          w={["full", "full", 260, 320, 330]}
          justifyContent={["start", "start", "end", "end", "end"]}
        >
          <SaveButton isSubmitting={isSubmitting} isLoading={false} />
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

export default withAuth(NewExperienceSection)
