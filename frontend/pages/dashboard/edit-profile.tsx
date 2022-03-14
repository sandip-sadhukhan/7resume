import React from "react"
import Layout from "../../components/dashboard/layout"
import EditProfileSection from "../../components/dashboard/sections/edit-profile"

const EditProfile = () => {
  return (
    <Layout currentMenu="Administrator Profile">
      <EditProfileSection />
    </Layout>
  )
}

export default EditProfile
