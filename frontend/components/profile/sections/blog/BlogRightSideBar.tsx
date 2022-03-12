import { Divider, Heading, useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import {
  IBlogPostSuggestion,
  PortfolioCategoryType,
  TagType,
} from "../../../../types/profile"
import BlogTrailerGroup from "./BlogTrailerGroup"
import CategoryListItem from "./CategoryListItem"
import SearchBox from "./SearchBox"
import TagGroup from "./TagGroup"

interface BlogRightSideBarProps {
  grayText: string
  grayBackground: string
  secondaryColor: string
  related_posts: IBlogPostSuggestion[]
  all_categories: PortfolioCategoryType[]
  latest_posts: IBlogPostSuggestion[]
  tag_cloud: TagType[]
}

const BlogRightSideBar: React.FC<BlogRightSideBarProps> = (
  props: BlogRightSideBarProps
) => {
  const {
    grayText,
    grayBackground,
    secondaryColor,
    all_categories,
    latest_posts,
    related_posts,
    tag_cloud,
  } = props
  const whiteBackground = useColorModeValue("white", "gray.600")

  return (
    <VStack
      as="aside"
      flex={[1, 1, 1, 3, 3]}
      align="start"
      spacing={10}
      w="full"
    >
      {/* Search Blog */}
      <SearchBox grayText={grayText} secondaryColor={secondaryColor} />

      {/* Related Post */}
      <BlogTrailerGroup
        grayBackground={grayBackground}
        secondaryColor={secondaryColor}
        title="Related Posts"
        posts={related_posts}
      />

      {/* All Categories */}
      <VStack p={4} bgColor={grayBackground} w="full" align="start" spacing={4}>
        <Heading fontWeight={400} size="md">
          All Categories
        </Heading>
        <Divider />
        <VStack w="full" align="start">
          {all_categories.map((category, index) => (
            <CategoryListItem
              key={index}
              secondaryColor={secondaryColor}
              grayText={grayText}
              categoryName={category.name}
              categoryCount={category.count}
            />
          ))}
        </VStack>
      </VStack>

      {/* Latest Post */}
      <BlogTrailerGroup
        grayBackground={grayBackground}
        secondaryColor={secondaryColor}
        title="Latest Posts"
        posts={latest_posts}
      />

      {/* Tag Cloud */}
      <VStack p={4} bgColor={grayBackground} w="full" align="start" spacing={4}>
        <Heading fontWeight={400} size="md">
          Tag Cloud
        </Heading>
        <Divider />
        <TagGroup bg={whiteBackground} tags={tag_cloud} />
      </VStack>
    </VStack>
  )
}

export default BlogRightSideBar
