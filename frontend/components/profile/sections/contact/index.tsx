import { useColorModeValue, VStack } from "@chakra-ui/react"
import React from "react"
import SectionHeading from "../../SectionHeading"
import ContactInfo from "./ContactInfo"
import FollowMe from "./FollowMe"
import Hero from "./Hero"
import MapBox from "./MapBox"

const Contact = () => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")
  const grayBackground = useColorModeValue("blue.50", "gray.700")

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
      <Hero secondaryColor={secondaryColor} />

      {/* Contact Information */}
      <ContactInfo
        grayBackground={grayBackground}
        secondaryColor={secondaryColor}
      />

      {/* Map */}
      <MapBox url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14645.741762490958!2d87.37156387948454!3d23.40863250614111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f777802e248979%3A0x561dfae64229340!2sPakhanna%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1645368183188!5m2!1sen!2sin" />

      {/* Follow Me */}
      <FollowMe
        grayBackground={grayBackground}
        headingColor={headingColor}
        secondaryColor={secondaryColor}
      />
    </VStack>
  )
}

export default Contact
