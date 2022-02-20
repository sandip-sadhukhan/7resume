import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import React from "react"
import {
  BsBehance,
  BsDribbble,
  BsGithub,
  BsInstagram,
  BsPinterest,
  BsReddit,
  BsSnapchat,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs"
import { TiSocialTumbler } from "react-icons/ti"
import {
  FaCodepen,
  FaDropbox,
  FaFacebookF,
  FaLinkedinIn,
  FaRss,
  FaSkype,
  FaSoundcloud,
  FaStackOverflow,
  FaVimeoV,
  FaWhatsapp,
  FaYelp,
} from "react-icons/fa"
import { ImFlickr4 } from "react-icons/im"
import FollowIcon from "./FollowIcon"

interface Props {
  grayBackground: string
  headingColor: string
  secondaryColor: string
}

const FollowMe = (props: Props) => {
  const icons = [
    { icon: FaFacebookF, url: "#", label: "Facebook" },
    { icon: BsTwitter, url: "#", label: "Twitter" },
    { icon: BsInstagram, url: "#", label: "Instagram" },
    { icon: FaWhatsapp, url: "#", label: "Whatsapp" },
    { icon: BsYoutube, url: "#", label: "Youtube" },
    { icon: FaLinkedinIn, url: "#", label: "Linkedin" },
    { icon: BsSnapchat, url: "#", label: "SnapChat" },
    { icon: BsGithub, url: "#", label: "Github" },
    { icon: BsPinterest, url: "#", label: "Pinterest" },
    { icon: BsReddit, url: "#", label: "Reddit" },
    { icon: FaStackOverflow, url: "#", label: "StackOverFlow" },
    { icon: BsBehance, url: "#", label: "Behance" },
    { icon: FaSkype, url: "#", label: "Skype" },
    { icon: FaVimeoV, url: "#", label: "Vimeo" },
    { icon: FaCodepen, url: "#", label: "CodePen" },
    { icon: BsDribbble, url: "#", label: "Dribbble" },
    { icon: FaDropbox, url: "#", label: "Dropbox" },
    { icon: ImFlickr4, url: "#", label: "Flicker" },
    { icon: FaRss, url: "#", label: "RSS" },
    { icon: FaSoundcloud, url: "#", label: "SoundCloud" },
    { icon: TiSocialTumbler, url: "#", label: "Tumbler" },
    { icon: FaYelp, url: "#", label: "Yelp" },
  ]

  return (
    <Flex w="full" pb={10}>
      <Box bgColor={props.grayBackground} p={6} w="full">
        <Heading size="sm" color={props.headingColor} pb={5}>
          Follow Me:
        </Heading>
        <SimpleGrid columns={[4, 4, 8, 10, 18]} gap={4}>
          {icons.map((icon, index) => (
            <FollowIcon
              key={index}
              icon={icon.icon}
              url={icon.url}
              label={icon.label}
              secondaryColor={props.secondaryColor}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  )
}

export default FollowMe
