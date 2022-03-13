export interface TestimonialsType {
  first: TestimonialType
  second: TestimonialType | null
}

export interface BreadcrumbType {
  text: string
  link?: string
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

export interface ContactMeSectionProps {
  display_contact_form: boolean
  contact_form_image: string
  phone: string
  email: string
  address: string
  gmap_iframe: string
  follow_me: FollowMeType
}

export interface FollowMeType {
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

export interface ResumeSectionProps {
  resume: string | null
  experiences: ExperienceType[]
  skills_categories: SkillCategoryType[]
  educations: EducationType[]
}

export interface ExperienceType {
  id: number
  company: string
  image_path: string
  position: string
  description: string
  date_from: string
  date_to: string | null
  currently_working: boolean
}

export interface SkillCategoryType {
  category: string
  skills: SkillType[]
}

export interface SkillType {
  id: number
  title: string
  level: number
}

export interface EducationType {
  id: number
  school: string
  image_path: string
  field: string
  description: string
  date_from: string
  date_to: string | null
  currently_studying: boolean
}

export interface PortfolioSectionProps {
  categories: PortfolioCategoryType[]
  portfolios: PortfolioGridType[]
}

export interface PortfolioCategoryType {
  name: string
  count: number
}

export interface PortfolioGridType {
  id: number
  category_name: string
  title: string
  slug: string
  featured_image_path: string
}

export interface SinglePortfolioSectionProps {
  portfolio: PortfolioType
  related_projects: PortfolioGridType[]
}

export interface PortfolioType {
  id: number
  category_name: string
  title: string
  slug: string
  link: string
  published: string
  featured_image_path: string
  description: string
  meta_description: string
  facebook: string
  twitter: string
  pinterest: string
}

export interface BlogSectionProps {
  blogs: BlogGridType[]
}

export interface BlogSearchSectionProps {
  blogs: BlogGridType[]
  latest_posts: IBlogPostSuggestion[]
  all_categories: PortfolioCategoryType[]
  tag_cloud: TagType[]
}

export interface BlogGridType {
  id: number
  featured_image: string
  views: number
  slug: string
  title: string
  updated_at: string
  category_name: string
  short_description: string
}

export interface BlogPostSectionProps {
  blog: BlogPostType
  site_title: string
  related_posts: IBlogPostSuggestion[]
  all_categories: PortfolioCategoryType[]
  latest_posts: IBlogPostSuggestion[]
  tag_cloud: TagType[]
}

export interface IBlogPostSuggestion {
  id: number
  featured_image: string
  title: string
  slug: string
  updated_at: string
}

export interface BlogPostType {
  id: number
  slug: string
  featured_image: string
  title: string
  author: string
  updated_at: string
  category_name: string
  views: number
  description: string
  meta_description: string
  tags: TagType[]
}

export interface TagType {
  title: string
}

export interface AppointmentSectionProps {
  appointment: AppointmentType
}

export interface AppointmentType {
  sunday: boolean
  sunday_start_time: string | null
  sunday_end_time: string | null
  monday: boolean
  monday_start_time: string | null
  monday_end_time: string | null
  tuesday: boolean
  tuesday_start_time: string | null
  tuesday_end_time: string | null
  wednesday: boolean
  wednesday_start_time: string | null
  wednesday_end_time: string | null
  thursday: boolean
  thursday_start_time: string | null
  thursday_end_time: string | null
  friday: boolean
  friday_start_time: string | null
  friday_end_time: string | null
  saturday: boolean
  saturday_start_time: string | null
  saturday_end_time: string | null
}

export interface RequestedAppointmentType {
  subject: string
  name: string
  email: string
  phone: string
  appointment_time: string
  message: string
}
