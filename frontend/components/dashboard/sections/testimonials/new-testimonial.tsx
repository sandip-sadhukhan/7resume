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

interface NewTestimonialSectionProps {
  state: IState
}

const NewTestimonialSection: React.FC<NewTestimonialSectionProps> = (
  props: NewTestimonialSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()
  const token = props.state.user?.access as string
  const toast = useToast()

  interface IFormData {
    name: string
    image: string
    position: string
    rating: string
    message: string
  }

  const {
    register,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("name", data.name)
    formData.append("position", data.position)
    formData.append("rating", data.rating)
    formData.append("message", data.message)

    if (data.image !== null && data.image.length === 1) {
      formData.append("image", data.image[0])
    }

    try {
      const res = await axiosInstance.post(
        "/api/dashboard/testimonials/",
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
      router.push("/dashboard/testimonials")
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          type elementType =
            | "name"
            | "image"
            | "position"
            | "rating"
            | "message"

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
        <title>New Testimonial | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        New Testimonial
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
              <Input
                size="sm"
                type="file"
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
              Rating
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Select
              size="sm"
              {...register("rating", {
                required: "Rating should not be empty",
              })}
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5} selected>
                5 Stars
              </option>
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full">
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Message
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <FormControl isInvalid={errors.message !== undefined}>
              <Textarea
                placeholder="Message"
                size="sm"
                {...register("message", {
                  required: "Message should not be empty.",
                })}
              />
              {errors.message && (
                <FormHelperText>{errors.message?.message}</FormHelperText>
              )}
            </FormControl>
          </Flex>
        </HStack>
        <Divider />

        <HStack
          w={["full", "full", 260, 320, 330]}
          justifyContent={["start", "start", "end", "end", "end"]}
        >
          <SaveButton isLoading={false} isSubmitting={isSubmitting} />
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

export default withAuth(NewTestimonialSection)
