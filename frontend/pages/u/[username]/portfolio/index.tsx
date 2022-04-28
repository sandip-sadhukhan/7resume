import type { NextPage } from "next"
import Layout from "../../../../components/profile/Layout"
import PortfolioSection from "../../../../components/profile/sections/portfolio"
import { IErrorProps } from "../../../../types/pages"
import { LayoutProps, PortfolioSectionProps } from "../../../../types/profile"
import fetchData from "../../../../utils/fetchData"
import Error from "../../../error"

interface PortfolioPageProps {
  error?: IErrorProps
  display_portfolio: boolean
  layout: LayoutProps
  section: PortfolioSectionProps
}

const Portfolio: NextPage<PortfolioPageProps> = (props: PortfolioPageProps) => {
  const { error, display_portfolio, layout, section } = props

  if (error || !display_portfolio) {
    return <Error {...error} />
  }

  return (
    <Layout layoutProps={layout}>
      <PortfolioSection {...section} />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string

  const api = `/api/profile/${username}/portfolio/`
  const data = await fetchData(api)

  return data
}

export default Portfolio
