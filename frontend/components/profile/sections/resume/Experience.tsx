import { Avatar, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import React from "react"

interface ExperienceProps {
  grayBackground: string
  grayText: string
  secondaryColor: string
  date: string
  position: string
  institute: string
  instituteLogo: string
  description: string
}

const Experience: React.FC<ExperienceProps> = (props: ExperienceProps) => {
  return (
    <HStack
      w="full"
      spacing={[0, 0, 0, 8, 10]}
      bgColor={props.grayBackground}
      py={10}
      px={5}
      flexDir={["column", "column", "column", "row", "row"]}
      gap={4}
    >
      <Flex flex={1} justifyContent="end">
        <Avatar size="xl" src={props.instituteLogo} />
      </Flex>
      <VStack flex={2} align="start">
        <Text color={props.grayText}>{props.date}</Text>
        <HStack
          flexDir={["column", "column", "column", "row", "row"]}
          align="start"
          spacing={0}
        >
          <Heading
            color={props.secondaryColor}
            textTransform="uppercase"
            size="md"
          >
            {props.position} -
          </Heading>
          <Text color={props.grayText} fontSize="md">
            {props.institute}
          </Text>
        </HStack>
        <Text color={props.grayText} w={["100%", "100%", "100%", "70%", "70%"]}>
          {props.description}
        </Text>
      </VStack>
    </HStack>
  )
}

export default Experience
