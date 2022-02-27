import { Divider, Heading, VStack } from "@chakra-ui/react"
import React from "react"
import BlogTrailer from "./BlogTrailer"

interface BlogTrailerGroupProps {
  grayBackground: string
  secondaryColor: string
  title: string
}

const BlogTrailerGroup: React.FC<BlogTrailerGroupProps> = (
  props: BlogTrailerGroupProps
) => {
  const { grayBackground, secondaryColor, title } = props

  return (
    <VStack p={4} bgColor={grayBackground} w="full" align="start" spacing={4}>
      <Heading fontWeight={400} size="md">
        {title}
      </Heading>
      <Divider />
      <BlogTrailer secondaryColor={secondaryColor} />
      <BlogTrailer secondaryColor={secondaryColor} />
      <BlogTrailer secondaryColor={secondaryColor} />
      <BlogTrailer secondaryColor={secondaryColor} />
    </VStack>
  )
}

export default BlogTrailerGroup
