import React from "react"
import Layout from "../../../../../components/profile/Layout"
import SearchBlogSection from "../../../../../components/profile/sections/blog/SearchBlogSection"
import { IErrorProps } from "../../../../../types/pages"
import {
  BlogSearchSectionProps,
  LayoutProps,
} from "../../../../../types/profile"
import fetchData from "../../../../../utils/fetchData"
import Error from "../../../../error"

interface BlogPageProps {
  error?: IErrorProps
  display_blog: boolean
  layout: LayoutProps
  section: BlogSearchSectionProps
}

const BlogCategory: React.FC<BlogPageProps> = (props: BlogPageProps) => {
  const { error, display_blog, layout, section } = props

  if (error || !display_blog) {
    return <Error {...error} />
  }

  return (
    <Layout layoutProps={layout}>
      <SearchBlogSection {...section} />
    </Layout>
  )
}

interface ContextProps {
  params: {
    username: string
    query: string
  }
}

export const getServerSideProps = async (context: ContextProps) => {
  const username = context.params.username
  const categoryName = context.params.query

  const api = `/api/profile/${username}/blog/category/${categoryName}`
  const data = await fetchData(api)

  return data
}

export default BlogCategory
