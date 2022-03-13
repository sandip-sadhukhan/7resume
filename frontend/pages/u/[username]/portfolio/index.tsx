import type { NextPage } from "next"
import Layout from "../../../../components/profile/Layout"
import PortfolioSection from "../../../../components/profile/sections/portfolio"
import { LayoutProps, PortfolioSectionProps } from "../../../../types/profile"
import Error from "../../../error"

interface PortfolioPageProps {
  success: boolean
  display_portfolio: boolean
  layout: LayoutProps
  section: PortfolioSectionProps
}

const Portfolio: NextPage<PortfolioPageProps> = (props: PortfolioPageProps) => {
  return (
    <>
      {props.display_portfolio === true && props.success ? (
        <Layout layoutProps={props.layout}>
          <PortfolioSection {...props.section} />
        </Layout>
      ) : (
        <Error />
      )}
    </>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string
  // Fetch data from API
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/profile/${username}/portfolio/`

  const res = await fetch(url)
  const data = await res.json()

  return {
    props: { ...data.data, success: data.success },
  }
}

export default Portfolio
