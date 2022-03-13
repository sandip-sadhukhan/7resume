import { Divider, HStack, Image, Text, VStack } from "@chakra-ui/react"
import dayjs from "dayjs"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { IBlogPostSuggestion } from "../../../../types/profile"

interface BlogTrailerProps {
  secondaryColor: string
  post: IBlogPostSuggestion
}

const BlogTrailer: React.FC<BlogTrailerProps> = (props: BlogTrailerProps) => {
  const username = useRouter().query.username as string

  const { secondaryColor, post } = props
  const { title, featured_image, slug, updated_at } = post

  return (
    <VStack>
      <HStack spacing={4} w="full">
        <Link
          href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/u/${username}/blog/post/${slug}`}
        >
          <a>
            <Image
              w={100}
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${featured_image}`}
              alt="blog banner"
            />
          </a>
        </Link>
        <VStack align="start">
          <Link
            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/u/${username}/blog/post/${slug}`}
          >
            <a>
              <Text
                fontSize={16}
                fontWeight={600}
                _hover={{ color: secondaryColor }}
              >
                {title}
              </Text>
            </a>
          </Link>
          <Text fontSize={14} fontWeight={300}>
            {dayjs(updated_at).format("MMM DD, YYYY")}
          </Text>
        </VStack>
      </HStack>
      <Divider />
    </VStack>
  )
}

export default BlogTrailer
