import type { NextPage } from "next"
import Layout from "../../../components/profile/Layout"
import SinglePortfolioSection from "../../../components/profile/sections/portfolio/SinglePortfolioSection"

const SinglePortfolio: NextPage = () => {
  return (
    <Layout>
      <SinglePortfolioSection />
    </Layout>
  )
}

export default SinglePortfolio
