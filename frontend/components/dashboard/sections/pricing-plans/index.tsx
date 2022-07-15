import {
  Button,
  Divider,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { FaPencilAlt, FaPlusSquare, FaTrash } from "react-icons/fa"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import Image from "../../../image"
import PricingPlanSkeleton from "./pricing-plan-skeleton"

interface PricingPlanSectionProps {
  state: IState
}

const PricingPlanSection: React.FC<PricingPlanSectionProps> = (
  props: PricingPlanSectionProps
) => {
  const bgColor = useColorModeValue("white", "gray.700")
  const buttonSize = useBreakpointValue({ base: "xs", sm: "sm" })
  const token = props.state.user?.access as string
  const toast = useToast()
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

  interface PricingPlan {
    id: number
    plan_name: string
    plan_icon: string
    plan_price: string
    price_duration: string
    plan_currency: string
  }

  const [data, setData] = useState<PricingPlan[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        "/api/dashboard/pricing-plans/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: PricingPlan[] = response.data
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, [token])

  const deletePricingPlan = async (id: number) => {
    if (data === null) return

    let newPricingPlan = [...data]
    newPricingPlan = newPricingPlan.filter(
      (pricingPlan) => pricingPlan.id !== id
    )
    setData(newPricingPlan)

    const response = await axiosInstance.delete(
      `/api/dashboard/pricing-plan/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const resData: { message: string } = response.data

    toast({
      title: resData.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
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
        <title>Pricing Plans | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Pricing Plans
        </Heading>
        <Link href="/dashboard/pricing-plans/new">
          <a>
            <Button size="xs" colorScheme="green" rounded={0}>
              <FaPlusSquare fontSize={13} />
              <Text fontSize={12} ps={1}>
                Add New Record
              </Text>
            </Button>
          </a>
        </Link>
      </HStack>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack w="full" pt={5} align="start" spacing={4} overflowX="auto">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Plan Price</Th>
              <Th>Operations</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && [1].map((ele) => <PricingPlanSkeleton key={ele} />)}
            {data &&
              data.map((pricingPlan) => (
                <Tr key={pricingPlan.id}>
                  <Td>
                    <HStack
                      w="full"
                      align="start"
                      alignItems="center"
                      flexDir={["column", "row", "row", "row", "row"]}
                      gap={2}
                      spacing={[0, 2, 2, 2, 2]}
                    >
                      <Image
                        width={40}
                        height={40}
                        src={`${BASE_API_URL}${pricingPlan.plan_icon}`}
                        alt={`${pricingPlan.plan_name} pricing plan`}
                      />
                      <Text fontSize={[10, 13, 13, 13, 13]}>
                        {pricingPlan.plan_name}
                      </Text>
                    </HStack>
                  </Td>

                  <Td>
                    <Text fontSize={[10, 13, 13, 13, 13]}>
                      {pricingPlan.plan_currency}
                      {pricingPlan.plan_price} {pricingPlan.price_duration}
                    </Text>
                  </Td>
                  <Td>
                    <HStack
                      w="full"
                      align="start"
                      flexDir={["column", "row", "row", "row", "row"]}
                      gap={2}
                      spacing={[0, 2, 2, 2, 2]}
                    >
                      <Link
                        href={`/dashboard/pricing-plans/edit/${pricingPlan.id}`}
                      >
                        <a>
                          <Button
                            size={buttonSize}
                            rounded={0}
                            colorScheme="orange"
                          >
                            <FaPencilAlt fontSize={13} />
                            <Text fontSize={[10, 13, 13, 13, 13]} ps={2}>
                              Edit
                            </Text>
                          </Button>
                        </a>
                      </Link>
                      <Button
                        size={buttonSize}
                        rounded={0}
                        colorScheme="red"
                        onClick={() => deletePricingPlan(pricingPlan.id)}
                      >
                        <FaTrash fontSize={13} />
                        <Text fontSize={[10, 13, 13, 13, 13]} ps={2}>
                          Delete
                        </Text>
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </VStack>
    </VStack>
  )
}

export default withAuth(PricingPlanSection)
