import { HStack, SimpleGrid, useColorModeValue, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { BreadcrumbType } from "../../../../types/profile"
import HeadingBreadcrumb from "../portfolio/HeadingBreadcrumb"
import BlogGrid from "./BlogGrid"
import BlogRightSideBar from "./BlogRightSideBar"

const SearchBlogSection = () => {
  const router = useRouter()
  const username = router.query.username as string

  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const grayBackground = useColorModeValue("blue.50", "gray.700")
  const grayText = useColorModeValue("gray.600", "gray.300")

  const portfolioBreadCrumbList: BreadcrumbType[] = [
    {
      text: "Blog",
      link: `/${username}/blog`,
    },
    {
      text: "Development",
      link: `/${username}/blog/category/development`,
    },
  ]

  return (
    <VStack
      align="start"
      justifyContent="center"
      pt={[5, 5, 5, 10, 10]}
      px={[3, 5, 5, 16, 16]}
      w="full"
    >
      {/* Heading & Breadcrumb */}
      <HeadingBreadcrumb
        grayBackground={grayBackground}
        homePageLink={`/${username}`}
        breadcrumbList={portfolioBreadCrumbList}
        title="Blog"
      />

      <HStack
        py={[5, 5, 5, 8, 10]}
        w="full"
        spacing={[0, 0, 0, 6, 6]}
        align="start"
        flexDir={["column", "column", "column", "row", "row"]}
        gap={10}
      >
        {/* Blogs Grids */}
        <SimpleGrid columns={[1, 1, 1, 2, 2]} py={10} spacing={6} flex={7}>
          <BlogGrid
            grayBackground={grayBackground}
            secondaryColor={secondaryColor}
            bannerImg="/blog-img.jpg"
            link={`/${username}/blog/post/hello`}
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
            link={`/${username}/blog/post/hello`}
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
            link={`/${username}/blog/post/hello`}
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
            link={`/${username}/blog/post/hello`}
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
            link={`/${username}/blog/post/hello`}
            viewCount={122}
            title="Transitions in Design"
            date="Mar 10, 2019"
            category="Tutorial"
            categoryLink="#"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, error!"
          />
        </SimpleGrid>

        {/* Sidebar */}
        <BlogRightSideBar
          grayBackground={grayBackground}
          grayText={grayText}
          secondaryColor={secondaryColor}
        />
      </HStack>
    </VStack>
  )
}

export default SearchBlogSection
