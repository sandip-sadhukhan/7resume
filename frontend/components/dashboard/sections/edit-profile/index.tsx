import {
  Divider,
  Flex,
  FormErrorMessage,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import { AxiosError } from "axios"
import SaveButton from "../../../shared/save-button"

interface EditProfileSectionProps {
  state: IState
}

const EditProfileSection: React.FC<EditProfileSectionProps> = (
  props: EditProfileSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")

  const toast = useToast()
  const token = props.state.user?.access as string

  interface IFormData {
    name: string
    username: string
    email: string
    password: string
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>()

  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/api/dashboard/edit-profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: IFormData = response.data
      // console.log(data)
      setValue("name", data.name)
      setValue("username", data.username)
      setValue("email", data.email)
      setLoading(false)
    }

    fetchData()
  }, [token, setValue])

  const onSubmit: SubmitHandler<IFormData> = async (formData: IFormData) => {
    try {
      await axiosInstance.post(
        `/api/dashboard/edit-profile/`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // console.log(response.data)
      toast({
        status: "success",
        title: "User Information Saved!",
      })
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        const data = err.response.data as { error: string }
        toast({
          status: "error",
          title: data.error,
        })
      } else {
        toast({
          status: "error",
          title: err.response?.statusText,
        })
      }
      // console.log({ response: err.response })
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
        <title>Administrator Profile | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Administrator Profile
      </Heading>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w="full"
        align="start"
        py={4}
        spacing={4}
      >
        <HStack
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDirection={["column", "column", "row", "row", "row"]}
          gap={2}
          align="start"
        >
          <HStack
            spacing={1}
            w={["full", "full", 70, 100, 180]}
            justifyContent={["start", "start", "end", "end", "end"]}
          >
            <Text fontSize={14} color="gray">
              Name
            </Text>
            <Text color="red">*</Text>
          </HStack>
          <Flex w="full" flex={1}>
            <FormControl isInvalid={errors.name !== undefined}>
              <Input
                size="sm"
                w="full"
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name should contain minimum 3 letters.",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </HStack>

        <Divider />

        <HStack
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDirection={["column", "column", "row", "row", "row"]}
          gap={2}
          align="start"
        >
          <HStack
            spacing={1}
            w={["full", "full", 70, 100, 180]}
            justifyContent={["start", "start", "end", "end", "end"]}
          >
            <Text fontSize={14} color="gray">
              Username
            </Text>
            <Text color="red">*</Text>
          </HStack>
          <Flex flex={1} w="full">
            <FormControl isInvalid={errors.username !== undefined}>
              <Input
                size="sm"
                w="full"
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username should contain minimum 3 letters.",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </HStack>

        <Divider />

        <HStack
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDirection={["column", "column", "row", "row", "row"]}
          gap={2}
          align="start"
        >
          <HStack
            spacing={1}
            w={["full", "full", 70, 100, 180]}
            justifyContent={["start", "start", "end", "end", "end"]}
          >
            <Text fontSize={14} color="gray">
              Email
            </Text>
            <Text color="red">*</Text>
          </HStack>
          <Flex flex={1} w="full">
            <FormControl isInvalid={errors.email !== undefined}>
              <Input
                size="sm"
                w="full"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 6,
                    message: "Email should contain minimum 6 letters.",
                  },
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email is invalid",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </HStack>

        <Divider />

        <HStack
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDirection={["column", "column", "row", "row", "row"]}
          gap={2}
          align="start"
        >
          <HStack
            spacing={1}
            w={["full", "full", 70, 100, 180]}
            justifyContent={["start", "start", "end", "end", "end"]}
          >
            <Text fontSize={14} color="gray">
              Password
            </Text>
            <Text color="red">*</Text>
          </HStack>
          <Flex flex={1} w="full">
            <FormControl isInvalid={errors.password !== undefined}>
              <Input
                size="sm"
                w="full"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password should contain minimum 6 letters.",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </HStack>

        <Divider />

        <HStack
          w={["full", "full", 152, 182, 262]}
          justifyContent={["start", "start", "end", "end", "end"]}
        >
          <SaveButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </HStack>
      </VStack>
    </VStack>
  )
}

export default withAuth(EditProfileSection)
