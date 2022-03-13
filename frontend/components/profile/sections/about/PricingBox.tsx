import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { PricingPlanType } from "../../../../types/profile"

interface PricingBoxProps extends PricingPlanType {
  headingColor: string
  secondaryColor: string
}

const PricingBox: React.FC<PricingBoxProps> = (props: PricingBoxProps) => {
  const {
    headingColor,
    secondaryColor,
    plan_name,
    plan_price,
    price_duration,
    plan_currency,
    is_featured,
    feature_comment,
    features,
    plan_icon_path,
  } = props

  const username = useRouter().query.username as string

  return (
    <VStack
      flex={1}
      px={[0, 0, 0, 4, 6]}
      py={10}
      shadow="2xl"
      _hover={{ transform: "translateY(-15px)" }}
      transition=".2s all"
      cursor="pointer"
      rounded="2xl"
      w="full"
    >
      {is_featured ? (
        <Box
          bgColor={secondaryColor}
          px={16}
          py={2}
          mb={2}
          clipPath="polygon(100% 0, 90% 50%, 100% 100%, 0% 100%, 10% 50%, 0 0)"
        >
          <Text color="white" fontWeight={700}>
            {feature_comment}
          </Text>
        </Box>
      ) : null}
      <Avatar
        size="2xl"
        src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${plan_icon_path}`}
      />
      <Heading py={10} as="h4" size="lg" textTransform="uppercase">
        {plan_name}
      </Heading>
      <Text style={{ whiteSpace: "pre-wrap" }} color={headingColor}>
        {features}
      </Text>
      <Flex alignItems="baseline" pb={5}>
        <Text color={secondaryColor} fontWeight={500} fontSize="20">
          {plan_currency}
        </Text>
        <Text
          me={2}
          ms={1}
          fontWeight={500}
          fontSize="50"
          color={secondaryColor}
        >
          {plan_price}
        </Text>
        <Flex>
          <Text fontSize={18}>/ {price_duration}</Text>
        </Flex>
      </Flex>
      <Link href={`/u/${username}/contact-me`}>
        <a>
          <Button color="#fff" bgColor={secondaryColor} rounded="full">
            Hire Me
          </Button>
        </a>
      </Link>
    </VStack>
  )
}

export default PricingBox
