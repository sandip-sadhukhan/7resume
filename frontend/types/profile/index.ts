export interface Testimonials {
  first: TestimonialType
  second: TestimonialType | null
}

export interface SkillType {
  name: string
  value: number
}

export interface BreadcrumbType {
  text: string
  link: string
}

export interface LayoutProps {
  // SEO
  site_title: string
  favicon: string
  meta_description: string
  // Property
  name: string
  profile_picture: string
  my_positions: string
  display_resume: boolean
  display_portfolio: boolean
  display_blog: boolean
  display_appointments: boolean
}

export interface SidebarProps {
  name: string
  profile_picture: string
  my_positions: string
  display_resume: boolean
  display_portfolio: boolean
  display_blog: boolean
  display_appointments: boolean
}

export interface AboutSectionProps {
  name: string
  about_me_image: string
  nationality: string
  about_me: string
  experience: number
  projects: number
  meetings: number
  why_hire_me: string
  video_description: string
  display_services: boolean
  display_fun_facts: boolean
  display_pricing_plans: boolean
  display_testimonials: boolean
  display_clients: boolean
  services?: ServiceType[]
  happy_clients: number
  awards_won: number
  pricing_plans?: PricingPlanType[]
  testimonials?: TestimonialType[]
  clients?: ClientType[]
}

export interface ServiceType {
  id: number
  title: string
  description: string
  image: string
}

export interface PricingPlanType {
  id: number
  plan_name: string
  plan_price: string
  price_duration: string
  plan_currency: string
  is_featured: boolean
  feature_comment: string
  features: string
  plan_icon_path: string
}

export interface TestimonialType {
  id: number
  name: string
  image_path: string
  position: string
  rating: number
  message: string
}

export interface ClientType {
  id: number
  name: string
  image_path: string
}
