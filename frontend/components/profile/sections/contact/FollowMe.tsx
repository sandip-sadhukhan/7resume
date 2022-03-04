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
import { FollowMeType } from "../../../../types/profile"

interface Props {
  grayBackground: string
  headingColor: string
  secondaryColor: string
  follow_me: FollowMeType
}

const FollowMe = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const iconList: any = {
    facebook: FaFacebookF,
    twitter: BsTwitter,
    instagram: BsInstagram,
    whatsapp: FaWhatsapp,
    youtube: BsYoutube,
    linkedin: FaLinkedinIn,
    snapchat: BsSnapchat,
    github: BsGithub,
    pinterest: BsPinterest,
    reddit: BsReddit,
    stackoverflow: FaStackOverflow,
    behance: BsBehance,
    skype: FaSkype,
    vimeo: FaVimeoV,
    codepen: FaCodepen,
    dribble: BsDribbble,
    dropbox: FaDropbox,
    flickr: ImFlickr4,
    rss: FaRss,
    soundcloud: FaSoundcloud,
    tumblr: TiSocialTumbler,
    yelp: FaYelp,
  }

  const socialMediaArr = Object.entries(props.follow_me)

  return (
    <Flex w="full" pb={10}>
      <Box bgColor={props.grayBackground} p={6} w="full">
        <Heading size="sm" color={props.headingColor} pb={5}>
          Follow Me:
        </Heading>
        <SimpleGrid columns={[4, 4, 8, 10, 18]} gap={4}>
          {/* {props.follow_me.map((social_meida, index) => (
            <FollowIcon
              key={index}
              icon={icon.icon}
              url={icon.url}
              label={icon.label}
              secondaryColor={props.secondaryColor}
            />
          ))} */}
          {socialMediaArr.map(
            (social_media: [string, string], index: number) => (
              <FollowIcon
                key={index}
                icon={iconList[social_media[0]]}
                url={social_media[1]}
                label={social_media[0]}
                secondaryColor={props.secondaryColor}
              />
            )
          )}
        </SimpleGrid>
      </Box>
    </Flex>
  )
}

export default FollowMe
