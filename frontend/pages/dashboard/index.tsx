import { NextPage } from "next"
import React from "react"
import Layout from "../../components/dashboard/layout"
import Home from "../../components/dashboard/sections/home"
import IsAuth from "../../components/hocs/is-auth"

// interface DashboardHomeProps {

// }

const DashboardHome: NextPage = () => {
  return (
    <IsAuth>
      <Layout currentMenu="Dashboard">
        <Home />
      </Layout>
    </IsAuth>
  )
}

export default DashboardHome
