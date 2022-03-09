import { Button, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"
import dayjs from "dayjs"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { AiOutlineEye } from "react-icons/ai"
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa"
import { FiBook, FiUser } from "react-icons/fi"
import { GiBackwardTime } from "react-icons/gi"
import { BlogPostType } from "../../../../types/profile"
import TagGroup from "./TagGroup"

interface BlogCardProps {
  grayText: string
  secondaryColor: string
  grayBackground: string
  blog: BlogPostType
}

const BlogCard: React.FC<BlogCardProps> = (props: BlogCardProps) => {
  const router = useRouter()
  const { asPath } = router
  const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL

  const { grayText, secondaryColor, grayBackground, blog } = props

  return (
    <VStack as="main" shadow="lg" flex={7} align="start" borderRadius={5}>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.meta_description} />
      </Head>
      <Image
        w="full"
        src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${blog.featured_image}`}
        alt="Blog Img"
      />
      <VStack w="full" align="start" px={[2, 2, 2, 8, 10]} py={4}>
        {/* Title and info */}
        <VStack align="start" color={grayText}>
          <Heading as="h1" size="md" pb={2}>
            {blog.title}
          </Heading>
          <HStack
            spacing={[1, 1, 1, 5, 5]}
            flexDir={["column", "column", "column", "row", "row"]}
            gap={2}
            align="start"
          >
            <HStack>
              <FiUser />
              <Text fontSize={15}>{blog.author}</Text>
            </HStack>
            <HStack>
              <GiBackwardTime />
              <Text fontSize={15}>
                {dayjs(blog.updated_at).format("MMM DD, YYYY")}
              </Text>
            </HStack>
            <Link href="#">
              <a>
                <HStack _hover={{ color: secondaryColor }}>
                  <FiBook />
                  <Text fontSize={15}>{blog.category_name}</Text>
                </HStack>
              </a>
            </Link>
            <HStack>
              <AiOutlineEye />
              <Text fontSize={15}>{blog.views}</Text>
            </HStack>
          </HStack>
        </VStack>
        {/* Content */}
        <VStack pt={4}>
          <Text textAlign="justify" whiteSpace="pre-wrap">
            {blog.description}
          </Text>
        </VStack>
        {/* tags */}
        <VStack pt={3} w="full" align="start">
          <Heading fontWeight={700} as="h5" size="sm" pb={2}>
            Tags
          </Heading>
          <TagGroup bg={grayBackground} tags={blog.tags} />
        </VStack>
        {/* Social Share */}
        <HStack py={6} spacing={3}>
          <Button
            as="a"
            href="#"
            target="_blank"
            rounded="full"
            size="sm"
            px={4}
            variant="outline"
            colorScheme="blue"
          >
            <a
              href={`http://www.facebook.com/share.php?u=${encodeURIComponent(
                frontendURL + asPath
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <HStack spacing={1}>
                <FaFacebookF />
                <Text>Share</Text>
              </HStack>
            </a>
          </Button>
          <Button
            as="a"
            href="#"
            target="_blank"
            rounded="full"
            size="sm"
            px={4}
            variant="outline"
            colorScheme="cyan"
          >
            <a
              href={`http://twitter.com/intent/tweet?status=${encodeURIComponent(
                frontendURL + asPath
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <HStack spacing={1}>
                <FaTwitter />
                <Text>Tweet</Text>
              </HStack>
            </a>
          </Button>
          <Button
            as="a"
            href="#"
            target="_blank"
            rounded="full"
            size="sm"
            px={4}
            variant="outline"
            colorScheme="red"
          >
            <a
              href={`https://pinterest.com/pin/create/bookmarklet/?url={${
                frontendURL + asPath
              }}`}
              target="_blank"
              rel="noreferrer"
            >
              <HStack spacing={1}>
                <FaPinterestP />
                <Text>Pin</Text>
              </HStack>
            </a>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default BlogCard
