import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { FaQuoteLeft } from "react-icons/fa"
import { TestimonialType } from "../../../../types/profile"

interface Props {
  testimonial: TestimonialType
  secondaryColor: string
  grayBackground: string
}

const TestimonialBox = (props: Props) => {
  const whiteBackground = useColorModeValue("white", "gray.600")

  return (
    <VStack align="left" gap={2} w="full">
      <Box
        p={[2, 2, 3, 4, 5]}
        bgColor={whiteBackground}
        rounded="md"
        shadow="md"
      >
        <HStack
          spacing={[2, 2, 2, 4, 8]}
          flexDir={["column", "column", "column", "row", "row"]}
        >
          <FaQuoteLeft fontSize={30} color={props.secondaryColor} />
          <Text textAlign="justify" pt={5}>
            {props.testimonial.message}
          </Text>
        </HStack>
      </Box>
      <HStack spacing={3}>
        <Avatar
          size="lg"
          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${props.testimonial.image_path}`}
        />
        <VStack align="start">
          <Text fontWeight={600} mb={-2}>
            {props.testimonial.name}
          </Text>
          <Text fontSize={14}>{props.testimonial.position}</Text>
          <Flex>
            {Array(props.testimonial.rating)
              .fill(1)
              .map((ele: number, index) => (
                <AiFillStar key={index} color={props.secondaryColor} />
              ))}
            {Array(5 - props.testimonial.rating)
              .fill(1)
              .map((ele: number, index) => (
                <AiOutlineStar key={index} color={props.secondaryColor} />
              ))}
          </Flex>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default TestimonialBox
