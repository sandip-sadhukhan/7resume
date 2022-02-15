import { Flex, IconButton, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { IconType } from "react-icons"

interface Props {
  title: string
  link: string
  hoverColor: string
  secondaryColor: string
  NavIcon: IconType
  active?: boolean
}

const NavItem = ({
  title,
  link,
  hoverColor,
  NavIcon,
  secondaryColor,
  active,
}: Props) => {
  return (
    <Link href={link}>
      <a>
        <Flex
          _hover={{ bgColor: hoverColor }}
          pl={5}
          py={2}
          borderLeftRadius="full"
          alignItems="center"
          transition="0.2s all"
          bgColor={active === true ? hoverColor : "transparent"}
        >
          <IconButton
            bgColor={secondaryColor}
            icon={<NavIcon fontSize={15} />}
            color="white"
            borderRadius="full"
            size="sm"
            aria-label={title}
            _hover={{ bgColor: secondaryColor }}
          />
          <Text ml={2}>{title}</Text>
        </Flex>
      </a>
    </Link>
  )
}

export default NavItem
