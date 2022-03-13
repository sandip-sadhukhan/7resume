import { useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import { ContactMeSectionProps } from "../../../../types/profile"
import SectionHeading from "../../SectionHeading"
import ContactInfo from "./ContactInfo"
import FollowMe from "./FollowMe"
import Hero from "./Hero"
import MapBox from "./MapBox"

const Contact: React.FC<ContactMeSectionProps> = (
  props: ContactMeSectionProps
) => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")
  const grayBackground = useColorModeValue("blue.50", "gray.700")

  const {
    display_contact_form,
    contact_form_image,
    phone,
    email,
    address,
    gmap_iframe,
    follow_me,
  } = props

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
        title="Contact Me"
      />
      {/* Hero Section */}
      {display_contact_form ? (
        <Hero
          contact_form_image={contact_form_image}
          secondaryColor={secondaryColor}
        />
      ) : null}
      {/* Contact Information */}
      <ContactInfo
        grayBackground={grayBackground}
        secondaryColor={secondaryColor}
        phone={phone}
        email={email}
        address={address}
      />
      {/* Map */}
      {gmap_iframe && gmap_iframe !== "" ? <MapBox url={gmap_iframe} /> : null}

      {/* Follow Me */}
      <FollowMe
        grayBackground={grayBackground}
        headingColor={headingColor}
        secondaryColor={secondaryColor}
        follow_me={follow_me}
      />
    </VStack>
  )
}

export default Contact
