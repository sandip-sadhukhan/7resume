import type { NextPage } from "next"
import Layout from "../../../components/profile/Layout"
import PortfolioSection from "../../../components/profile/sections/portfolio"

const Portfolio: NextPage = () => {
  return (
    <Layout>
      <PortfolioSection />
    </Layout>
  )
}

export default Portfolio
