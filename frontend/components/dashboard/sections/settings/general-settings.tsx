import {
  Button,
  Divider,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import React, { ChangeEvent, useState } from "react"
import SwitchBox from "./switch-box"

const GeneralSettings: React.FC = () => {
  const textColor = useColorModeValue("gray.700", "gray.100")

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
    displayPricingPlans: boolean
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
    displayClients: true,
    displayContactForm: false,
    displayPortfolio: false,
    displayResume: false,
    displayServices: false,
    displayTestimonials: false,
    displayFunFacts: false,
    displayAppointments: false,
    displayPricingPlans: false,
    blogAllowSearchBox: false,
    blogAllowCategories: false,
    blogAllowLatestPosts: false,
    blogAllowPopularPosts: false,
    postAllowSearchBox: false,
    postAllowLatestPosts: false,
    postAllowRelatedPosts: false,
    postAllowTags: false,
    postAllowComments: true,
    projectAllowRelatedProjects: false,
    projectAllowComments: false,
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked })
  }

  return (
    <VStack w="full" align="start" spacing={6} color={textColor}>
      <VStack w="full" align="start" spacing={6}>
        {/* Display Sections */}
        <Text fontSize={14} fontWeight="semibold">
          Display Sections
        </Text>
        <Divider />

        <SwitchBox
          name="displayBlog"
          label="Display Blog"
          checked={formData.displayBlog}
          onChange={onChange}
        />

        <SwitchBox
          name="displayClients"
          label="Display Clients"
          checked={formData.displayClients}
          onChange={onChange}
        />

        <SwitchBox
          name="displayContactForm"
          label="Display Contact Form"
          checked={formData.displayContactForm}
          onChange={onChange}
        />

        <SwitchBox
          name="displayPortfolio"
          label="Display Portfolio"
          checked={formData.displayPortfolio}
          onChange={onChange}
        />

        <SwitchBox
          name="displayResume"
          label="Display Resume"
          checked={formData.displayResume}
          onChange={onChange}
        />

        <SwitchBox
          name="displayServices"
          label="Display Services"
          checked={formData.displayServices}
          onChange={onChange}
        />

        <SwitchBox
          name="displayTestimonials"
          label="Display Testimonials"
          checked={formData.displayTestimonials}
          onChange={onChange}
        />

        <SwitchBox
          name="displayFunFacts"
          label="Display Fun Facts"
          checked={formData.displayFunFacts}
          onChange={onChange}
        />

        <SwitchBox
          name="displayAppointments"
          label="Display Appointments"
          checked={formData.displayAppointments}
          onChange={onChange}
        />

        <SwitchBox
          name="displayPricingPlans"
          label="Display Pricing Plans"
          checked={formData.displayPricingPlans}
          onChange={onChange}
        />

        <Divider />

        {/* Blog page widgets */}
        <Text fontSize={14} fontWeight="semibold">
          Blog page widgets appearance
        </Text>
        <Divider />

        <SwitchBox
          checked={formData.blogAllowSearchBox}
          name="blogAllowSearchBox"
          label="Allow Search Box Widgets to Appear"
          onChange={onChange}
        />

        <SwitchBox
          checked={formData.blogAllowCategories}
          name="blogAllowCategories"
          label="Allow Categories Widgets to Appear"
          onChange={onChange}
        />

        <SwitchBox
          checked={formData.blogAllowLatestPosts}
          name="blogAllowLatestPosts"
          label="Allow Latest Posts Widgets to Appear"
          onChange={onChange}
        />

        <SwitchBox
          checked={formData.blogAllowPopularPosts}
          name="blogAllowPopularPosts"
          label="Allow Popular Posts Widgets to Appear"
          onChange={onChange}
        />
        <Divider />

        {/* Post page widgets */}
        <Text fontSize={14} fontWeight="semibold">
          Post page widgets appearance
        </Text>
        <Divider />

        <SwitchBox
          checked={formData.postAllowSearchBox}
          name="postAllowSearchBox"
          label="Allow Search Box Widgets to Appear"
          onChange={onChange}
        />

        <SwitchBox
          checked={formData.postAllowLatestPosts}
          name="postAllowLatestPosts"
          label="Allow Latest Posts Widgets to Appear"
          onChange={onChange}
        />

        <SwitchBox
          checked={formData.postAllowRelatedPosts}
          name="postAllowRelatedPosts"
          label="Allow Related Posts Widgets to Appear"
          onChange={onChange}
        />

        <SwitchBox
          checked={formData.postAllowTags}
          name="postAllowTags"
          label="Allow Tags Widgets to Appear"
          onChange={onChange}
        />

        <SwitchBox
          checked={formData.postAllowComments}
          name="postAllowComments"
          label="Allow Comments Widgets to Appear"
          onChange={onChange}
        />
        <Divider />

        {/* Project page widgets */}
        <Text fontSize={14} fontWeight="semibold">
          Project page widgets appearance
        </Text>
        <Divider />

        <SwitchBox
          checked={formData.projectAllowRelatedProjects}
          name="projectAllowRelatedProjects"
          label="Allow Related Projects to Appear"
          onChange={onChange}
        />

        <SwitchBox
          checked={formData.projectAllowComments}
          name="projectAllowComments"
          label="Allow Comments to Appear"
          onChange={onChange}
        />
        <Divider />
      </VStack>

      <HStack
        w={300}
        justifyContent={["start", "start", "start", "end", "end"]}
      >
        <Button size="sm" colorScheme="green" rounded={0}>
          Save
        </Button>
        <Button size="sm" colorScheme="red" rounded={0}>
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}

export default GeneralSettings
