import {
  HStack,
  IconButton,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { BsSun } from "react-icons/bs"
import { FaBars, FaHome } from "react-icons/fa"
import { MdDarkMode } from "react-icons/md"

interface HeaderMenuProps {
  currentMenu: string
  onOpen: () => void
}

const HeaderMenu: React.FC<HeaderMenuProps> = (props: HeaderMenuProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue("gray", "whiteAlpha.800")

  return (
    <HStack
      as="nav"
      bgColor={bgColor}
      color={textColor}
      shadow="sm"
      px={[2, 2, 3, 6, 6]}
      w="full"
      py={6}
      align="start"
      spacing={[2, 2, 2, 3, 3]}
      fontSize={14}
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
    >
      <HStack align="start" justifyContent="start" alignItems="center">
        <IconButton
          aria-label="toogle-menu"
          bgColor="transparent"
          onClick={props.onOpen}
          icon={<FaBars cursor="pointer" color="gray" />}
          display={[
            "inline-flex",
            "inline-flex",
            "inline-flex",
            "none",
            "none",
          ]}
        />
        <Link href="/dashboard">
          <a>
            <HStack cursor="pointer" ps={[0, 0, 0, 2, 2]} spacing={1}>
              <FaHome />
              <Text>Home</Text>
            </HStack>
          </a>
        </Link>
        <Text>/</Text>
        <Text fontWeight={500}>{props.currentMenu}</Text>
      </HStack>
      <HStack>
        <BsSun fontSize={18} />
        <Switch
          colorScheme="black"
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
          ring={0}
          _selected={{ ring: 0 }}
          _focus={{ ring: 0 }}
        />
        <MdDarkMode fontSize={18} />
      </HStack>
    </HStack>
  )
}

export default HeaderMenu
