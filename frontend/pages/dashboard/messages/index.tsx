import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import MessagesSection from "../../../components/dashboard/sections/messages"

const Messages: NextPage = () => {
  return (
    <Layout currentMenu="Messages">
      <MessagesSection />
    </Layout>
  )
}

export default Messages
