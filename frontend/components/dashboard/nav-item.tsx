import { HStack, Text, VStack } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { IconType } from "react-icons"

interface NavItemProps {
  Icon: IconType
  text: string
  link: string
}

const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  const { Icon, text, link } = props

  return (
    <VStack ps={12} w="full" align="start">
      <Link href={link}>
        <a>
          <HStack
            align="start"
            w="full"
            alignItems="center"
            spacing={3}
            _hover={{ color: "white" }}
          >
            <Icon />
            <Text _hover={{ color: "white" }} color="whiteAlpha.700">
              {text}
            </Text>
          </HStack>
        </a>
      </Link>
    </VStack>
  )
}

export default NavItem
