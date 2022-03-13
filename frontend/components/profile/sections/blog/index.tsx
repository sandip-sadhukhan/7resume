import {
  // HStack,
  SimpleGrid,
  // Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
// import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { BlogSectionProps } from "../../../../types/profile"
import SectionHeading from "../../SectionHeading"
import BlogGrid from "./BlogGrid"
// import PaginationButton from "./PaginationButton"

const BlogSection: React.FC<BlogSectionProps> = (props: BlogSectionProps) => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")
  const grayBackground = useColorModeValue("blue.50", "gray.700")

  const username = useRouter().query.username as string

  return (
    <VStack
      align="start"
      pt={[5, 5, 5, 10, 10]}
      px={[5, 5, 5, 16, 16]}
      w="full"
    >
      {/* Heading */}
      <SectionHeading
        secondaryColor={secondaryColor}
        headingColor={headingColor}
        title="Blog"
      />

      <SimpleGrid columns={[1, 1, 1, 3, 3]} py={10} spacing={6} w="full">
        {props.blogs.map((blog) => (
          <BlogGrid
            key={blog.id}
            grayBackground={grayBackground}
            secondaryColor={secondaryColor}
            bannerImg={blog.featured_image}
            link={`/${username}/blog/post/${blog.slug}`}
            viewCount={blog.views}
            title={blog.title}
            date={blog.updated_at}
            category={blog.category_name}
            description={blog.short_description}
          />
        ))}
      </SimpleGrid>

      {/* Pagination */}
      {/* <HStack pb={10} w="full" justifyContent="center" spacing={0}>
        <PaginationButton
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
        >
          <BiChevronLeft />
        </PaginationButton>

        <PaginationButton
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
        >
          <Text>1</Text>
        </PaginationButton>

        <PaginationButton
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
          active
        >
          <Text>2</Text>
        </PaginationButton>

        <PaginationButton
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
        >
          <Text>3</Text>
        </PaginationButton>

        <PaginationButton
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
        >
          <BiChevronRight />
        </PaginationButton>
      </HStack> */}
    </VStack>
  )
}

export default BlogSection
