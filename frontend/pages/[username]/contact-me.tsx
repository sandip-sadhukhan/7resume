import type { NextPage } from "next"
import Layout from "../../components/profile/Layout"
import Contact from "../../components/profile/sections/contact"
import { LayoutProps, ContactMeSectionProps } from "../../types/profile"

interface ContactMeProps {
  layout: LayoutProps
  section: ContactMeSectionProps
}

const ContactMe: NextPage<ContactMeProps> = (props: ContactMeProps) => {
  return (
    <Layout layoutProps={props.layout}>
      <Contact {...props.section} />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string
  // Fetch data from API
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/profile/${username}/contact-me/`

  const res = await fetch(url)
  const data = await res.json()

  return {
    props: { ...data.data },
  }
}

export default ContactMe
