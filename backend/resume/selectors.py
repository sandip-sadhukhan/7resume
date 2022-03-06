from .models import Project
from .serializers import (
    ClientSerializer,
    EducationSerializer,
    ExperienceSerializer,
    PricingPlanSerializer,
    ProjectShortSerializer,
    ServiceSerializer,
    SkillSerializer,
    TestimonialSerializer,
    ProjectSerializer,
)


# Get all the data required for layout in profile
def getLayoutData(user):
    data = {
        # SEO
        "site_title": user.user_profile.site_title,
        "favicon": f"/media/{user.user_profile.favicon.name}",
        "meta_description": user.user_profile.meta_description,
        #
        "name": user.name,
        "profile_picture": f"/media/{user.user_profile.profile_picture.name}",
        "my_positions": user.user_profile.my_positions,
        "display_resume": user.user_profile.display_resume,
        "display_portfolio": user.user_profile.display_portfolio,
        "display_blog": user.user_profile.display_blog,
        "display_appointments": user.user_profile.display_appointments,
    }

    return data


def getHomeSectionData(user):
    data = {
        "layout": getLayoutData(user),
        "section": {
            "name": user.name,
            "my_positions": user.user_profile.my_positions,
            "start_page_background": "/media/"
            + str(user.user_profile.start_page_background.name),
        },
    }

    return data


def getAboutMeSectionData(user):

    display_services = user.user_profile.display_services
    display_fun_facts = user.user_profile.display_fun_facts
    display_pricing_plans = user.user_profile.display_pricing_plans
    display_testimonials = user.user_profile.display_testimonials
    display_clients = user.user_profile.display_clients

    data = {
        "layout": getLayoutData(user),
        "section": {
            "name": user.name,
            "about_me_image": f"/media/{user.user_profile.about_me_image}",
            "nationality": user.user_profile.nationality,
            "about_me": user.user_profile.about_me,
            "experience": user.user_profile.experience,
            "projects": user.user_profile.projects,
            "meetings": user.user_profile.meetings,
            "why_hire_me": user.user_profile.why_hire_me,
            "video_description": user.user_profile.video_description,
            # display
            "display_services": display_services,
            "display_fun_facts": display_fun_facts,
            "display_pricing_plans": display_pricing_plans,
            "display_testimonials": display_testimonials,
            "display_clients": display_clients,
        },
    }

    # services
    if display_services:
        services = ServiceSerializer(
            instance=user.user_profile.services.all(),
            many=True,
        )
        data["section"]["services"] = services.data

    # fun facts
    if display_fun_facts:
        data["section"]["happy_clients"] = user.user_profile.happy_clients
        data["section"]["awards_won"] = user.user_profile.awards_won

    # pricing plan
    if display_pricing_plans:
        pricingPlans = PricingPlanSerializer(
            instance=user.user_profile.pricing_plans.filter(display_plan=True),
            many=True,
        )
        data["section"]["pricing_plans"] = pricingPlans.data

    # testimonial
    if display_testimonials:
        testimonials = TestimonialSerializer(
            instance=user.user_profile.testimonials.all(),
            many=True,
        )
        data["section"]["testimonials"] = testimonials.data

    # client
    if display_clients:
        clients = ClientSerializer(
            instance=user.user_profile.clients.all(),
            many=True,
        )
        data["section"]["clients"] = clients.data

    return data


def getContactMeSectionData(user):
    data = {
        "layout": getLayoutData(user),
        "section": {
            "display_contact_form": user.user_profile.display_contact_form,
            "contact_form_image": "/media/"
            + str(user.user_profile.contact_form_image),
            "phone": user.user_profile.phone,
            "email": user.user_profile.email,
            "address": user.user_profile.address,
            # map
            "gmap_iframe": user.user_profile.gmap_iframe,
            # follow me
            "follow_me": {
                "facebook": user.user_profile.facebook,
                "twitter": user.user_profile.twitter,
                "instagram": user.user_profile.instagram,
                "whatsapp": user.user_profile.whatsapp,
                "youtube": user.user_profile.youtube,
                "linkedin": user.user_profile.linkedin,
                "snapchat": user.user_profile.snapchat,
                "github": user.user_profile.github,
                "pinterest": user.user_profile.pinterest,
                "reddit": user.user_profile.reddit,
                "stackoverflow": user.user_profile.stackoverflow,
                "behance": user.user_profile.behance,
                "skype": user.user_profile.skype,
                "vimeo": user.user_profile.vimeo,
                "codepen": user.user_profile.codepen,
                "dribble": user.user_profile.dribble,
                "dropbox": user.user_profile.dropbox,
                "flickr": user.user_profile.flickr,
                "rss": user.user_profile.rss,
                "soundcloud": user.user_profile.soundcloud,
                "tumblr": user.user_profile.tumblr,
                "yelp": user.user_profile.yelp,
            },
        },
    }

    return data


def getResumeSectionData(user):

    # if resume is not displayed then don't add additional resources
    if not user.user_profile.display_resume:
        return {"display_resume": False, "layout": {}, "section": {}}

    experiences = ExperienceSerializer(
        instance=user.user_profile.experiences.all(),
        many=True,
    )

    """
    skills: [
        {
            "category": "Work Skills",
            "skills": [
                {
                    "title": "PHP",
                    "level": 80
                },
                {
                    "title": "PHP",
                    "level": 80
                },
                ..
            ],
            ...
        }
    ]
    """
    skillCategories = user.user_profile.skill_categories.all()
    skills = []
    for category in skillCategories:
        serializer = SkillSerializer(instance=category.skills.all(), many=True)
        skill = {
            "category": category.title,
            "skills": serializer.data,
        }
        skills.append(skill)

    educations = EducationSerializer(
        instance=user.user_profile.educations.all(),
        many=True,
    )

    resume = user.user_profile.resume.name
    if resume == "":
        resume = None
    else:
        resume = f"/media/{resume}"

    data = {
        "display_resume": True,
        "layout": getLayoutData(user),
        "section": {
            "resume": resume,
            "experiences": experiences.data,
            "skills_categories": skills,
            "educations": educations.data,
        },
    }

    return data


def getPortfolioSectionData(user):

    # if portfolio is not displayed then don't add additional resources
    if not user.user_profile.display_portfolio:
        return {"display_portfolio": False, "layout": {}, "section": {}}

    portfolios = ProjectShortSerializer(
        instance=user.user_profile.user_profile_projects.filter(
            display_project=True
        ),
        many=True,
    )

    categories = [
        {
            "name": category.title,
            "count": category.category_projects.filter(
                display_project=True
            ).count(),
        }
        for category in user.user_profile.project_categories.all()
    ]

    data = {
        "display_portfolio": True,
        "layout": getLayoutData(user),
        "section": {
            "categories": categories,
            "portfolios": portfolios.data,
        },
    }

    return data


def getPortfolioDetailSectionData(user, portfolio):

    # if portfolio is not displayed then don't add additional resources
    if not user.user_profile.display_portfolio:
        return {"display_portfolio": False, "layout": {}, "section": {}}

    portfolioData = ProjectSerializer(instance=portfolio).data

    category = portfolio.category
    related_projects = Project.objects.filter(category=category).exclude(
        id=portfolio.id
    )
    if related_projects.count() > 2:
        related_projects = related_projects[:2]
    related_projects_data = ProjectShortSerializer(
        instance=related_projects, many=True
    ).data

    data = {
        "display_portfolio": True,
        "layout": getLayoutData(user),
        "section": {
            "portfolio": portfolioData,
            "related_projects": related_projects_data,
        },
    }

    return data