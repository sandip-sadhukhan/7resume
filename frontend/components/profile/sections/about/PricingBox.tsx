import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import React from "react"

interface Props {
  imageURL: string
  title: string
  headingColor: string
  features: string[]
  secondaryColor: string
  specialPrice?: string
}

const PricingBox = (props: Props) => {
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
      {props.specialPrice ? (
        <Box
          bgColor={props.secondaryColor}
          px={16}
          py={2}
          mb={2}
          clipPath="polygon(100% 0, 90% 50%, 100% 100%, 0% 100%, 10% 50%, 0 0)"
        >
          <Text color="white" fontWeight={700}>
            {props.specialPrice}
          </Text>
        </Box>
      ) : null}
      <Avatar size="2xl" src={props.imageURL} />
      <Heading py={10} as="h4" size="lg" textTransform="uppercase">
        {props.title}
      </Heading>
      {props.features.map((feature, index) => (
        <Text key={index} color={props.headingColor}>
          {feature}
        </Text>
      ))}
      <Flex alignItems="baseline" pb={5}>
        <Text color={props.secondaryColor} fontWeight={500} fontSize="20">
          $
        </Text>
        <Text
          me={2}
          ms={1}
          fontWeight={500}
          fontSize="50"
          color={props.secondaryColor}
        >
          99
        </Text>
        <Flex>
          <Text fontSize={18}>/ Per Month</Text>
        </Flex>
      </Flex>
      <Button
        as="a"
        href="#"
        color="#fff"
        bgColor={props.secondaryColor}
        rounded="full"
      >
        Hire Me
      </Button>
    </VStack>
  )
}

export default PricingBox
