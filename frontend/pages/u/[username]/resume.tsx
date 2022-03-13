import type { NextPage } from "next"
import Layout from "../../../components/profile/Layout"
import ResumeSection from "../../../components/profile/sections/resume"
import { ResumeSectionProps, LayoutProps } from "../../../types/profile"
import Error from "../../error"

interface ResumePageProps {
  display_resume: boolean
  layout: LayoutProps
  section: ResumeSectionProps
}

const Resume: NextPage<ResumePageProps> = (props: ResumePageProps) => {
  const { display_resume, layout, section } = props

  return (
    <>
      {display_resume === true ? (
        <Layout layoutProps={layout}>
          <ResumeSection {...section} />
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
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/profile/${username}/resume/`

  const res = await fetch(url)
  const data = await res.json()

  return {
    props: { ...data.data },
  }
}

export default Resume
