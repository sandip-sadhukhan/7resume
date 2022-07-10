import React, { useEffect, useState } from "react"
import {
  HStack,
  Text,
  Divider,
  Flex,
  Input,
  Textarea,
  Button,
  VStack,
  FormControl,
  FormHelperText,
  useToast,
} from "@chakra-ui/react"
import { FaDownload } from "react-icons/fa"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from "../../../image"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import SaveButton from "../../../shared/save-button"

interface IFormData {
  name: string
  profile_picture: string
  nationality: string
  about_me: string
  my_positions: string
  video_description: string
  resume: string | null
}

interface AboutMeContentProps {
  state: IState
}

// TODO: When "name" and "profile picture" is changed show the updated image
// and value to the sidebar (may be reloading the page will handle but find
// usefull alternate solutions)
const AboutMeContent: React.FC<AboutMeContentProps> = (
  props: AboutMeContentProps
) => {
  const token = props.state.user?.access as string
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL
  const toast = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [resume, setResume] = useState<string | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        "/api/dashboard/about-me-settings/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: IFormData = response.data
      setValue("name", data.name)
      setProfilePicture(data.profile_picture)
      setValue("nationality", data.nationality)
      setValue("about_me", data.about_me)
      setValue("my_positions", data.my_positions)
      setValue("video_description", data.video_description)
      setResume(data.resume)
      setLoading(false)
    }

    fetchData()
  }, [token, setValue])

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("name", data.name)

    formData.append("nationality", data.nationality)
    formData.append("about_me", data.about_me)
    formData.append("my_positions", data.my_positions)
    formData.append("video_description", data.video_description)

    if (data.profile_picture !== null && data.profile_picture.length === 1) {
      formData.append("profile_picture", data.profile_picture[0])
    }

    if (data.resume !== null && data.resume.length === 1) {
      formData.append("resume", data.resume[0])
    }

    const response = await axiosInstance.post(
      "/api/dashboard/about-me-settings/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )

    const responseData: { message: string } = response.data

    toast({
      title: responseData.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      w="full"
      spacing={4}
      align="start"
    >
      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
      >
        <Text
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          Name
        </Text>
        <FormControl isInvalid={errors.name !== undefined}>
          <Input
            size="sm"
            w="full"
            type="text"
            placeholder="Name"
            {...register("name", {
              minLength: { value: 2, message: "Minimum length should be 2" },
              maxLength: {
                value: 255,
                message: "Maximum 255 characters allowed",
              },
              required: "Name is required",
            })}
          />
          {errors.name && (
            <FormHelperText>{errors.name?.message}</FormHelperText>
          )}
        </FormControl>
        {errors.name?.message}
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
      >
        <Text
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          Profile Picture
        </Text>
        <Input
          size="sm"
          w="85%"
          type="file"
          placeholder="Profile Picture"
          {...register("profile_picture")}
        />
        <Flex px={[0, 0, 4, 4, 4]}>
          {profilePicture && (
            <Image
              width={40}
              height={40}
              src={`${BASE_URL}${profilePicture}`}
              alt="uploaded image"
            />
          )}
        </Flex>
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
      >
        <Text
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          Nationality
        </Text>
        <Input
          size="sm"
          w="full"
          type="text"
          placeholder="Nationality"
          maxLength={50}
          {...register("nationality")}
        />
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
      >
        <Text
          pt={2}
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          About Me
        </Text>
        <Textarea
          size="sm"
          w="full"
          placeholder="About me"
          {...register("about_me")}
        ></Textarea>
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
      >
        <Text
          pt={2}
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          My Positions
        </Text>
        <Textarea
          size="sm"
          w="full"
          placeholder="Positions"
          minLength={3}
          required
          {...register("my_positions")}
        ></Textarea>
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
      >
        <Text
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          Video Description
        </Text>
        <Input
          size="sm"
          w="full"
          type="text"
          placeholder="Video description"
          maxLength={100}
          {...register("video_description")}
        />
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
      >
        <Text
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          Upload Resume
        </Text>
        <Input
          size="sm"
          w={resume ? "73%" : "100%"}
          type="file"
          {...register("resume")}
        />
        {resume && (
          <HStack
            as="a"
            href={`${BASE_URL}${resume}`}
            target="_blank"
            px={[0, 0, 5, 5, 5]}
            minW={200}
            download
          >
            <FaDownload fontSize={14} />
            <Text fontSize={13}>Download Resume</Text>
          </HStack>
        )}
      </HStack>
      <Divider />

      <HStack
        w={["full", "full", 245, 245, 245]}
        justifyContent={["start", "start", "end", "end", "end"]}
      >
        <SaveButton isSubmitting={isSubmitting} isLoading={isLoading} />
        <Button size="sm" rounded={0} colorScheme="red">
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}

export default withAuth(AboutMeContent)
