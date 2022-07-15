import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  HStack,
  Input,
  Switch,
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
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import Image from "../../../image"
import SaveButton from "../../../shared/save-button"

interface EditPricingPlanSectionProps {
  state: IState
}

const EditPricingPlanSection: React.FC<EditPricingPlanSectionProps> = (
  props: EditPricingPlanSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()
  const token = props.state.user?.access as string
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
  const toast = useToast()
  const pricingPlanId = router.query.id as string

  interface IFormData {
    display_plan: boolean
    plan_name: string
    plan_price: string
    price_duration: string
    plan_currency: string
    is_featured: boolean
    feature_comment: string
    features: string
    plan_icon: string
  }

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const [isLoading, setLoading] = useState<boolean>(true)
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/api/dashboard/pricing-plan/${pricingPlanId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: IFormData = response.data
      setValue("display_plan", data.display_plan)
      setValue("plan_name", data.plan_name)
      setValue("plan_price", data.plan_price)
      setValue("price_duration", data.price_duration)
      setValue("plan_currency", data.plan_currency)
      setValue("is_featured", data.is_featured)
      setValue("feature_comment", data.feature_comment)
      setValue("features", data.features)
      setImage(data.plan_icon)
      setLoading(false)
    }

    fetchData()
  }, [token, setValue, pricingPlanId])

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    const formData = new FormData()

    formData.append("display_plan", data.display_plan.toString())
    formData.append("plan_name", data.plan_name)
    formData.append("plan_price", data.plan_price)
    formData.append("price_duration", data.price_duration)
    formData.append("plan_currency", data.plan_currency)
    formData.append("is_featured", data.is_featured.toString())
    formData.append("feature_comment", data.feature_comment)
    formData.append("features", data.features)

    if (data.plan_icon !== null && data.plan_icon.length === 1) {
      formData.append("plan_icon", data.plan_icon[0])
    }

    try {
      const res = await axiosInstance.patch(
        `/api/dashboard/pricing-plan/${pricingPlanId}`,
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
      router.push("/dashboard/pricing-plans")
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          type elementType =
            | "display_plan"
            | "plan_name"
            | "plan_price"
            | "price_duration"
            | "plan_currency"
            | "is_featured"
            | "feature_comment"
            | "plan_icon"

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
        <title>Edit Pricing Plan | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Edit Pricing Plan
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
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Display Plan
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} pt={3} w="full" alignItems="end">
            <Controller
              control={control}
              name="display_plan"
              defaultValue={false}
              render={({ field: { onChange, value, ref } }) => (
                <Switch
                  size="sm"
                  ring={0}
                  _hover={{ ring: 0 }}
                  onChange={onChange}
                  isChecked={value}
                  ref={ref}
                />
              )}
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
              Plan Name
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <FormControl isInvalid={errors.plan_name !== undefined}>
              <Input
                w="full"
                size="sm"
                placeholder="Plan Name"
                {...register("plan_name", {
                  required: "Plan name should not be empty.",
                })}
              />
              {errors.plan_name && (
                <FormHelperText>{errors.plan_name?.message}</FormHelperText>
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
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Plan Price
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex
            flex={[1, 1, 8, 8, 10]}
            w="full"
            alignItems="end"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Flex flex={1}>
              <FormControl isInvalid={errors.plan_price !== undefined}>
                <Input
                  w="full"
                  size="sm"
                  placeholder="Plan Price"
                  {...register("plan_price", {
                    required: "Plan price should not be empty.",
                  })}
                />
                {errors.plan_price && (
                  <FormHelperText>{errors.plan_price?.message}</FormHelperText>
                )}
              </FormControl>
            </Flex>
            <Flex flex={[1, 1, 2, 2, 2]}>
              <Text
                w="full"
                fontSize={13}
                textAlign={["start", "start", "end", "end", "end"]}
                pt={2}
              >
                Price Duration
              </Text>
              <Text color="red" ps={1} pe={3}>
                *
              </Text>
              <FormControl isInvalid={errors.price_duration !== undefined}>
                <Input
                  w="full"
                  size="sm"
                  placeholder="Plan Duration"
                  {...register("price_duration", {
                    required: "Price duration should not be empty.",
                  })}
                />
                {errors.price_duration && (
                  <FormHelperText>
                    {errors.price_duration?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Flex>
            <Flex flex={[1, 1, 2, 2, 2]}>
              <Text
                w="full"
                fontSize={13}
                textAlign={["start", "start", "end", "end", "end"]}
                pt={2}
              >
                Plan Currency
              </Text>
              <Text color="red" ps={1} pe={3}>
                *
              </Text>
              <FormControl isInvalid={errors.plan_currency !== undefined}>
                <Input
                  w="full"
                  size="sm"
                  placeholder="Plan Currency"
                  {...register("plan_currency", {
                    required: "Plan currency should not be empty.",
                  })}
                />
                {errors.plan_currency && (
                  <FormHelperText>
                    {errors.plan_currency?.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Flex>
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
              Featured Item
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex
            flex={[1, 1, 8, 8, 10]}
            w="full"
            alignItems="end"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Flex gap={3}>
              <Controller
                control={control}
                name="is_featured"
                defaultValue={false}
                render={({ field: { onChange, value, ref } }) => (
                  <Switch
                    size="sm"
                    ring={0}
                    _hover={{ ring: 0 }}
                    onChange={onChange}
                    isChecked={value}
                    ref={ref}
                  />
                )}
              />
              <Text fontSize={13} color="gray">
                Is Featured
              </Text>
            </Flex>
            <Flex flex={1} gap={3}>
              <Text
                w="full"
                fontSize={13}
                textAlign={["start", "start", "end", "end", "end"]}
                pt={2}
              >
                Featured Comment
              </Text>
              <FormControl isInvalid={errors.feature_comment !== undefined}>
                <Input
                  w="full"
                  size="sm"
                  placeholder="Featured Comment"
                  {...register("feature_comment")}
                />
                {errors.feature_comment && (
                  <FormHelperText>
                    {errors.feature_comment.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Flex>
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
              Features
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <FormControl isInvalid={errors.features !== undefined}>
              <Textarea
                placeholder="Features"
                size="sm"
                {...register("features", {
                  required: "Features should not be empty.",
                })}
              />
              {errors.features && (
                <FormHelperText>{errors.features.message}</FormHelperText>
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full">
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Plan Icon
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <FormControl isInvalid={errors.plan_icon !== undefined}>
              <Input
                w="full"
                type="file"
                size="sm"
                {...register("plan_icon")}
              />
              {errors.plan_icon && (
                <FormHelperText>{errors.plan_icon.message}</FormHelperText>
              )}
            </FormControl>
          </Flex>
          {image && (
            <Flex>
              <Image
                width={40}
                height={40}
                src={`${BASE_API_URL}${image}`}
                alt={`${getValues("plan_name")} plan`}
              />
            </Flex>
          )}
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

export default withAuth(EditPricingPlanSection)
