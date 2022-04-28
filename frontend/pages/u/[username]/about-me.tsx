import type { NextPage } from "next"
import Layout from "../../../components/profile/Layout"
import AboutSection from "../../../components/profile/sections/about"
import { IErrorProps } from "../../../types/pages"
import { AboutSectionProps, LayoutProps } from "../../../types/profile"
import fetchData from "../../../utils/fetchData"
import Error from "../../error"

interface AboutMeProps {
  error?: IErrorProps
  layout: LayoutProps
  section: AboutSectionProps
}

const AboutMe: NextPage<AboutMeProps> = (props: AboutMeProps) => {
  const { error, layout, section } = props

  if (error) {
    return <Error status={error.status} description={error.description} />
  }

  return (
    <>
      <Layout layoutProps={layout}>
        <AboutSection {...section} />
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string

  const api = `/api/profile/${username}/about-me/`
  const data = await fetchData(api)

  return data
}

export default AboutMe
