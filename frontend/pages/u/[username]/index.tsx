import type { NextPage } from "next"
import fetchData from "../../../utils/fetchData"
import Layout from "../../../components/profile/Layout"
import HomeSection from "../../../components/profile/sections/home/HomeSection"
import { LayoutProps } from "../../../types/profile"
import Error from "../../error"
import { IErrorProps } from "../../../types/pages"

interface UserHomeProps {
  error?: IErrorProps
  layout: LayoutProps
  section: {
    name: string
    my_positions: string
    start_page_background: string
  }
}

const UserHome: NextPage<UserHomeProps> = (props: UserHomeProps) => {
  const { error, layout, section } = props

  if (error) {
    return <Error status={error.status} description={error.description} />
  }

  return (
    <>
      <Layout layoutProps={layout}>
        <HomeSection
          name={section.name}
          professionList={section.my_positions.split("\r\n")}
          startPageBackground={section.start_page_background}
        />
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string

  const api = `/api/profile/${username}/home/`
  const data = await fetchData(api)

  return data
}

export default UserHome
