import type { NextPage } from "next"
import Layout from "../../../components/profile/Layout"
import Contact from "../../../components/profile/sections/contact"
import { IErrorProps } from "../../../types/pages"
import { LayoutProps, ContactMeSectionProps } from "../../../types/profile"
import fetchData from "../../../utils/fetchData"
import Error from "../../error"

interface ContactMeProps {
  error?: IErrorProps
  layout: LayoutProps
  section: ContactMeSectionProps
}

const ContactMe: NextPage<ContactMeProps> = (props: ContactMeProps) => {
  const { error, layout, section } = props

  if (error) {
    return <Error {...error} />
  }

  return (
    <Layout layoutProps={layout}>
      <Contact {...section} />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string

  const api = `/api/profile/${username}/contact-me/`
  const data = await fetchData(api)

  return data
}

export default ContactMe
