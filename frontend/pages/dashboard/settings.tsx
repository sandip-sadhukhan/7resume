import React from "react"
import Layout from "../../components/dashboard/layout"
import SettingsSection from "../../components/dashboard/sections/settings"

const EditProfile = () => {
  return (
    <Layout currentMenu="Settings">
      <SettingsSection />
    </Layout>
  )
}

export default EditProfile
