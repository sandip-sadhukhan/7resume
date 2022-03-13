import React from "react"
import Layout from "../../../../../components/profile/Layout"
import SingleBlog from "../../../../../components/profile/sections/blog/SingleBlog"
import { BlogPostSectionProps, LayoutProps } from "../../../../../types/profile"
import Error from "../../../../error"

interface BlogPostProps {
  display_blog: boolean
  layout: LayoutProps
  section: BlogPostSectionProps
}

const BlogPost: React.FC<BlogPostProps> = (props: BlogPostProps) => {
  return (
    <>
      {props.display_blog === true ? (
        <Layout layoutProps={props.layout}>
          <SingleBlog {...props.section} />
        </Layout>
      ) : (
        <Error />
      )}
    </>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string; slug: string }
}) => {
  const username = context.params.username as string
  const slug = context.params.slug as string
  // Fetch data from API
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/profile/${username}/blog/post/${slug}/`

  const res = await fetch(url)
  const data = await res.json()

  return {
    props: { ...data.data },
  }
}

export default BlogPost
