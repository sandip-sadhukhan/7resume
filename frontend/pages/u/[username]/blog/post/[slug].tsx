import React from "react"
import Layout from "../../../../../components/profile/Layout"
import SingleBlog from "../../../../../components/profile/sections/blog/SingleBlog"
import { IErrorProps } from "../../../../../types/pages"
import { BlogPostSectionProps, LayoutProps } from "../../../../../types/profile"
import fetchData from "../../../../../utils/fetchData"
import Error from "../../../../error"

interface BlogPostProps {
  error?: IErrorProps
  display_blog: boolean
  layout: LayoutProps
  section: BlogPostSectionProps
}

const BlogPost: React.FC<BlogPostProps> = (props: BlogPostProps) => {
  const { error, display_blog, layout, section } = props

  if (error || !display_blog) {
    return <Error {...error} />
  }

  return (
    <Layout layoutProps={layout}>
      <SingleBlog {...section} />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string; slug: string }
}) => {
  const username = context.params.username as string
  const slug = context.params.slug as string

  const api = `/api/profile/${username}/blog/post/${slug}/`
  const data = await fetchData(api)

  return data
}

export default BlogPost
