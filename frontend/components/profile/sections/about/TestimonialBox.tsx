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
import { Testimonial } from "../../../../types/profile"

interface Props {
  testimonial: Testimonial
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
            {props.testimonial.body}
          </Text>
        </HStack>
      </Box>
      <HStack spacing={3}>
        <Avatar size="lg" src={props.testimonial.userImage} />
        <VStack align="start">
          <Text fontWeight={600} mb={-2}>
            {props.testimonial.name}
          </Text>
          <Text fontSize={14}>{props.testimonial.position}</Text>
          <Flex>
            <AiFillStar
              color={
                props.testimonial.star in [1, 2, 3, 4, 5]
                  ? props.secondaryColor
                  : props.grayBackground
              }
            />
            <AiFillStar
              color={
                props.testimonial.star in [2, 3, 4, 5]
                  ? props.secondaryColor
                  : props.grayBackground
              }
            />
            <AiFillStar
              color={
                props.testimonial.star in [3, 4, 5]
                  ? props.secondaryColor
                  : props.grayBackground
              }
            />
            <AiFillStar
              color={
                props.testimonial.star in [4, 5]
                  ? props.secondaryColor
                  : props.grayBackground
              }
            />
            <AiFillStar
              color={
                props.testimonial.star == 5
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
