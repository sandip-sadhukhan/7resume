import { IconButton, Tooltip } from "@chakra-ui/react"
import React from "react"
import { IconType } from "react-icons/lib"

interface Props {
  icon: IconType
  url: string
  label: string
  secondaryColor: string
}

const FollowIcon = (props: Props) => {
  return (
    <Tooltip hasArrow label={props.label}>
      <IconButton
        aria-label="Facebook"
        icon={<props.icon />}
        as="a"
        href={props.url}
        target="_blank"
        rounded="full"
        w={10}
        h={10}
        color="white"
        bgColor={props.secondaryColor}
        shadow="lg"
        _hover={{ transform: "translateY(-5px)" }}
        variant="outline"
      />
    </Tooltip>
  )
}

export default FollowIcon
