import { useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import { ResumeSectionProps } from "../../../../types/profile"
import SectionHeading from "../../SectionHeading"
import WorkHistory from "./WorkHistory"
import SkillSection from "./SkillSection"
import BackgroundHistory from "./BackgroundHistory"

const ResumeSection: React.FC<ResumeSectionProps> = (
  props: ResumeSectionProps
) => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")
  const grayBackground = useColorModeValue("blue.50", "gray.700")
  const grayText = useColorModeValue("gray.600", "gray.300")

  const { resume, educations, experiences, skills_categories } = props

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
        title="Resume"
      />

      {/* Work History */}
      <WorkHistory
        grayBackground={grayBackground}
        grayText={grayText}
        secondaryColor={secondaryColor}
        resume={resume}
        experiences={experiences}
      />

      {/* Skills */}
      <SkillSection
        skills_categories={skills_categories}
        grayBackground={grayBackground}
        grayText={grayText}
      />

      {/* Background History */}
      <BackgroundHistory
        grayBackground={grayBackground}
        grayText={grayText}
        secondaryColor={secondaryColor}
        educations={educations}
      />
    </VStack>
  )
}

export default ResumeSection
