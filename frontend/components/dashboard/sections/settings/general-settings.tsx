import { Divider, Text, VStack } from "@chakra-ui/react"
import React, { useState } from "react"
import RadioBox from "./RadioBox"

const GeneralSettings: React.FC = () => {
  interface IFormData {
    displayBlog: boolean
    displayClients: boolean
    displayContactForm: boolean
    displayPortfolio: boolean
    displayResume: boolean
    displayServices: boolean
    displayTestimonials: boolean
    displayFunFacts: boolean
    displayAppointments: boolean
    displayPricingPlan: boolean
    blogAllowSearchBox: boolean
    blogAllowCategories: boolean
    blogAllowLatestPosts: boolean
    blogAllowPopularPosts: boolean
    postAllowSearchBox: boolean
    postAllowLatestPosts: boolean
    postAllowRelatedPosts: boolean
    postAllowTags: boolean
    postAllowComments: boolean
    projectAllowRelatedProjects: boolean
    projectAllowComments: boolean
  }

  const [formData, setFormData] = useState<IFormData>({
    displayBlog: false,
    displayClients: false,
    displayContactForm: false,
    displayPortfolio: false,
    displayResume: false,
    displayServices: false,
    displayTestimonials: false,
    displayFunFacts: false,
    displayAppointments: false,
    displayPricingPlan: false,
    blogAllowSearchBox: false,
    blogAllowCategories: false,
    blogAllowLatestPosts: false,
    blogAllowPopularPosts: false,
    postAllowSearchBox: false,
    postAllowLatestPosts: false,
    postAllowRelatedPosts: false,
    postAllowTags: false,
    postAllowComments: false,
    projectAllowRelatedProjects: false,
    projectAllowComments: false,
  })

  const onChange = (name: string, val: string) => {
    setFormData({ ...formData, [name]: val === "true" })
  }
  return (
    <VStack w="full" align="start" spacing={4}>
      <VStack w="full" align="start" spacing={6}>
        {/* Display Sections */}
        <Text fontSize={14} fontWeight="semibold">
          Display Sections
        </Text>
        <Divider />
        <RadioBox
          keyItem="displayBlog"
          name="Display Blog"
          value={formData.displayBlog}
          onChange={onChange}
        />
        <RadioBox
          keyItem="displayClients"
          name="Display Clients"
          value={formData.displayClients}
          onChange={onChange}
        />
        <RadioBox
          keyItem="displayContactForm"
          name="Display Contact Form"
          value={formData.displayContactForm}
          onChange={onChange}
        />
        <RadioBox
          keyItem="displayPortfolio"
          name="Display Portfolio"
          value={formData.displayPortfolio}
          onChange={onChange}
        />
        <RadioBox
          keyItem="displayResume"
          name="Display Resume"
          value={formData.displayResume}
          onChange={onChange}
        />
        <RadioBox
          keyItem="displayServices"
          name="Display Services"
          value={formData.displayServices}
          onChange={onChange}
        />
        <RadioBox
          keyItem="displayTestimonials"
          name="Display Testimonials"
          value={formData.displayTestimonials}
          onChange={onChange}
        />
        <RadioBox
          keyItem="displayFunFacts"
          name="Display Fun Facts"
          value={formData.displayFunFacts}
          onChange={onChange}
        />
        <RadioBox
          keyItem="displayAppointments"
          name="Display Appointments"
          value={formData.displayAppointments}
          onChange={onChange}
        />
        <RadioBox
          keyItem="displayPricingPlan"
          name="Display Pricing Plan"
          value={formData.displayPricingPlan}
          onChange={onChange}
        />
        <Divider />

        {/* Blog page widgets */}
        <Text fontSize={14} fontWeight="semibold">
          Blog page widgets appearance
        </Text>
        <Divider />
        <RadioBox
          keyItem="blogAllowSearchBox"
          name="Allow Search Box Widget to Appear"
          value={formData.blogAllowSearchBox}
          onChange={onChange}
        />
        <RadioBox
          keyItem="blogAllowCategories"
          name="Allow Categories Widget to Appear"
          value={formData.blogAllowCategories}
          onChange={onChange}
        />
        <RadioBox
          value={formData.blogAllowLatestPosts}
          keyItem="blogAllowLatestPosts"
          name="Allow Latest Posts Widget to Appear"
          onChange={onChange}
        />
        <RadioBox
          value={formData.blogAllowPopularPosts}
          keyItem="blogAllowPopularPosts"
          name="Allow Popular Posts Widget to Appear"
          onChange={onChange}
        />
      </VStack>
    </VStack>
  )
}

export default GeneralSettings
