import { HStack, IconButton, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { FaBars, FaHome } from "react-icons/fa"

interface HeaderMenuProps {
  currentMenu: string
  onOpen: () => void
}

const HeaderMenu: React.FC<HeaderMenuProps> = (props: HeaderMenuProps) => {
  return (
    <HStack
      as="nav"
      bgColor="white"
      shadow="sm"
      px={[2, 2, 3, 6, 6]}
      w="full"
      h="80px"
      align="start"
      justifyContent="start"
      alignItems="center"
      spacing={[2, 2, 2, 3, 3]}
      fontSize={14}
    >
      <IconButton
        aria-label="toogle-menu"
        bgColor="transparent"
        onClick={props.onOpen}
        icon={<FaBars cursor="pointer" color="gray" />}
        display={["inline-flex", "inline-flex", "inline-flex", "none", "none"]}
      />
      <Link href="/dashboard">
        <a>
          <HStack
            cursor="pointer"
            ps={[0, 0, 0, 2, 2]}
            color="gray"
            spacing={1}
          >
            <FaHome />
            <Text>Home</Text>
          </HStack>
        </a>
      </Link>
      <Text color="gray">/</Text>
      <Text fontWeight={500} color="gray.700">
        {props.currentMenu}
      </Text>
    </HStack>
  )
}

export default HeaderMenu
