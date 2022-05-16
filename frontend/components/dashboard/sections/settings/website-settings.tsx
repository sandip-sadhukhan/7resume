import {
  Button,
  Divider,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react"
import Image from "../../../image"
import React, { useCallback, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/router"
import axiosInstance from "../../../../utils/axiosInstance"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"

interface WebsiteSettingsProps {
  state: IState
}

const WebsiteSettings: React.FC<WebsiteSettingsProps> = (
  props: WebsiteSettingsProps
) => {
  const textColor = useColorModeValue("gray.700", "gray.100")
  const router = useRouter()
  const token = props.state.user?.access as string
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

  const toast = useToast()

  interface IFormData {
    site_title: string | null
    webmaster_email: string | null
    favicon: string | null
    start_page_background: string | null
    about_me_image: string | null
    contact_form_image: string | null
  }

  interface IPictures {
    favicon: string | null
    start_page_background: string | null
    about_me_image: string | null
    contact_form_image: string | null
  }
  const [pictures, setPictures] = useState<IPictures>({
    favicon: "",
    start_page_background: "",
    about_me_image: "",
    contact_form_image: "",
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<IFormData>()

  const updateData = useCallback(
    (data: IFormData) => {
      setValue("site_title", data.site_title)
      setValue("webmaster_email", data.webmaster_email)
      setPictures({
        favicon: data.favicon,
        start_page_background: data.start_page_background,
        about_me_image: data.about_me_image,
        contact_form_image: data.contact_form_image,
      })
    },
    [setValue]
  )

  const fetchData = useCallback(async () => {
    const response = await axiosInstance.get(
      "/api/dashboard/website-settings/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data: IFormData = response.data
    updateData(data)
  }, [token, updateData])

  useEffect(() => {
    fetchData()
  }, [token, setValue, fetchData])

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("site_title", data.site_title || "")
    formData.append("webmaster_email", data.webmaster_email || "")

    if (data.favicon !== null && data.favicon.length === 1) {
      formData.append("favicon", data.favicon[0])
    }

    if (
      data.start_page_background !== null &&
      data.start_page_background.length === 1
    ) {
      formData.append("start_page_background", data.start_page_background[0])
    }

    if (data.about_me_image !== null && data.about_me_image.length === 1) {
      formData.append("about_me_image", data.about_me_image[0])
    }

    if (
      data.contact_form_image !== null &&
      data.contact_form_image.length === 1
    ) {
      formData.append("contact_form_image", data.contact_form_image[0])
    }

    const response = await axiosInstance.post(
      "/api/dashboard/website-settings/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )

    const responseData: IFormData = response.data
    updateData(responseData)
    setValue("favicon", null)
    setValue("start_page_background", null)
    setValue("about_me_image", null)
    setValue("contact_form_image", null)

    toast({
      title: "Settings Saved!",
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
      align="start"
      spacing={4}
      color={textColor}
    >
      {/* Site Title */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Site Title
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="text"
            placeholder="Name"
            {...register("site_title")}
          />
        </HStack>
      </HStack>

      <Divider />

      {/* Webmaster email*/}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Webmaster Email
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="email"
            placeholder="Webmaster Email"
            {...register("webmaster_email")}
          />
        </HStack>
      </HStack>

      <Divider />

      {/* Favicon */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Favicon
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            {...register("favicon")}
            accept=".png,.jpg,.jpeg"
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          {pictures.favicon && (
            <Image
              src={`${BASE_URL}${pictures.favicon}`}
              alt="favicon"
              width={40}
              height={40}
            />
          )}
        </HStack>
      </HStack>

      <Divider />

      {/* Start Page Background */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Start Page Background
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            {...register("start_page_background")}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          {pictures.start_page_background && (
            <Image
              src={`${BASE_URL}${pictures.start_page_background}`}
              alt="start page background"
              width={40}
              height={40}
            />
          )}
        </HStack>
      </HStack>

      <Divider />

      {/* About Me Image */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          About Me Image
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            {...register("about_me_image")}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          {pictures.about_me_image && (
            <Image
              src={`${BASE_URL}${pictures.about_me_image}`}
              alt="about me"
              width={40}
              height={40}
            />
          )}
        </HStack>
      </HStack>

      <Divider />

      {/* Contact Form Image */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Contact Form Image
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            {...register("contact_form_image")}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          {pictures.contact_form_image && (
            <Image
              src={`${BASE_URL}${pictures.contact_form_image}`}
              alt="favicon"
              width={40}
              height={40}
            />
          )}
        </HStack>
      </HStack>
      <Divider />

      <HStack
        w={["full", "full", 200, 245, 295]}
        justifyContent={["start", "start", "end", "end", "end"]}
      >
        <Button
          type="submit"
          size="sm"
          rounded={0}
          colorScheme="green"
          isLoading={isSubmitting}
          loadingText="Saving"
        >
          Save
        </Button>
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
  )
}

export default withAuth(WebsiteSettings)
