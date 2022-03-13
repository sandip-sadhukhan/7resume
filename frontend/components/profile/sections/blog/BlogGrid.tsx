import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { BsArrowRight } from "react-icons/bs"
import { FaEye } from "react-icons/fa"

interface BlogGridProps {
  grayBackground: string
  secondaryColor: string
  bannerImg: string
  link: string
  viewCount: number
  title: string
  date: string
  category: string
  description: string
}

const BlogGrid: React.FC<BlogGridProps> = (props: BlogGridProps) => {
  const {
    grayBackground,
    secondaryColor,
    bannerImg,
    link,
    viewCount,
    title,
    date,
    category,
    description,
  } = props

  const username = useRouter().query.username as string

  return (
    <VStack shadow="lg" bgColor={grayBackground} w="full">
      <Link href={link}>
        <a>
          <Flex
            flexDir="column"
            pos="relative"
            alignItems="center"
            justifyContent="center"
          >
            <HStack
              pos="absolute"
              px={4}
              py={2}
              top={5}
              right={4}
              bgColor={secondaryColor}
              color="white"
            >
              <FaEye />
              <Text>{viewCount}</Text>
            </HStack>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${bannerImg}`}
              alt={title}
            />
            <IconButton
              w={10}
              bgColor="white"
              color="black"
              _hover={{ backgroundColor: secondaryColor, color: "white" }}
              aria-label="Arrow"
              icon={<BsArrowRight />}
              zIndex={10}
              rounded="full"
              mt={-4}
            />
          </Flex>
        </a>
      </Link>
      <VStack flex={1} pt={3} pb={6} px={[3, 5, 5, 10, 10]}>
        <Heading as="h6" size="sm">
          {title}
        </Heading>
        <Text fontSize={12}>
          {dayjs(date).format("MMM DD, YYYY")} - In{" "}
          <Link
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/u/${username}/blog/category/${category}`}
          >
            <a>{category}</a>
          </Link>
        </Text>
        <Text fontSize={14} pt={2} style={{ textAlign: "center" }}>
          {description}
        </Text>
      </VStack>
    </VStack>
  )
}

export default BlogGrid
