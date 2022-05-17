import {
  Button,
  Divider,
  HStack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"

interface SeoProps {
  state: IState
}

const Seo: React.FC<SeoProps> = (props: SeoProps) => {
  const textColor = useColorModeValue("gray.700", "gray.100")
  const token = props.state.user?.access as string
  const toast = useToast()

  interface IFormData {
    meta_description: string
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<IFormData>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/api/dashboard/seo-settings/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: IFormData = response.data
      setValue("meta_description", data.meta_description)
    }

    fetchData()
  }, [token, setValue])

  const onSubmit: SubmitHandler<IFormData> = async (formData: IFormData) => {
    await axiosInstance.post("/api/dashboard/seo-settings/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast({
      title: "Seo Settings saved",
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
      color={textColor}
    >
      {/* SEO */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="start"
      >
        <Text
          fontSize={14}
          w={["full", "full", 100, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Meta Description
        </Text>
        <HStack w="full" flex={1}>
          <Textarea
            size="sm"
            w="full"
            placeholder="Meta Description..."
            {...register("meta_description")}
          ></Textarea>
        </HStack>
      </HStack>

      <Divider />

      <HStack
        w={["full", "full", 240, 245, 295]}
        justifyContent={["start", "start", "end", "end", "end"]}
      >
        <Button
          size="sm"
          type="submit"
          rounded={0}
          colorScheme="green"
          loadingText="Saving"
          isLoading={isSubmitting}
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

export default withAuth(Seo)
