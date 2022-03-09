from django.contrib import admin
from resume.models import (
    UserProfile,
    Service,
    PricingPlan,
    Education,
    Experiences,
    ProjectCategory,
    Project,
    Tags,
    BlogCategory,
    Blog,
    SkillCategory,
    Skill,
    Testimonial,
    Client,
    Message,
    Appointment,
    RequestedAppointment,
)

admin.site.register(UserProfile)
admin.site.register(Service)
admin.site.register(PricingPlan)
admin.site.register(Education)
admin.site.register(Experiences)
admin.site.register(ProjectCategory)
admin.site.register(Project)
admin.site.register(Tags)
admin.site.register(Blog)
admin.site.register(BlogCategory)
admin.site.register(SkillCategory)
admin.site.register(Skill)
admin.site.register(Testimonial)
admin.site.register(Client)
admin.site.register(Message)
admin.site.register(Appointment)
admin.site.register(RequestedAppointment)
