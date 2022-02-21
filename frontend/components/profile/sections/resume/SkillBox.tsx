import { Heading, VStack } from "@chakra-ui/react"
import React from "react"
import { SkillType } from "../../../../types/profile"
import ProgressBar from "./ProgressBar"

interface SkillBoxProps {
  grayBackground: string
  grayText: string
  title: string
  skills: SkillType[]
}

const SkillBox: React.FC<SkillBoxProps> = (props: SkillBoxProps) => {
  const { grayBackground, grayText, skills, title } = props
  return (
    <VStack py={10} px={6} bgColor={grayBackground} w="full" align="start">
      <Heading as="h2" size="lg" pb={5}>
        {title}
      </Heading>
      <VStack w="full" align="start" gap={2}>
        {skills.map((skill, index) => (
          <ProgressBar key={index} grayText={grayText} skill={skill} />
        ))}
      </VStack>
    </VStack>
  )
}

export default SkillBox
