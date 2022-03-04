import type { NextPage } from "next"
import Layout from "../../components/profile/Layout"
import AboutSection from "../../components/profile/sections/about"
import { AboutSectionProps, LayoutProps } from "../../types/profile"

interface AboutMeProps {
  layout: LayoutProps
  section: AboutSectionProps
}

const AboutMe: NextPage<AboutMeProps> = (props: AboutMeProps) => {
  return (
    <Layout layoutProps={props.layout}>
      <AboutSection {...props.section} />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string
  // Fetch data from API
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/profile/${username}/about-me/`

  const res = await fetch(url)
  const data = await res.json()

  return {
    props: { ...data.data },
  }
}

export default AboutMe
