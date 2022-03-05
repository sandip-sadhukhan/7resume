import {
  Avatar,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import dayjs from "dayjs"

interface ExperienceProps {
  grayBackground: string
  grayText: string
  secondaryColor: string
  date_from: string
  date_to: string | null
  is_current: boolean
  position: string
  institute: string
  instituteLogo: string
  description: string
}

const Experience: React.FC<ExperienceProps> = (props: ExperienceProps) => {
  const date_from = dayjs(props.date_from).format("D MMM, YYYY")

  let date_to: string | null = null
  if (props.date_to !== null) {
    date_to = dayjs(props.date_to).format("D MMM, YYYY")
  }

  return (
    <Center w="full">
      <HStack
        w="full"
        spacing={[0, 0, 0, 8, 10]}
        bgColor={props.grayBackground}
        py={10}
        px={10}
        flexDir={["column", "column", "column", "row", "row"]}
        gap={4}
      >
        <Flex justifyContent="end">
          <Avatar
            size="xl"
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${props.instituteLogo}`}
          />
        </Flex>
        <VStack align="start">
          <Text color={props.grayText}>
            {date_from} - {props.is_current ? "Current" : date_to}
          </Text>
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
          <Text
            color={props.grayText}
            w={["100%", "100%", "100%", "70%", "70%"]}
          >
            {props.description}
          </Text>
        </VStack>
      </HStack>
    </Center>
  )
}

export default Experience
