import type { NextPage } from "next"
import Layout from "../../components/profile/Layout"
import HomeSection from "../../components/profile/sections/home/HomeSection"
import { LayoutProps } from "../../types/profile"

interface UserHomeProps {
  layout: LayoutProps
  section: {
    name: string
    my_positions: string
  }
}

const UserHome: NextPage<UserHomeProps> = (props: UserHomeProps) => {
  const { layout, section } = props

  return (
    <Layout layoutProps={layout}>
      <HomeSection
        name={section.name}
        professionList={section.my_positions.split("\r\n")}
      />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string
  // Fetch data from API
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/profile/${username}/home/`

  const res = await fetch(url)
  const data = await res.json()

  return {
    props: { ...data.data },
  }
}

export default UserHome
