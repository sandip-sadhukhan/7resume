import { Button, WrapItem } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

interface TagElementProps {
  bg: string
  text: string
}

const TagElement: React.FC<TagElementProps> = (props: TagElementProps) => {
  const { bg, text } = props
  const username = useRouter().query.username as string

  return (
    <WrapItem>
      <Link
        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${username}/blog/search/${text}`}
      >
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
