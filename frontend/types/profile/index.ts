export interface Testimonials {
  first: Testimonial
  second: Testimonial | null
}

export interface Testimonial {
  body: string
  name: string
  position: string
  userImage: string
  star: number
}
export interface SkillType {
  name: string
  value: number
}

export interface BreadcrumbType {
  text: string
  link: string
}
