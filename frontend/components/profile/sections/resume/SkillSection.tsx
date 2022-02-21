import { HStack } from "@chakra-ui/react"
import React from "react"
import SkillBox from "./SkillBox"
import { SkillType } from "../../../../types/profile"

interface SkillSectionProps {
  grayBackground: string
  grayText: string
}

const SkillSection: React.FC<SkillSectionProps> = (
  props: SkillSectionProps
) => {
  const { grayBackground, grayText } = props

  const workSkills: SkillType[] = [
    {
      name: "PHP",
      value: 95,
    },
    {
      name: "Java",
      value: 85,
    },
    {
      name: "C#",
      value: 75,
    },
    {
      name: "C++",
      value: 70,
    },
  ]

  const languageSkills: SkillType[] = [
    {
      name: "English",
      value: 95,
    },
    {
      name: "Italy",
      value: 90,
    },
    {
      name: "Turky",
      value: 85,
    },
    {
      name: "Arabic",
      value: 80,
    },
  ]

  return (
    <HStack
      w="full"
      spacing={[0, 0, 0, 4, 4]}
      gap={4}
      pb={10}
      flexDir={["column", "column", "column", "row", "row"]}
    >
      <SkillBox
        grayBackground={grayBackground}
        grayText={grayText}
        title="Work Skills"
        skills={workSkills}
      />
      <SkillBox
        grayBackground={grayBackground}
        grayText={grayText}
        title="Language Skills"
        skills={languageSkills}
      />
    </HStack>
  )
}

export default SkillSection
