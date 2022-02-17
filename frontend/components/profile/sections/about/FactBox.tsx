import { Heading, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { IconType } from "react-icons"

interface Props {
  grayBackground: string
  secondaryColor: string
  primaryText: string
  secondaryText: string
  icon: IconType
}

const FactBox = (props: Props) => {
  return (
    <VStack
      flex={1}
      bg={props.grayBackground}
      py={6}
      px={2}
      shadow="md"
      borderRadius={5}
      w="full"
    >
      <props.icon fontSize={35} color={props.secondaryColor} />
      <Text fontSize={18}>{props.primaryText}</Text>
      <Heading color="gray.400" size="lg">
        {props.secondaryText}
      </Heading>
    </VStack>
  )
}

export default FactBox
