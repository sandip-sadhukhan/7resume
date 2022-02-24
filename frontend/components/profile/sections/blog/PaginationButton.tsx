import { Flex, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"

interface PaginationButtonProps {
  grayBackground: string
  secondaryColor: string
  active?: boolean
}

const PaginationButton: React.FC<PaginationButtonProps> = (
  props: PaginationButtonProps
) => {
  const { grayBackground, secondaryColor, active = false } = props

  return (
    <Link href="#">
      <a>
        <Flex
          justifyContent="center"
          alignItems="center"
          w={[8, 8, 10, 12, 14]}
          h={[8, 8, 10, 12, 14]}
          bgColor={active ? secondaryColor : grayBackground}
          _hover={{ color: secondaryColor }}
        >
          {props.children}
        </Flex>
      </a>
    </Link>
  )
}

export default PaginationButton
