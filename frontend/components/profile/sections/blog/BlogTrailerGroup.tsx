import { Divider, Heading, VStack } from "@chakra-ui/react"
import React from "react"
import { IBlogPostSuggestion } from "../../../../types/profile"
import BlogTrailer from "./BlogTrailer"

interface BlogTrailerGroupProps {
  grayBackground: string
  secondaryColor: string
  title: string
  posts: IBlogPostSuggestion[]
}

const BlogTrailerGroup: React.FC<BlogTrailerGroupProps> = (
  props: BlogTrailerGroupProps
) => {
  const { grayBackground, secondaryColor, title, posts } = props

  return (
    <VStack p={4} bgColor={grayBackground} w="full" align="start" spacing={4}>
      <Heading fontWeight={400} size="md">
        {title}
      </Heading>
      <Divider />
      {posts.map((post) => (
        <BlogTrailer
          key={post.id}
          post={post}
          secondaryColor={secondaryColor}
        />
      ))}
    </VStack>
  )
}

export default BlogTrailerGroup
