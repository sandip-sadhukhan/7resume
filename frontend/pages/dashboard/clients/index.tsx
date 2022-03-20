import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import ClientsSection from "../../../components/dashboard/sections/clients"

const Clients: NextPage = () => {
  return (
    <Layout currentMenu="Clients">
      <ClientsSection />
    </Layout>
  )
}

export default Clients
