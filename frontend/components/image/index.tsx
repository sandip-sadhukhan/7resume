import { chakra } from "@chakra-ui/react"
import NextImage from "next/image"

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) => {
    return ["width", "height", "src", "alt", "quality"].includes(prop)
  },
})

export default Image
