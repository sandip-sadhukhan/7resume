import { NextPage } from "next"
import React from "react"
import Layout from "../../components/dashboard/layout"
import Home from "../../components/dashboard/sections/home"

const DashboardHome: NextPage = () => {
  return (
    <Layout currentMenu="Dashboard">
      <Home />
    </Layout>
  )
}

export default DashboardHome
