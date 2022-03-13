import { HStack, SimpleGrid, useColorModeValue, VStack } from "@chakra-ui/react"
import dayjs from "dayjs"
import { useRouter } from "next/router"
import React from "react"
import {
  BlogSearchSectionProps,
  BreadcrumbType,
} from "../../../../types/profile"
import HeadingBreadcrumb from "../portfolio/HeadingBreadcrumb"
import BlogGrid from "./BlogGrid"
import BlogRightSideBar from "./BlogRightSideBar"

const SearchBlogSection: React.FC<BlogSearchSectionProps> = (
  props: BlogSearchSectionProps
) => {
  const router = useRouter()
  const username = router.query.username as string
  const query = router.query.query as string

  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const grayBackground = useColorModeValue("blue.50", "gray.700")
  const grayText = useColorModeValue("gray.600", "gray.300")

  const portfolioBreadCrumbList: BreadcrumbType[] = [
    {
      text: "Blog",
      link: `/u/${username}/blog`,
    },
    {
      text: query,
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
        homePageLink={`/u/${username}`}
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
          {props.blogs.map((blog) => (
            <BlogGrid
              key={blog.id}
              grayBackground={grayBackground}
              secondaryColor={secondaryColor}
              bannerImg={blog.featured_image}
              link={`/u/${username}/blog/post/${blog.slug}`}
              viewCount={blog.views}
              title={blog.title}
              date={dayjs(blog.updated_at).format("MMM DD, YYYY")}
              category={blog.category_name}
              description={blog.short_description}
            />
          ))}
        </SimpleGrid>

        {/* Sidebar */}
        <BlogRightSideBar
          grayBackground={grayBackground}
          grayText={grayText}
          secondaryColor={secondaryColor}
          all_categories={props.all_categories}
          latest_posts={props.latest_posts}
          related_posts={[]}
          tag_cloud={props.tag_cloud}
          query={query}
        />
      </HStack>
    </VStack>
  )
}

export default SearchBlogSection
