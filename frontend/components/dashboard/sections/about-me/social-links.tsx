import { Button, Divider, VStack, HStack, useToast } from "@chakra-ui/react"
import { AxiosError } from "axios"
import React, { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"
import axiosInstance from "../../../../utils/axiosInstance"
import SaveButton from "../../../shared/save-button"
import SocialLink from "./social-link"

interface IFormData {
  facebook: string
  twitter: string
  instagram: string
  whatsapp: string
  youtube: string
  linkedin: string
  snapchat: string
  github: string
  pinterest: string
  reddit: string
  stackoverflow: string
  behance: string
  skype: string
  vimeo: string
  codepen: string
  dribble: string
  dropbox: string
  flickr: string
  rss: string
  soundcloud: string
  tumblr: string
  yelp: string
}

type SocialType =
  | "facebook"
  | "twitter"
  | "instagram"
  | "whatsapp"
  | "youtube"
  | "linkedin"
  | "snapchat"
  | "github"
  | "pinterest"
  | "reddit"
  | "stackoverflow"
  | "behance"
  | "skype"
  | "vimeo"
  | "codepen"
  | "dribble"
  | "dropbox"
  | "flickr"
  | "rss"
  | "soundcloud"
  | "tumblr"
  | "yelp"

const ALL_SOCIAL_MEDIA: SocialType[] = [
  "facebook",
  "twitter",
  "instagram",
  "whatsapp",
  "youtube",
  "linkedin",
  "snapchat",
  "github",
  "pinterest",
  "reddit",
  "stackoverflow",
  "behance",
  "skype",
  "vimeo",
  "codepen",
  "dribble",
  "dropbox",
  "flickr",
  "rss",
  "soundcloud",
  "tumblr",
  "yelp",
]

interface SocialLinksContentProps {
  state: IState
}

const SocialLinksContent: React.FC<SocialLinksContentProps> = (
  props: SocialLinksContentProps
) => {
  const token = props.state.user?.access as string
  const toast = useToast()

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IFormData>()

  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        "/api/dashboard/social-links-settings/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data: IFormData = response.data

      setValue("facebook", data.facebook)
      setValue("twitter", data.twitter)
      setValue("instagram", data.instagram)
      setValue("whatsapp", data.whatsapp)
      setValue("youtube", data.youtube)
      setValue("linkedin", data.linkedin)
      setValue("snapchat", data.snapchat)
      setValue("github", data.github)
      setValue("pinterest", data.pinterest)
      setValue("reddit", data.reddit)
      setValue("stackoverflow", data.stackoverflow)
      setValue("behance", data.behance)
      setValue("skype", data.skype)
      setValue("vimeo", data.vimeo)
      setValue("codepen", data.codepen)
      setValue("dribble", data.dribble)
      setValue("dropbox", data.dropbox)
      setValue("flickr", data.flickr)
      setValue("rss", data.rss)
      setValue("soundcloud", data.soundcloud)
      setValue("tumblr", data.tumblr)
      setValue("yelp", data.yelp)
      setLoading(false)
    }

    fetchData()
  }, [token, setValue])

  const onSubmit: SubmitHandler<IFormData> = async (data: IFormData) => {
    try {
      const response = await axiosInstance.post(
        "/api/dashboard/social-links-settings/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const responseData: { message: string } = response.data

      toast({
        title: responseData.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 400) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = err.response.data as any
        Object.keys(data).forEach((ele) => {
          const element = ele as SocialType
          setError(element, { message: data[ele].join(",") })
        })
      } else {
        toast({
          status: "error",
          title: err.response?.statusText,
        })
      }
    }
  }

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      w="full"
      spacing={4}
      align="start"
    >
      {ALL_SOCIAL_MEDIA.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Divider />}

          <SocialLink
            name={item}
            error={errors[item]}
            register={register(item)}
          />
        </React.Fragment>
      ))}

      <HStack
        ps={["full", "full", 110, 150, 175]}
        justifyContent={["start", "start", "end", "end", "end"]}
      >
        <SaveButton isSubmitting={isSubmitting} isLoading={isLoading} />
        <Button size="sm" rounded={0} colorScheme="red">
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}

export default withAuth(SocialLinksContent)
