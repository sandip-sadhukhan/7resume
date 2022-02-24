import { Flex } from "@chakra-ui/react"
import React from "react"

interface PaginationButtonProps {
  grayBackground: string
  secondaryColor: string
  active?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
}

const PaginationButton: React.FC<PaginationButtonProps> = (
  props: PaginationButtonProps
) => {
  const { children, grayBackground, secondaryColor, active = false } = props

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      cursor={"pointer"}
      w={[8, 8, 10, 12, 14]}
      h={[8, 8, 10, 12, 14]}
      bgColor={active ? secondaryColor : grayBackground}
      _hover={{ color: active ? "white" : secondaryColor }}
    >
      {children}
    </Flex>
  )
}

export default PaginationButton
