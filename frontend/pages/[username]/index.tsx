import type { NextPage } from "next"
import Layout from "../../components/profile/Layout"
import HomeSection from "../../components/profile/sections/home/HomeSection"

const UserHome: NextPage = () => {
  const name = "Sandip Sadhukhan"
  const professionList = ["Developer", "Programmer", "Engineer"]

  return (
    <Layout>
      <HomeSection name={name} professionList={professionList} />
    </Layout>
  )
}

export default UserHome
