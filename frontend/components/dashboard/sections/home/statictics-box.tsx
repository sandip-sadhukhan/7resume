import { HStack, Progress, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { IconType } from "react-icons/lib"

interface StatisticsBoxProps {
  Icon: IconType
  name: string
  valueCount: number
  progressPercentage: number
  bg: string
}

const StatisticsBox: React.FC<StatisticsBoxProps> = (
  props: StatisticsBoxProps
) => {
  const { Icon, name, valueCount, progressPercentage, bg } = props

  const currencyFormatter = new Intl.NumberFormat("en-IN")

  return (
    <VStack
      px={8}
      pt={6}
      pb={4}
      w="full"
      align="start"
      bgColor={bg}
      spacing={3}
    >
      <HStack
        align="start"
        justifyContent="center"
        alignItems="center"
        spacing={8}
      >
        <Icon fontSize={20} />
        <VStack spacing={-1} align="start">
          <Text
            color="whiteAlpha.800"
            letterSpacing="wider"
            fontSize={10}
            textTransform="uppercase"
          >
            {name}
          </Text>
          <Text fontWeight={400} fontSize={20}>
            {currencyFormatter.format(valueCount)}
          </Text>
        </VStack>
      </HStack>
      <Progress
        w="full"
        colorScheme="whiteAlpha"
        background="blackAlpha"
        size="xs"
        value={progressPercentage}
      />
      <Text
        fontSize={10}
        textTransform="uppercase"
        letterSpacing="wider"
        color="whiteAlpha.800"
      >
        Total {name}
      </Text>
    </VStack>
  )
}

export default StatisticsBox
