import { Flex, HStack, Link, Text, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { IconType } from "react-icons"
import { IoMdArrowDropdown } from "react-icons/io"

interface NavItemProps {
  Icon: IconType
  text: string
  link: string
  children?: JSX.Element
}

const NavItem: React.FC<NavItemProps> = (props: NavItemProps) => {
  const { Icon, text, link, children } = props

  const pathname = useRouter().pathname

  let current: boolean = pathname.startsWith(link)

  if (link === "/dashboard") {
    current = pathname === link
  }

  // dropdown
  const [dropdown, setDropdown] = useState(false)

  return (
    <>
      {children ? (
        <>
          <HStack
            ps={12}
            py={2}
            w="full"
            align="start"
            cursor="pointer"
            role="group"
            onClick={() => setDropdown((dropdown) => !dropdown)}
          >
            <Flex flex={1}>
              <HStack
                align="start"
                w="full"
                alignItems="center"
                spacing={3}
                _groupHover={{ color: "white" }}
              >
                <Icon color={current ? "white" : "whiteAlpha.700"} />
                <Text
                  _groupHover={{ color: "white" }}
                  color={current ? "white" : "whiteAlpha.700"}
                >
                  {text}
                </Text>
              </HStack>
            </Flex>
            <Flex pe={10}>
              <IoMdArrowDropdown fontSize={18} />
            </Flex>
          </HStack>
          <VStack w="full" ps={10} display={dropdown ? "flex" : "none"}>
            {children}
          </VStack>
        </>
      ) : (
        <NextLink href={link} passHref>
          <VStack
            as={Link}
            ps={12}
            py={2}
            w="full"
            align="start"
            role="group"
            cursor="pointer"
            _hover={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
          >
            <HStack
              align="start"
              w="full"
              alignItems="center"
              spacing={3}
              _groupHover={{ color: "white" }}
            >
              <Icon color={current ? "white" : "whiteAlpha.700"} />
              <Text
                _groupHover={{ color: "white" }}
                color={current ? "white" : "whiteAlpha.700"}
              >
                {text}
              </Text>
            </HStack>
          </VStack>
        </NextLink>
      )}
    </>
  )
}

export default NavItem
