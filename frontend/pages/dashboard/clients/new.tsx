import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import NewClientSection from "../../../components/dashboard/sections/clients/new-clients"

const NewClients: NextPage = () => {
  return (
    <Layout currentMenu="Clients">
      <NewClientSection />
    </Layout>
  )
}

export default NewClients
