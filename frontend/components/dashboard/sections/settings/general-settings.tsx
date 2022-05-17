import {
  Button,
  Divider,
  HStack,
  Text,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import SwitchBox from "./switch-box"

interface GeneralSettingsProps {
  state: IState
}

export interface IFormData {
  display_resume: boolean
  display_portfolio: boolean
  display_blog: boolean
  display_appointments: boolean
  display_services: boolean
  display_fun_facts: boolean
  display_pricing_plans: boolean
  display_testimonials: boolean
  display_clients: boolean
  display_contact_form: boolean
  blog_allow_search_box: boolean
  blog_allow_categories: boolean
  blog_allow_latest_posts: boolean
  blog_allow_popular_posts: boolean
  post_allow_search_box: boolean
  post_allow_latest_posts: boolean
  post_allow_related_posts: boolean
  post_allow_tags: boolean
  project_allow_related_posts: boolean
}

export type CheckboxName =
  | "display_resume"
  | "display_portfolio"
  | "display_blog"
  | "display_appointments"
  | "display_services"
  | "display_fun_facts"
  | "display_pricing_plans"
  | "display_testimonials"
  | "display_clients"
  | "display_contact_form"
  | "blog_allow_search_box"
  | "blog_allow_categories"
  | "blog_allow_latest_posts"
  | "blog_allow_popular_posts"
  | "post_allow_search_box"
  | "post_allow_latest_posts"
  | "post_allow_related_posts"
  | "post_allow_tags"
  | "project_allow_related_posts"

const GeneralSettings: React.FC<GeneralSettingsProps> = (
  props: GeneralSettingsProps
) => {
  const token = props.state.user?.access
  const textColor = useColorModeValue("gray.700", "gray.100")
  const toast = useToast()

  const {
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting },
  } = useForm<IFormData>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        "/api/dashboard/general-settings/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: IFormData = response.data
      console.log(data)
      for (const key in data) {
        const attribute = key as CheckboxName
        setValue(attribute, data[attribute])
      }
    }

    fetchData()
  }, [token, setValue])

  const onSubmit: SubmitHandler<IFormData> = async (formData: IFormData) => {
    const response = await axiosInstance.post(
      "/api/dashboard/general-settings/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    toast({
      title: response.data?.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      w="full"
      align="start"
      spacing={6}
      color={textColor}
    >
      <VStack w="full" align="start" spacing={6}>
        {/* Display Sections */}
        <Text fontSize={14} fontWeight="semibold">
          Display Sections
        </Text>
        <Divider />

        <SwitchBox label="Display Blog" name="display_blog" control={control} />

        <SwitchBox
          label="Display Clients"
          control={control}
          name="display_clients"
        />

        <SwitchBox
          label="Display Contact Form"
          control={control}
          name="display_contact_form"
        />

        <SwitchBox
          label="Display Portfolio"
          control={control}
          name="display_portfolio"
        />

        <SwitchBox
          label="Display Resume"
          control={control}
          name="display_resume"
        />

        <SwitchBox
          label="Display Services"
          control={control}
          name="display_services"
        />

        <SwitchBox
          label="Display Testimonials"
          control={control}
          name="display_testimonials"
        />

        <SwitchBox
          label="Display Fun Facts"
          control={control}
          name="display_fun_facts"
        />

        <SwitchBox
          label="Display Appointments"
          control={control}
          name="display_appointments"
        />

        <SwitchBox
          label="Display Pricing Plans"
          control={control}
          name="display_pricing_plans"
        />

        <Divider />

        {/* Blog page widgets  */}
        <Text fontSize={14} fontWeight="semibold">
          Blog page widgets appearance
        </Text>
        <Divider />

        <SwitchBox
          label="Allow Search Box Widgets to Appear"
          control={control}
          name="blog_allow_search_box"
        />

        <SwitchBox
          label="Allow Categories Widgets to Appear"
          control={control}
          name="blog_allow_categories"
        />

        <SwitchBox
          label="Allow Latest Posts Widgets to Appear"
          control={control}
          name="blog_allow_latest_posts"
        />

        <SwitchBox
          label="Allow Popular Posts Widgets to Appear"
          control={control}
          name="blog_allow_popular_posts"
        />
        <Divider />

        {/* Post page widgets  */}
        <Text fontSize={14} fontWeight="semibold">
          Post page widgets appearance
        </Text>
        <Divider />

        <SwitchBox
          label="Allow Search Box Widgets to Appear"
          control={control}
          name="post_allow_search_box"
        />

        <SwitchBox
          label="Allow Latest Posts Widgets to Appear"
          control={control}
          name="post_allow_latest_posts"
        />

        <SwitchBox
          label="Allow Related Posts Widgets to Appear"
          control={control}
          name="post_allow_related_posts"
        />

        <SwitchBox
          label="Allow Tags Widgets to Appear"
          control={control}
          name="post_allow_tags"
        />

        {/* <SwitchBox
          label="Allow Comments Widgets to Appear"
        /> */}

        <Divider />

        {/* Project page widgets  */}
        <Text fontSize={14} fontWeight="semibold">
          Project page widgets appearance
        </Text>
        <Divider />

        <SwitchBox
          label="Allow Related Projects to Appear"
          control={control}
          name="project_allow_related_posts"
        />

        {/* <SwitchBox
          label="Allow Comments to Appear"
        />  */}

        <Divider />
      </VStack>

      <HStack
        w={300}
        justifyContent={["start", "start", "start", "end", "end"]}
      >
        <Button
          type="submit"
          size="sm"
          colorScheme="green"
          rounded={0}
          loadingText="Saving"
          isLoading={isSubmitting}
        >
          Save
        </Button>
        <Button size="sm" colorScheme="red" rounded={0}>
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}

export default withAuth(GeneralSettings)
