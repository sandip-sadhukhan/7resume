import { Wrap } from "@chakra-ui/react"
import React from "react"
import { TagType } from "../../../../types/profile"
import TagElement from "./TagElement"

interface TagGroupProps {
  bg: string
  tags: TagType[]
}

const TagGroup: React.FC<TagGroupProps> = (props: TagGroupProps) => {
  const { bg, tags } = props
  return (
    <Wrap spacing={2}>
      {tags.map((tag, index) => (
        <TagElement key={index} bg={bg} text={tag.title} />
      ))}
    </Wrap>
  )
}

export default TagGroup
