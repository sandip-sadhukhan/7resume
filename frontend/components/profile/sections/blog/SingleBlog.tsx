import { HStack, useColorModeValue, VStack } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { BlogPostSectionProps, BreadcrumbType } from "../../../../types/profile"
import HeadingBreadcrumb from "../portfolio/HeadingBreadcrumb"
import BlogCard from "./BlogCard"
import BlogRightSideBar from "./BlogRightSideBar"

const SingleBlog: React.FC<BlogPostSectionProps> = (
  props: BlogPostSectionProps
) => {
  const router = useRouter()
  const username = router.query.username as string
  const slug = router.query.slug as string
  const absoluteURL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${username}/blog/post/${slug}`

  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const grayBackground = useColorModeValue("blue.50", "gray.700")
  const grayText = useColorModeValue("gray.600", "gray.300")

  const { blog, site_title } = props

  const portfolioBreadCrumbList: BreadcrumbType[] = [
    {
      text: "Blog",
      link: `/${username}/blog`,
    },
    {
      text: blog.category_name,
      link: `/${username}/blog/category/${blog.category_name}`,
    },
    {
      text: blog.title,
      link: `/${username}/blog/post/${blog.slug}`,
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
      {/* SEO */}
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.meta_description} />
        <meta property="og:site_name" content={site_title} />
        <meta property="article:published_time" content={blog.updated_at} />
        <meta property="article:author" content={blog.author} />

        <meta property="og:url" content={absoluteURL} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_API_URL}${blog.featured_image}`}
        />
      </Head>

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
        {/* Blog main */}
        <BlogCard
          grayBackground={grayBackground}
          grayText={grayText}
          secondaryColor={secondaryColor}
          blog={blog}
          absoluteURL={absoluteURL}
        />

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

export default SingleBlog
