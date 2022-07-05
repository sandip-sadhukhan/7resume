import {
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"

interface IFormData {
  projects: number
  meetings: number
  happy_clients: number
  awards_won: number
  experience: number
}

interface StatisticsContentProps {
  state: IState
}

const StatisticsContent: React.FC<StatisticsContentProps> = (
  props: StatisticsContentProps
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
        "/api/dashboard/statistics-settings/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: IFormData = response.data

      setValue("projects", data.projects)
      setValue("meetings", data.meetings)
      setValue("happy_clients", data.happy_clients)
      setValue("awards_won", data.awards_won)
      setValue("experience", data.experience)
    }

    fetchData()
  }, [token, setValue])

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const response = await axiosInstance.post(
      "/api/dashboard/statistics-settings/",
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
        <Flex flex={[1, 1, 1, 2, 2]} w="full">
          <Text
            w="full"
            fontSize={13}
            textAlign={["start", "start", "end", "end", "end"]}
            pt={2}
          >
            Projects
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input
            type="number"
            min={0}
            w="full"
            size="sm"
            placeholder="Ex - 300"
            {...register("projects")}
          />
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
            Meetings
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input
            type="number"
            min={0}
            w="full"
            size="sm"
            placeholder="Ex - 120"
            {...register("meetings")}
          />
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
            Happy Clients
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input
            type="number"
            min={0}
            w="full"
            size="sm"
            placeholder="Ex - 1200"
            {...register("happy_clients")}
          />
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
            Awards Won
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input
            type="number"
            min={0}
            w="full"
            size="sm"
            placeholder="Ex - 22"
            {...register("awards_won")}
          />
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
            Experience
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input
            type="number"
            min={0}
            w="full"
            size="sm"
            placeholder="Ex - 5"
            {...register("experience")}
          />
        </Flex>
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

export default withAuth(StatisticsContent)
