import { Flex, HStack, Radio, RadioGroup, Text } from "@chakra-ui/react"
import React from "react"

interface RadioBoxProps {
  name: string
  keyItem: string
  value: boolean
  onChange: (name: string, val: string) => void
}

const RadioBox: React.FC<RadioBoxProps> = (props: RadioBoxProps) => {
  const { name, keyItem, value, onChange } = props

  return (
    <HStack
      align="start"
      fontSize={13}
      flexDir={["column", "column", "row", "row", "row"]}
      gap={3}
      spacing={0}
    >
      <Text w={["full", "full", 200, 250, 300]}>{name}</Text>
      <RadioGroup
        value={value.toString()}
        onChange={(val) => onChange(keyItem, val)}
      >
        <Flex gap={4}>
          <Radio size="sm" value="true" _focus={{ ring: 0 }}>
            Yes
          </Radio>
          <Radio size="sm" value="false" _focus={{ ring: 0 }}>
            No
          </Radio>
        </Flex>
      </RadioGroup>
    </HStack>
  )
}

export default RadioBox
