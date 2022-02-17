import { Avatar, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import React from "react"

interface Props {
  imageURL: string
  title: string
  description: string
}

const ServiceBox = (props: Props) => {
  return (
    <HStack
      spacing={[0, 0, 0, 4, 4]}
      flexDir={["column", "column", "column", "row", "row"]}
    >
      <Avatar src={props.imageURL} size="lg" shadow="lg" alignSelf="start" />
      <VStack
        align="start"
        flexDir={["column", "column", "column", "column", "column"]}
      >
        <Heading as="h6" size="sm" my={[5, 5, 10, 0, 0]}>
          {props.title}
        </Heading>
        <Text textAlign="justify">{props.description}</Text>
      </VStack>
    </HStack>
  )
}

export default ServiceBox
