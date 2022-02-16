import type { NextPage } from "next"
import Layout from "../../components/profile/Layout"
import Home from "../../components/profile/pages/Home"

const UserHome: NextPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default UserHome
