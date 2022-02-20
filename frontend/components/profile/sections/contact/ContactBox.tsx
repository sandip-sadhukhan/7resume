import { Flex, HStack, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { IconType } from "react-icons"
import React from "react"

interface Props {
  secondaryColor: string
  icon: IconType
  title: string
  primaryText: string
  secondaryText: string
}

const ContactBox = (props: Props) => {
  return (
    <HStack spacing={4} w="full">
      <Flex
        p={3}
        bgColor={props.secondaryColor}
        rounded="full"
        color="white"
        shadow="lg"
        _hover={{ transform: "translateY(-5px)" }}
        transition="0.2s all"
      >
        <props.icon fontSize={30} />
      </Flex>
      <VStack spacing={0} align="start">
        <Text fontSize={20} fontWeight={600}>
          {props.title}
        </Text>
        <Text color={useColorModeValue("gray.600", "gray.300")}>
          {props.primaryText}
        </Text>
        <Text color={useColorModeValue("gray.600", "gray.300")}>
          {props.secondaryText}
        </Text>
      </VStack>
    </HStack>
  )
}

export default ContactBox
