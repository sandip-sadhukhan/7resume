import React from "react"
import { useColorModeValue, VStack } from "@chakra-ui/react"

import Hero from "./Hero"
import Service from "./Service"
import Hireme from "./Hireme"
import Fact from "./Fact"
import Pricing from "./Pricing"
import ClientSay from "./ClientSay"
import {
  AboutSectionProps,
  ClientType,
  PricingPlanType,
  ServiceType,
  TestimonialType,
} from "../../../../types/profile"
import MyClients from "./MyClients"
import SectionHeading from "../../SectionHeading"

const AboutSection: React.FC<AboutSectionProps> = (
  props: AboutSectionProps
) => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")
  const grayBackground = useColorModeValue("blue.50", "gray.700")

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
      <Hero
        secondaryColor={secondaryColor}
        headingColor={headingColor}
        name={props.name}
        about_me_image={props.about_me_image}
        nationality={props.nationality}
        about_me={props.about_me}
        experience={props.experience}
        meetings={props.meetings}
        projects={props.projects}
      />

      {/* Services */}
      {props.display_services === true ? (
        <Service
          grayBackground={grayBackground}
          services={props.services as ServiceType[]}
        />
      ) : null}

      {/* Why Hire me */}
      <Hireme
        why_hire_me={props.why_hire_me}
        video_description={props.video_description}
      />

      {/* Facts */}
      {props.display_fun_facts === true ? (
        <Fact
          happy_clients={props.happy_clients}
          experience={props.experience}
          awards_won={props.awards_won}
          meetings={props.meetings}
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
        />
      ) : null}

      {/* Pricing Plans */}
      {props.display_pricing_plans === true ? (
        <Pricing
          headingColor={headingColor}
          secondaryColor={secondaryColor}
          pricing_plans={props.pricing_plans as PricingPlanType[]}
        />
      ) : null}

      {/* Client Say */}
      {props.display_testimonials &&
      props.testimonials &&
      props.testimonials?.length > 0 ? (
        <ClientSay
          testimonials={props.testimonials as TestimonialType[]}
          grayBackground={grayBackground}
          secondaryColor={secondaryColor}
        />
      ) : null}

      {/* My Clients */}
      {props.display_clients === true ? (
        <MyClients
          grayBackground={grayBackground}
          clients={props.clients as ClientType[]}
        />
      ) : null}
    </VStack>
  )
}

export default AboutSection
