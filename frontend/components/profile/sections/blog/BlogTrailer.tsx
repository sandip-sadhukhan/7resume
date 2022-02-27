import { Divider, HStack, Image, Text, VStack } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"

interface BlogTrailerProps {
  secondaryColor: string
}

const BlogTrailer: React.FC<BlogTrailerProps> = (props: BlogTrailerProps) => {
  const { secondaryColor } = props

  return (
    <VStack>
      <HStack spacing={4} w="full">
        <Link href="#">
          <a>
            <Image w={100} src="/blog-img.jpg" alt="blog banner" />
          </a>
        </Link>
        <VStack align="start">
          <Link href="#">
            <a>
              <Text
                fontSize={16}
                fontWeight={600}
                _hover={{ color: secondaryColor }}
              >
                Recent trends in story
              </Text>
            </a>
          </Link>
          <Text fontSize={14} fontWeight={300}>
            Mar 10, 2019
          </Text>
        </VStack>
      </HStack>
      <Divider />
    </VStack>
  )
}

export default BlogTrailer
