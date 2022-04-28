import {
  HStack,
  Progress,
  Skeleton,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import { IconType } from "react-icons/lib"

interface StatisticsBoxProps {
  Icon: IconType
  name: string
  valueCount?: number
  max: number
  bg: string
}

const StatisticsBox: React.FC<StatisticsBoxProps> = (
  props: StatisticsBoxProps
) => {
  const { Icon, name, valueCount, max, bg } = props

  const currencyFormatter = new Intl.NumberFormat("en-IN")

  const progressScheme = useColorModeValue("whiteAlpha", "gray")
  const progressBg = useColorModeValue("blackAlpha", "whiteAlpha")

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
        <Icon fontSize={25} />
        <VStack spacing={1} align="start">
          <Text
            color="whiteAlpha.800"
            letterSpacing="wider"
            fontSize={10}
            textTransform="uppercase"
          >
            {name}
          </Text>
          <Skeleton isLoaded={valueCount !== undefined}>
            <Text fontWeight={400} fontSize={20}>
              {currencyFormatter.format(valueCount as number)}
            </Text>
          </Skeleton>
        </VStack>
      </HStack>
      <Skeleton isLoaded={valueCount !== undefined} w="full">
        <Progress
          w="full"
          colorScheme={progressScheme}
          background={progressBg}
          size="xs"
          value={((valueCount as number) / max) * 100}
        />
      </Skeleton>
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
