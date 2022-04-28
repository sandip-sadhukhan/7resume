import type { NextPage } from "next"
import Layout from "../../../../components/profile/Layout"
import BlogSection from "../../../../components/profile/sections/blog"
import { IErrorProps } from "../../../../types/pages"
import { BlogSectionProps, LayoutProps } from "../../../../types/profile"
import fetchData from "../../../../utils/fetchData"
import Error from "../../../error"

interface BlogPageProps {
  error?: IErrorProps
  display_blog: boolean
  layout: LayoutProps
  section: BlogSectionProps
}

const Blog: NextPage<BlogPageProps> = (props: BlogPageProps) => {
  const { error, display_blog, layout, section } = props

  if (error || !display_blog) {
    return <Error {...error} />
  }

  return (
    <Layout layoutProps={layout}>
      <BlogSection {...section} />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string

  const api = `/api/profile/${username}/blog/`
  const data = await fetchData(api)

  return data
}

export default Blog
