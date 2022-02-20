import React from "react"
import { useColorModeValue, VStack } from "@chakra-ui/react"

import Hero from "./Hero"
import Service from "./Service"
import Hireme from "./Hireme"
import Fact from "./Fact"
import Pricing from "./Pricing"
import ClientSay from "./ClientSay"
import { Testimonial } from "../../../../types/profile"
import MyClients from "./MyClients"
import SectionHeading from "../../SectionHeading"

const AboutSection = () => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")
  const grayBackground = useColorModeValue("blue.50", "gray.700")

  const testimonials: Testimonial[] | null = [
    {
      body: "Hi Lorem ipsum dolor sit amet consectetur adipisicing elit. Dictarecusandae itaque sed praesentium sunt vero ab, libero quae eumaut quod atque velit suscipit aliquid ea voluptatem doloresbeatae facilis?",
      name: "Sandip Sadhukhan",
      position: "Full Stack Developer",
      userImage: "/avatar-1.jpg",
      star: 4,
    },
    {
      body: "Hello Lorem ipsum dolor sit amet consectetur adipisicing elit. Dictarecusandae itaque sed praesentium sunt vero ab, libero quae eumaut quod atque velit suscipit aliquid ea voluptatem doloresbeatae facilis?",
      name: "Dark Looter",
      position: "UI/UX Developer",
      userImage: "/avatar-1.jpg",
      star: 2,
    },
    {
      body: "Hm Lorem ipsum dolor sit amet consectetur adipisicing elit. Dictarecusandae itaque sed praesentium sunt vero ab, libero quae eumaut quod atque velit suscipit aliquid ea voluptatem doloresbeatae facilis?",
      name: "James Bond",
      position: "Frontend Developer",
      userImage: "/avatar-1.jpg",
      star: 1,
    },
    {
      body: "Nice Lorem ipsum dolor sit amet consectetur adipisicing elit. Dictarecusandae itaque sed praesentium sunt vero ab, libero quae eumaut quod atque velit suscipit aliquid ea voluptatem doloresbeatae facilis?",
      name: "Tom and jerry",
      position: "Cartoon Developer",
      userImage: "/avatar-1.jpg",
      star: 5,
    },
    {
      body: "Stupid Lorem ipsum dolor sit amet consectetur adipisicing elit. Dictarecusandae itaque sed praesentium sunt vero ab, libero quae eumaut quod atque velit suscipit aliquid ea voluptatem doloresbeatae facilis?",
      name: "Prince of Persia",
      position: "Sr Dev",
      userImage: "/avatar-1.jpg",
      star: 1,
    },
  ]

  return (
    <VStack
      align="start"
      pt={[5, 5, 5, 10, 10]}
      px={[5, 5, 5, 16, 16]}
      w="full"
    >
      {/* Heading */}
      <SectionHeading
        secondaryColor={secondaryColor}
        headingColor={headingColor}
        title="About Me"
      />

      {/* Name Description & Image */}
      <Hero secondaryColor={secondaryColor} headingColor={headingColor} />

      {/* Services */}
      <Service grayBackground={grayBackground} />

      {/* Why Hire me */}
      <Hireme />

      {/* Facts */}
      <Fact grayBackground={grayBackground} secondaryColor={secondaryColor} />

      {/* Pricing Plans */}
      <Pricing headingColor={headingColor} secondaryColor={secondaryColor} />

      {/* Client Say */}
      {testimonials && (
        <ClientSay
          testimonials={testimonials}
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
        />
      )}

      {/* My Clients */}
      <MyClients grayBackground={grayBackground} />
    </VStack>
  )
}

export default AboutSection
