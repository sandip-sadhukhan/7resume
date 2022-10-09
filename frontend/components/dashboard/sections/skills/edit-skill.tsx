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
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { AxiosError } from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import SaveButton from "../../../shared/save-button"

interface EditSkillSectionProps {
  state: IState
}

const EditSkillSection: React.FC<EditSkillSectionProps> = (
  props: EditSkillSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()
  const token = props.state.user?.access as string
  const toast = useToast()
  const skillId = router.query.id as string

  interface SkillCategory {
    id: number
    title: string
  }

  interface IFormData {
    category_id: string | null
    title: string
    level: string
  }

  interface InitialData {
    skill: IFormData
    categories: SkillCategory[]
  }

  const [data, setData] = useState<SkillCategory[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  useEffect(() => {
    if (!skillId) return

    const fetchData = async () => {
      const res = await axiosInstance.get(`/api/dashboard/skill/${skillId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const { categories: categoryData, skill: skillData } =
        res.data as InitialData

      setData(categoryData)
      setValue("category_id", skillData.category_id)
      setValue("title", skillData.title)
      setValue("level", skillData.level)

      setLoading(false)
    }

    fetchData()
  }, [skillId, token, setValue])

  const onSubmit: SubmitHandler<IFormData> = async (formData: IFormData) => {
    if (!formData.category_id) {
      formData.category_id = null
    }

    try {
      const res = await axiosInstance.patch(
        `/api/dashboard/skill/${skillId}/`,
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
      router.push("/dashboard/skills")
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          type elementType = "category_id" | "title" | "level"

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
        <title>Edit Skill | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Edit Skill
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
              Skills
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Select
              placeholder="Select..."
              size="sm"
              {...register("category_id")}
            >
              {data &&
                data.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
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
              Title
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.title !== undefined}>
              <Input
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
              Level
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.level !== undefined}>
              <Input
                type="number"
                step="0.1"
                size="sm"
                placeholder="Level"
                {...register("level", {
                  required: "Level should not be empty.",
                  min: {
                    value: 0,
                    message: "Minimum value should not be less than 0",
                  },
                  max: {
                    value: 100,
                    message: "Maximum value should not be more than 100",
                  },
                })}
              />
              {errors.level && (
                <FormHelperText>{errors.level?.message}</FormHelperText>
              )}
            </FormControl>
          </Flex>
        </HStack>
        <Divider />

        <HStack
          w={["full", "full", 260, 320, 330]}
          justifyContent={["start", "start", "end", "end", "end"]}
        >
          <SaveButton isLoading={isLoading} isSubmitting={isSubmitting} />
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

export default withAuth(EditSkillSection)
