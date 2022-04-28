import type { NextPage } from "next"
import Layout from "../../../components/profile/Layout"
import ResumeSection from "../../../components/profile/sections/resume"
import { IErrorProps } from "../../../types/pages"
import { ResumeSectionProps, LayoutProps } from "../../../types/profile"
import fetchData from "../../../utils/fetchData"
import Error from "../../error"

interface ResumePageProps {
  error?: IErrorProps
  display_resume: boolean
  layout: LayoutProps
  section: ResumeSectionProps
}

const Resume: NextPage<ResumePageProps> = (props: ResumePageProps) => {
  const { error, display_resume, layout, section } = props

  if (error || !display_resume) {
    return <Error {...error} />
  }

  return (
    <Layout layoutProps={layout}>
      <ResumeSection {...section} />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string

  const api = `/api/profile/${username}/resume/`
  const data = await fetchData(api)

  return data
}

export default Resume
