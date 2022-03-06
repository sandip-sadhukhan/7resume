import { HStack, SimpleGrid, useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import { PortfolioSectionProps } from "../../../../types/profile"
import SectionHeading from "../../SectionHeading"
import CategoryLink from "./CategoryLink"
import Project from "./Project"

const PortfolioSection: React.FC<PortfolioSectionProps> = (
  props: PortfolioSectionProps
) => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")

  const { categories, portfolios } = props

  return (
    <VStack
      align="start"
      justifyContent="center"
      pt={[5, 5, 5, 10, 10]}
      px={[5, 5, 5, 16, 16]}
      w={["95%", "95%", "95%", "full", "full"]}
    >
      {/* Heading */}
      <SectionHeading
        secondaryColor={secondaryColor}
        headingColor={headingColor}
        title="Portfolio"
      />

      {/* Categories */}
      <HStack
        w="full"
        justifyContent="center"
        pt={6}
        spacing={[0, 0, 0, 4, 8]}
        gap={3}
        flexDir={["column", "column", "column", "row", "row"]}
      >
        <CategoryLink
          categoryName="All"
          count={portfolios.length}
          categoryURL="#"
          secondaryColor={secondaryColor}
          headingColor={headingColor}
          active
        />
        {categories.map((category, index) => (
          <CategoryLink
            key={index}
            categoryName={category.name}
            count={category.count}
            categoryURL="#"
            secondaryColor={secondaryColor}
            headingColor={headingColor}
          />
        ))}
      </HStack>

      {/* Projects */}
      <SimpleGrid columns={[1, 1, 1, 2, 2]} w="full" py={10} spacing={8}>
        {portfolios.map((portfolio) => (
          <Project
            key={portfolio.id}
            secondaryColor={secondaryColor}
            imageURL={portfolio.featured_image_path}
            name={portfolio.title}
            category={portfolio.category_name}
            slug={portfolio.slug}
          />
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default PortfolioSection
