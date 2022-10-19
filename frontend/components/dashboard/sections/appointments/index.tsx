import {
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { AxiosError } from "axios"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import SaveButton from "../../../shared/save-button"

interface AppointmentsSectionProps {
  state: IState
}

type DayType =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"

const AppointmentsSection: React.FC<AppointmentsSectionProps> = (
  props: AppointmentsSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue("gray", "gray.400")
  const token = props.state.user?.access as string
  const toast = useToast()

  interface Appointment {
    sunday: boolean
    sunday_start_time: string | null
    sunday_end_time: string | null
    monday: boolean
    monday_start_time: string | null
    monday_end_time: string | null
    tuesday: boolean
    tuesday_start_time: string | null
    tuesday_end_time: string | null
    wednesday: boolean
    wednesday_start_time: string | null
    wednesday_end_time: string | null
    thursday: boolean
    thursday_start_time: string | null
    thursday_end_time: string | null
    friday: boolean
    friday_start_time: string | null
    friday_end_time: string | null
    saturday: boolean
    saturday_start_time: string | null
    saturday_end_time: string | null
  }

  const {
    control,
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<Appointment>()

  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/api/dashboard/appointment/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: Appointment = response.data

      await new Promise((res) => setTimeout(res, 3000))

      setValue("sunday", data.sunday)
      setValue("sunday_start_time", data.sunday_start_time)
      setValue("sunday_end_time", data.sunday_end_time)

      setValue("monday", data.monday)
      setValue("monday_start_time", data.monday_start_time)
      setValue("monday_end_time", data.monday_end_time)

      setValue("tuesday", data.tuesday)
      setValue("tuesday_start_time", data.tuesday_start_time)
      setValue("tuesday_end_time", data.tuesday_end_time)

      setValue("wednesday", data.wednesday)
      setValue("wednesday_start_time", data.wednesday_start_time)
      setValue("wednesday_end_time", data.wednesday_end_time)

      setValue("thursday", data.thursday)
      setValue("thursday_start_time", data.thursday_start_time)
      setValue("thursday_end_time", data.thursday_end_time)

      setValue("friday", data.friday)
      setValue("friday_start_time", data.friday_start_time)
      setValue("friday_end_time", data.friday_end_time)

      setValue("saturday", data.saturday)
      setValue("saturday_start_time", data.saturday_start_time)
      setValue("saturday_end_time", data.saturday_end_time)

      setLoading(false)
    }

    fetchData()
  }, [token, setValue])

  const onSubmit: SubmitHandler<Appointment> = async (
    formData: Appointment
  ) => {
    try {
      const res = await axiosInstance.patch(
        `/api/dashboard/appointment/`,
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
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          const element = ele as DayType
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
      px={[2, 2, 4, 8, 8]}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>Appointments | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Appointments
        </Heading>
      </HStack>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack
        w="full"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        py={5}
        align="start"
        spacing={4}
        overflowX="auto"
        px={[4, 4, 8, 10, 10]}
      >
        <HStack
          w="full"
          align="start"
          flexDir={["column", "column", "row", "row", "row"]}
          gap={3}
          justifyContent="space-between"
          alignItems={["start", "start", "center", "center", "center"]}
        >
          <Controller
            control={control}
            name="sunday"
            defaultValue={false}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox
                p={0}
                size="sm"
                onChange={onChange}
                isChecked={value}
                ref={ref}
                minW={100}
              >
                Sunday
              </Checkbox>
            )}
          />
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              Start Time
            </Text>
            <FormControl isInvalid={errors.sunday_start_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("sunday_start_time")}
              />
              {errors.sunday_start_time && (
                <FormHelperText>
                  {errors.sunday_start_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              End Time
            </Text>
            <FormControl isInvalid={errors.sunday_end_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("sunday_end_time")}
              />
              {errors.sunday_end_time && (
                <FormHelperText>
                  {errors.sunday_end_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
        </HStack>

        <HStack
          w="full"
          align="start"
          flexDir={["column", "column", "row", "row", "row"]}
          gap={3}
          justifyContent="space-between"
          alignItems={["start", "start", "center", "center", "center"]}
        >
          <Controller
            control={control}
            name="monday"
            defaultValue={false}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox
                p={0}
                size="sm"
                onChange={onChange}
                isChecked={value}
                ref={ref}
                minW={100}
              >
                Monday
              </Checkbox>
            )}
          />
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              Start Time
            </Text>
            <FormControl isInvalid={errors.monday_start_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("monday_start_time")}
              />
              {errors.monday_start_time && (
                <FormHelperText>
                  {errors.monday_start_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              End Time
            </Text>
            <FormControl isInvalid={errors.monday_end_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("monday_end_time")}
              />
              {errors.monday_end_time && (
                <FormHelperText>
                  {errors.monday_end_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
        </HStack>

        <HStack
          w="full"
          align="start"
          flexDir={["column", "column", "row", "row", "row"]}
          gap={3}
          justifyContent="space-between"
          alignItems={["start", "start", "center", "center", "center"]}
        >
          <Controller
            control={control}
            name="tuesday"
            defaultValue={false}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox
                p={0}
                size="sm"
                onChange={onChange}
                isChecked={value}
                ref={ref}
                minW={100}
              >
                Tuesday
              </Checkbox>
            )}
          />
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              Start Time
            </Text>
            <FormControl isInvalid={errors.tuesday_start_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("tuesday_start_time")}
              />
              {errors.tuesday_start_time && (
                <FormHelperText>
                  {errors.tuesday_start_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              End Time
            </Text>
            <FormControl isInvalid={errors.tuesday_end_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("tuesday_end_time")}
              />
              {errors.tuesday_end_time && (
                <FormHelperText>
                  {errors.tuesday_end_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
        </HStack>

        <HStack
          w="full"
          align="start"
          flexDir={["column", "column", "row", "row", "row"]}
          gap={3}
          justifyContent="space-between"
          alignItems={["start", "start", "center", "center", "center"]}
        >
          <Controller
            control={control}
            name="wednesday"
            defaultValue={false}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox
                p={0}
                size="sm"
                onChange={onChange}
                isChecked={value}
                ref={ref}
                minW={100}
              >
                Wednesday
              </Checkbox>
            )}
          />
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              Start Time
            </Text>
            <FormControl isInvalid={errors.wednesday_start_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("wednesday_start_time")}
              />
              {errors.wednesday_start_time && (
                <FormHelperText>
                  {errors.wednesday_start_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              End Time
            </Text>
            <FormControl isInvalid={errors.wednesday_end_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("wednesday_end_time")}
              />
              {errors.wednesday_end_time && (
                <FormHelperText>
                  {errors.wednesday_end_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
        </HStack>

        <HStack
          w="full"
          align="start"
          flexDir={["column", "column", "row", "row", "row"]}
          gap={3}
          justifyContent="space-between"
          alignItems={["start", "start", "center", "center", "center"]}
        >
          <Controller
            control={control}
            name="thursday"
            defaultValue={false}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox
                p={0}
                size="sm"
                onChange={onChange}
                isChecked={value}
                ref={ref}
                minW={100}
              >
                Thursday
              </Checkbox>
            )}
          />
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              Start Time
            </Text>
            <FormControl isInvalid={errors.thursday_start_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("thursday_start_time")}
              />
              {errors.thursday_start_time && (
                <FormHelperText>
                  {errors.thursday_start_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              End Time
            </Text>
            <FormControl isInvalid={errors.thursday_end_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("thursday_end_time")}
              />
              {errors.thursday_end_time && (
                <FormHelperText>
                  {errors.thursday_end_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
        </HStack>

        <HStack
          w="full"
          align="start"
          flexDir={["column", "column", "row", "row", "row"]}
          gap={3}
          justifyContent="space-between"
          alignItems={["start", "start", "center", "center", "center"]}
        >
          <Controller
            control={control}
            name="friday"
            defaultValue={false}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox
                p={0}
                size="sm"
                onChange={onChange}
                isChecked={value}
                ref={ref}
                minW={100}
              >
                Friday
              </Checkbox>
            )}
          />
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              Start Time
            </Text>
            <FormControl isInvalid={errors.friday_start_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("friday_start_time")}
              />
              {errors.friday_start_time && (
                <FormHelperText>
                  {errors.friday_start_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              End Time
            </Text>
            <FormControl isInvalid={errors.friday_end_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("friday_end_time")}
              />
              {errors.friday_end_time && (
                <FormHelperText>
                  {errors.friday_end_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
        </HStack>

        <HStack
          w="full"
          align="start"
          flexDir={["column", "column", "row", "row", "row"]}
          gap={3}
          justifyContent="space-between"
          alignItems={["start", "start", "center", "center", "center"]}
        >
          <Controller
            control={control}
            name="saturday"
            defaultValue={false}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox
                p={0}
                size="sm"
                onChange={onChange}
                isChecked={value}
                ref={ref}
                minW={100}
              >
                Saturday
              </Checkbox>
            )}
          />
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              Start Time
            </Text>
            <FormControl isInvalid={errors.saturday_start_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("saturday_start_time")}
              />
              {errors.saturday_start_time && (
                <FormHelperText>
                  {errors.saturday_start_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
          <HStack>
            <Text fontSize={13} color={textColor} minW={70}>
              End Time
            </Text>
            <FormControl isInvalid={errors.saturday_end_time !== undefined}>
              <Input
                w="full"
                size="sm"
                type="time"
                color={textColor}
                {...register("saturday_end_time")}
              />
              {errors.saturday_end_time && (
                <FormHelperText>
                  {errors.saturday_end_time?.message}
                </FormHelperText>
              )}
            </FormControl>
          </HStack>
        </HStack>

        <Divider pt={6} />

        <VStack w="full" align="end">
          <HStack>
            <SaveButton isLoading={isLoading} isSubmitting={isSubmitting} />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default withAuth(AppointmentsSection)
