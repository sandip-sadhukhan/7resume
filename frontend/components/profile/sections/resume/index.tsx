import { useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import SectionHeading from "../../SectionHeading"
import History from "./History"
import SkillSection from "./SkillSection"

const ResumeSection: React.FC = () => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")
  const grayBackground = useColorModeValue("blue.50", "gray.700")
  const grayText = useColorModeValue("gray.600", "gray.300")

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
      <History
        grayBackground={grayBackground}
        grayText={grayText}
        secondaryColor={secondaryColor}
        hasResume={true}
        title="Work History"
      />

      {/* Skills */}
      <SkillSection grayBackground={grayBackground} grayText={grayText} />

      {/* Background History */}
      <History
        grayBackground={grayBackground}
        grayText={grayText}
        secondaryColor={secondaryColor}
        hasResume={false}
        title="Background History"
      />
    </VStack>
  )
}

export default ResumeSection
