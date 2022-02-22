import { HStack, SimpleGrid, useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import SectionHeading from "../../SectionHeading"
import CategoryLink from "./CategoryLink"
import Project from "./Project"

const PortfolioSection: React.FC = () => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")

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
          count={8}
          categoryURL="#"
          active
          secondaryColor={secondaryColor}
          headingColor={headingColor}
        />
        <CategoryLink
          categoryName="Business Logo"
          count={2}
          categoryURL="#"
          secondaryColor={secondaryColor}
          headingColor={headingColor}
        />
        <CategoryLink
          categoryName="Decoration"
          count={2}
          categoryURL="#"
          secondaryColor={secondaryColor}
          headingColor={headingColor}
        />
        <CategoryLink
          categoryName="Websites"
          count={4}
          categoryURL="#"
          secondaryColor={secondaryColor}
          headingColor={headingColor}
        />
      </HStack>

      {/* Projects */}
      <SimpleGrid columns={[1, 1, 1, 2, 2]} w="full" py={10} spacing={8}>
        <Project
          secondaryColor={secondaryColor}
          imageURL="/portfolio-img.jpeg"
          name="Office Decoration"
          category="Websites"
          slug="hello"
        />
        <Project
          secondaryColor={secondaryColor}
          imageURL="/portfolio-img.jpeg"
          name="Office Decoration"
          category="Websites"
          slug="hello"
        />
        <Project
          secondaryColor={secondaryColor}
          imageURL="/portfolio-img.jpeg"
          name="Office Decoration"
          category="Websites"
          slug="hello"
        />
        <Project
          secondaryColor={secondaryColor}
          imageURL="/portfolio-img.jpeg"
          name="Office Decoration"
          category="Websites"
          slug="hello"
        />
        <Project
          secondaryColor={secondaryColor}
          imageURL="/portfolio-img.jpeg"
          name="Office Decoration"
          category="Websites"
          slug="hello"
        />
      </SimpleGrid>
    </VStack>
  )
}

export default PortfolioSection
