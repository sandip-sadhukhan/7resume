import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import React, { useState } from "react"
import { TestimonialsType, TestimonialType } from "../../../../types/profile"
import TestimonialBox from "./TestimonialBox"

interface Props {
  grayBackground: string
  secondaryColor: string
  testimonials: TestimonialType[]
}

const ClientSay = (props: Props) => {
  const testimonials: TestimonialsType[] = []

  for (let i = 0; i < props.testimonials.length; i += 2) {
    const _testimonials: TestimonialsType = {
      first: props.testimonials[i],
      second: null,
    }
    if (i + 1 < props.testimonials.length) {
      _testimonials.second = props.testimonials[i + 1]
    }
    testimonials.push(_testimonials)
  }

  const [current, setCurrent] = useState(0)

  return (
    <Flex pt={5} pb={16} flexDir="column" w="full">
      <VStack
        pt={10}
        px={[4, 5, 6, 8, 10]}
        align="start"
        bgColor={props.grayBackground}
        w="full"
      >
        <Heading as="h3" mb={10} fontSize={[20, 20, 20, 30, 30]}>
          Client Say
        </Heading>

        <HStack
          spacing={[0, 0, 0, 8, 8]}
          flexDir={["column", "column", "column", "row", "row"]}
          gap={8}
        >
          <TestimonialBox
            testimonial={testimonials[current].first}
            grayBackground={props.grayBackground}
            secondaryColor={props.secondaryColor}
          />
          {testimonials[current].second !== null ? (
            <TestimonialBox
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              testimonial={testimonials[current].second!}
              grayBackground={props.grayBackground}
              secondaryColor={props.secondaryColor}
            />
          ) : null}
        </HStack>
        <HStack py={10} w="full" justifyContent="center">
          {testimonials.map((_, ind) => (
            <Box
              px={2}
              key={ind}
              bgColor={current === ind ? props.secondaryColor : "gray"}
              color="white"
              justifyContent="center"
              as="button"
              rounded="full"
              onClick={() => setCurrent(ind)}
            >
              <Text>{ind + 1}</Text>
            </Box>
          ))}
        </HStack>
      </VStack>
    </Flex>
  )
}

export default ClientSay
