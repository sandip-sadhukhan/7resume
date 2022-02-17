import { Flex, HStack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { IconType } from "react-icons"

interface Props {
  headingColor: string
  secondaryColor: string
  primaryText: string
  secondaryText: string
  icon: IconType
}

const IconBox = (props: Props) => {
  return (
    <HStack
      spacing={3}
      alignItems="center"
      justifyContent="start"
      py={2}
      w="full"
    >
      <Flex
        bgColor={props.secondaryColor}
        borderRadius="full"
        p={3}
        color="#fff"
        shadow="md"
      >
        {<props.icon />}
      </Flex>
      <VStack alignItems="start" spacing={0}>
        <Text fontWeight={700} color={props.headingColor}>
          {props.primaryText}
        </Text>
        <Text fontSize={15}>{props.secondaryText}</Text>
      </VStack>
    </HStack>
  )
}

export default IconBox
