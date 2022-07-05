import {
  Button,
  Divider,
  HStack,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"

interface IFormData {
  address: string
  gmap_iframe: string
  phone: string
  email: string
}

interface ContactInformationContentProps {
  state: IState
}

const ContactInformationContent: React.FC<ContactInformationContentProps> = (
  props: ContactInformationContentProps
) => {
  const token = props.state.user?.access as string
  const toast = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<IFormData>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        "/api/dashboard/contact-information-settings/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: IFormData = response.data

      setValue("address", data.address)
      setValue("gmap_iframe", data.gmap_iframe)
      setValue("phone", data.phone)
      setValue("email", data.email)
    }

    fetchData()
  }, [token, setValue])

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const response = await axiosInstance.post(
      "/api/dashboard/contact-information-settings/",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
        align="start"
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={4}
      >
        <Text
          fontSize={13}
          flex={[1, 1, 1, 2, 2]}
          textAlign={["start", "start", "end", "end", "end"]}
          pt={2}
        >
          Address
        </Text>
        <Textarea
          size="sm"
          placeholder="Address"
          flex={[1, 1, 8, 8, 10]}
          {...register("address")}
        ></Textarea>
      </HStack>

      <Divider />

      <HStack
        w="full"
        ps={[0, 0, 3, 3, 3]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={4}
        align="start"
        spacing={0}
      >
        <Text
          fontSize={13}
          flex={[1, 1, 1, 2, 2]}
          textAlign={["start", "start", "end", "end", "end"]}
          pt={[0, 0, 2, 2, 2]}
          pe={[0, 0, 3, 3, 3]}
        >
          Google Map Embedded Link
        </Text>
        <Textarea
          size="sm"
          placeholder="Embedded Link"
          flex={[1, 1, 8, 8, 10]}
          rows={5}
          {...register("gmap_iframe")}
        />
      </HStack>

      <Divider />

      <HStack
        align="start"
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={4}
      >
        <Text
          fontSize={13}
          flex={[1, 1, 1, 2, 2]}
          textAlign={["start", "start", "end", "end", "end"]}
          pt={2}
        >
          Phone
        </Text>
        <Textarea
          size="sm"
          placeholder="Phone"
          flex={[1, 1, 8, 8, 10]}
          {...register("phone")}
        ></Textarea>
      </HStack>

      <Divider />

      <HStack
        align="start"
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={4}
      >
        <Text
          fontSize={13}
          flex={[1, 1, 1, 2, 2]}
          textAlign={["start", "start", "end", "end", "end"]}
          pt={2}
        >
          Email
        </Text>
        <Textarea
          size="sm"
          placeholder="Email"
          flex={[1, 1, 8, 8, 10]}
          {...register("email")}
        ></Textarea>
      </HStack>

      <Divider />
      <HStack
        ps={["full", "full", 110, 150, 175]}
        justifyContent={["start", "start", "end", "end", "end"]}
      >
        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingText="Saving"
          size="sm"
          rounded={0}
          colorScheme="green"
        >
          Save
        </Button>
        <Button size="sm" rounded={0} colorScheme="red">
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}

export default withAuth(ContactInformationContent)
