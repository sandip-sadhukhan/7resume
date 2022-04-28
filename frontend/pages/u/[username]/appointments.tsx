import type { NextPage } from "next"
import Layout from "../../../components/profile/Layout"
import AppointmentSection from "../../../components/profile/sections/appointments"
import { IErrorProps } from "../../../types/pages"
import { AppointmentSectionProps, LayoutProps } from "../../../types/profile"
import fetchData from "../../../utils/fetchData"
import Error from "../../error"

interface AppointmentsProps {
  error?: IErrorProps
  layout: LayoutProps
  section: AppointmentSectionProps
}

const Appointments: NextPage<AppointmentsProps> = (
  props: AppointmentsProps
) => {
  const { error, layout, section } = props

  if (error) {
    return <Error {...error} />
  }

  return (
    <Layout layoutProps={layout}>
      <AppointmentSection {...section} />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string

  const api = `/api/profile/${username}/appointments/`
  const data = await fetchData(api)

  return data
}

export default Appointments
