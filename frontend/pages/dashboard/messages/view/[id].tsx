import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import ViewMessageSection from "../../../../components/dashboard/sections/messages/view-message"

const ViewMessage: NextPage = () => {
  return (
    <Layout currentMenu="Message">
      <ViewMessageSection />
    </Layout>
  )
}

export default ViewMessage
