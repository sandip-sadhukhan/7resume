import { SimpleGrid } from "@chakra-ui/react"
import React from "react"
import SkillBox from "./SkillBox"
import { SkillCategoryType } from "../../../../types/profile"

interface SkillSectionProps {
  grayBackground: string
  grayText: string
  skills_categories: SkillCategoryType[]
}

const SkillSection: React.FC<SkillSectionProps> = (
  props: SkillSectionProps
) => {
  const { grayBackground, grayText, skills_categories } = props

  return (
    <SimpleGrid
      w="full"
      spacing={[0, 0, 0, 4, 4]}
      gap={4}
      pb={10}
      columns={[1, 1, 1, 2, 2]}
    >
      {skills_categories.map((skill_category, index) => (
        <SkillBox
          key={index}
          grayBackground={grayBackground}
          grayText={grayText}
          title={skill_category.category}
          skills={skill_category.skills}
        />
      ))}
    </SimpleGrid>
  )
}

export default SkillSection
