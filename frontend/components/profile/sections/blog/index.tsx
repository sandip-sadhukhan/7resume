import {
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import SectionHeading from "../../SectionHeading"
import BlogGrid from "./BlogGrid"
import PaginationButton from "./PaginationButton"

const BlogSection = () => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")
  const grayBackground = useColorModeValue("blue.50", "gray.700")

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
        <BlogGrid
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
          bannerImg="/blog-img.jpg"
          viewCount={122}
          title="Transitions in Design"
          date="Mar 10, 2019"
          category="Tutorial"
          categoryLink="#"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, error!"
        />
        <BlogGrid
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
          bannerImg="/blog-img.jpg"
          viewCount={122}
          title="Transitions in Design"
          date="Mar 10, 2019"
          category="Tutorial"
          categoryLink="#"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, error!"
        />
        <BlogGrid
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
          bannerImg="/blog-img.jpg"
          viewCount={122}
          title="Transitions in Design"
          date="Mar 10, 2019"
          category="Tutorial"
          categoryLink="#"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, error!"
        />
        <BlogGrid
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
          bannerImg="/blog-img.jpg"
          viewCount={122}
          title="Transitions in Design"
          date="Mar 10, 2019"
          category="Tutorial"
          categoryLink="#"
          description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, error!"
        />
      </SimpleGrid>

      {/* Pagination */}
      <HStack pb={10} w="full" justifyContent="center" spacing={0}>
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
      </HStack>
    </VStack>
  )
}

export default BlogSection
