import type { NextPage } from "next"
import Layout from "../../../../components/profile/Layout"
import BlogSection from "../../../../components/profile/sections/blog"
import { BlogSectionProps, LayoutProps } from "../../../../types/profile"
import Error from "../../../error"

interface BlogPageProps {
  success: boolean
  display_blog: boolean
  layout: LayoutProps
  section: BlogSectionProps
}

const Blog: NextPage<BlogPageProps> = (props: BlogPageProps) => {
  return (
    <>
      {props.display_blog === true && props.success ? (
        <Layout layoutProps={props.layout}>
          <BlogSection {...props.section} />
        </Layout>
      ) : (
        <Error />
      )}
    </>
  )
}
export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string
  // Fetch data from API
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/profile/${username}/blog/`

  const res = await fetch(url)
  const data = await res.json()

  return {
    props: { ...data.data, success: data.success },
  }
}

export default Blog
