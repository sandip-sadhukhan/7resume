import { Flex } from "@chakra-ui/react"
import React from "react"

interface Props {
  url: string
}

const MapBox = ({ url }: Props) => {
  return (
    <Flex w="full" pb={10}>
      <iframe
        src={url}
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </Flex>
  )
}

export default MapBox
