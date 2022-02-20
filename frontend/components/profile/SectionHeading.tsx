import { Divider, Heading, VStack } from "@chakra-ui/react"
import React from "react"

interface Props {
  headingColor: string
  secondaryColor: string
  title: string
}

const SectionHeading = (props: Props) => {
  return (
    <VStack align="center" w="full">
      <Heading mb={1} color={props.headingColor} fontWeight={600}>
        {props.title}
      </Heading>
      <Divider pt={1} w={40} bgColor={props.secondaryColor} />
    </VStack>
  )
}

export default SectionHeading
