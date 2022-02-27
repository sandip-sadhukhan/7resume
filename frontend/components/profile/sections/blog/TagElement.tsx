import { Button, WrapItem } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"

interface TagElementProps {
  bg: string
  text: string
}

const TagElement: React.FC<TagElementProps> = (props: TagElementProps) => {
  const { bg, text } = props

  return (
    <WrapItem>
      <Link href="#">
        <a>
          <Button size="xs" fontSize={14} bgColor={bg}>
            {text}
          </Button>
        </a>
      </Link>
    </WrapItem>
  )
}

export default TagElement
