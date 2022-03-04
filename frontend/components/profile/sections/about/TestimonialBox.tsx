import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import { AiFillStar } from "react-icons/ai"
import { FaQuoteLeft } from "react-icons/fa"
import { TestimonialType } from "../../../../types/profile"

interface Props {
  testimonial: TestimonialType
  secondaryColor: string
  grayBackground: string
}

const TestimonialBox = (props: Props) => {
  const quoteIconFontSize = useBreakpointValue({ base: 30, md: 60 })
  const whiteBackground = useColorModeValue("white", "gray.600")

  return (
    <VStack align="left" gap={2}>
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
          <FaQuoteLeft
            fontSize={quoteIconFontSize}
            color={props.secondaryColor}
          />
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
            <AiFillStar
              color={
                props.testimonial.rating in [1, 2, 3, 4, 5]
                  ? props.secondaryColor
                  : props.grayBackground
              }
            />
            <AiFillStar
              color={
                props.testimonial.rating in [2, 3, 4, 5]
                  ? props.secondaryColor
                  : props.grayBackground
              }
            />
            <AiFillStar
              color={
                props.testimonial.rating in [3, 4, 5]
                  ? props.secondaryColor
                  : props.grayBackground
              }
            />
            <AiFillStar
              color={
                props.testimonial.rating in [4, 5]
                  ? props.secondaryColor
                  : props.grayBackground
              }
            />
            <AiFillStar
              color={
                props.testimonial.rating === 5
                  ? props.secondaryColor
                  : props.grayBackground
              }
            />
          </Flex>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default TestimonialBox
