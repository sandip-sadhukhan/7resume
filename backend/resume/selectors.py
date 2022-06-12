from typing import Any
from django.db.models import Q
from django.shortcuts import get_object_or_404
from accounts.models import UserAccount
from .models import (
    Blog,
    BlogCategory,
    Education,
    Experiences,
    PricingPlan,
    Project,
    ProjectCategory,
    Service,
    Tags,
    UserProfile,
)
from . import serializers, services


def findUserFromUsername(username: str) -> UserAccount:
    user = get_object_or_404(UserAccount, username=username)
    return user


# Get all the data required for layout in profile
def getLayoutData(*, user: UserAccount) -> dict[str, Any]:
    """Get All the repetitive data for layout in user profile"""
    data = {
        # SEO
        "site_title": user.user_profile.site_title,  # type: ignore
        "favicon": f"/media/{user.user_profile.favicon.name}",  # type: ignore
        "meta_description": user.user_profile.meta_description,  # type: ignore
        # User data
        "name": user.name,
        "profile_picture": f"/media/{user.user_profile.profile_picture.name}",  # type: ignore
        "my_positions": user.user_profile.my_positions,  # type: ignore
        "display_resume": user.user_profile.display_resume,  # type: ignore
        "display_portfolio": user.user_profile.display_portfolio,  # type: ignore
        "display_blog": user.user_profile.display_blog,  # type: ignore
        "display_appointments": user.user_profile.display_appointments,  # type: ignore
    }

    return data


def getHomeSectionData(*, username: str) -> dict[str, Any]:
    "Get all the data related to home section of user profile"
    user = findUserFromUsername(username=username)

    data = {
        "layout": getLayoutData(user=user),
        "section": {
            "name": user.name,
            "my_positions": user.user_profile.my_positions,  # type: ignore
            "start_page_background": "/media/"
            + str(user.user_profile.start_page_background.name),  # type: ignore
        },
    }
    return data


def getAboutMeSectionData(*, username: str) -> dict[str, Any]:
    """Get all the data related to about me section of user profile"""
    user = findUserFromUsername(username=username)

    display_services = user.user_profile.display_services  # type: ignore
    display_fun_facts = user.user_profile.display_fun_facts  # type: ignore
    display_pricing_plans = user.user_profile.display_pricing_plans  # type: ignore
    display_testimonials = user.user_profile.display_testimonials  # type: ignore
    display_clients = user.user_profile.display_clients  # type: ignore

    data = {
        "layout": getLayoutData(user=user),
        "section": {
            "name": user.name,
            "about_me_image": f"/media/{user.user_profile.about_me_image}",  # type: ignore
            "nationality": user.user_profile.nationality,  # type: ignore
            "about_me": user.user_profile.about_me,  # type: ignore
            "experience": user.user_profile.experience,  # type: ignore
            "projects": user.user_profile.projects,  # type: ignore
            "meetings": user.user_profile.meetings,  # type: ignore
            "why_hire_me": user.user_profile.why_hire_me,  # type: ignore
            "video_description": user.user_profile.video_description,  # type: ignore
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
        services = serializers.ServiceSerializer(
            instance=user.user_profile.services.all(),  # type: ignore
            many=True,
        )
        data["section"]["services"] = services.data

    # fun facts
    if display_fun_facts:
        data["section"]["happy_clients"] = user.user_profile.happy_clients  # type: ignore
        data["section"]["awards_won"] = user.user_profile.awards_won  # type: ignore

    # pricing plan
    if display_pricing_plans:
        pricingPlans = serializers.PricingPlanSerializer(
            instance=user.user_profile.pricing_plans.filter(display_plan=True),  # type: ignore
            many=True,
        )
        data["section"]["pricing_plans"] = pricingPlans.data

    # testimonial
    if display_testimonials:
        testimonials = serializers.TestimonialSerializer(
            instance=user.user_profile.testimonials.all(),  # type: ignore
            many=True,
        )
        data["section"]["testimonials"] = testimonials.data

    # client
    if display_clients:
        clients = serializers.ClientSerializer(
            instance=user.user_profile.clients.all(),  # type: ignore
            many=True,
        )
        data["section"]["clients"] = clients.data

    return data


def getContactMeSectionData(*, username: str) -> dict[str, Any]:
    "Get all the data related to contact me section of user profile"
    user = findUserFromUsername(username=username)

    data = {
        "layout": getLayoutData(user=user),
        "section": {
            "display_contact_form": user.user_profile.display_contact_form,  # type: ignore
            "contact_form_image": "/media/"
            + str(user.user_profile.contact_form_image),  # type: ignore
            "phone": user.user_profile.phone,  # type: ignore
            "email": user.user_profile.email,  # type: ignore
            "address": user.user_profile.address,  # type: ignore
            # map
            "gmap_iframe": user.user_profile.gmap_iframe,  # type: ignore
            # follow me
            "follow_me": {
                "facebook": user.user_profile.facebook,  # type: ignore
                "twitter": user.user_profile.twitter,  # type: ignore
                "instagram": user.user_profile.instagram,  # type: ignore
                "whatsapp": user.user_profile.whatsapp,  # type: ignore
                "youtube": user.user_profile.youtube,  # type: ignore
                "linkedin": user.user_profile.linkedin,  # type: ignore
                "snapchat": user.user_profile.snapchat,  # type: ignore
                "github": user.user_profile.github,  # type: ignore
                "pinterest": user.user_profile.pinterest,  # type: ignore
                "reddit": user.user_profile.reddit,  # type: ignore
                "stackoverflow": user.user_profile.stackoverflow,  # type: ignore
                "behance": user.user_profile.behance,  # type: ignore
                "skype": user.user_profile.skype,  # type: ignore
                "vimeo": user.user_profile.vimeo,  # type: ignore
                "codepen": user.user_profile.codepen,  # type: ignore
                "dribble": user.user_profile.dribble,  # type: ignore
                "dropbox": user.user_profile.dropbox,  # type: ignore
                "flickr": user.user_profile.flickr,  # type: ignore
                "rss": user.user_profile.rss,  # type: ignore
                "soundcloud": user.user_profile.soundcloud,  # type: ignore
                "tumblr": user.user_profile.tumblr,  # type: ignore
                "yelp": user.user_profile.yelp,  # type: ignore
            },
        },
    }

    return data


def getResumeSectionData(*, username: str) -> dict[str, Any]:
    """Get all the data related to resume section"""
    user = findUserFromUsername(username=username)

    # if resume is not displayed then don't add additional resources
    if not user.user_profile.display_resume:  # type: ignore
        return {"display_resume": False, "layout": {}, "section": {}}

    experiences = serializers.ExperienceSerializer(
        instance=user.user_profile.experiences.all(),  # type: ignore
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
    skillCategories = user.user_profile.skill_categories.all()  # type: ignore
    skills = []
    for category in skillCategories:
        serializer = serializers.SkillSerializer(
            instance=category.skills.all(), many=True
        )
        skill = {
            "category": category.title,
            "skills": serializer.data,
        }
        skills.append(skill)

    educations = serializers.EducationSerializer(
        instance=user.user_profile.educations.all(),  # type: ignore
        many=True,
    )

    resume = user.user_profile.resume.name  # type: ignore
    if resume == "":
        resume = None
    else:
        resume = f"/media/{resume}"

    data = {
        "display_resume": True,
        "layout": getLayoutData(user=user),
        "section": {
            "resume": resume,
            "experiences": experiences.data,
            "skills_categories": skills,
            "educations": educations.data,
        },
    }

    return data


def getPortfolioSectionData(*, username: str) -> dict[str, Any]:
    """Get all the data related to portfolio section"""
    user = findUserFromUsername(username=username)

    # if portfolio is not displayed then don't add additional resources
    if not user.user_profile.display_portfolio:  # type: ignore
        return {"display_portfolio": False, "layout": {}, "section": {}}

    portfolios = serializers.ProjectShortSerializer(
        instance=user.user_profile.user_profile_projects.filter(  # type: ignore
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
        for category in user.user_profile.project_categories.all()  # type: ignore
    ]

    data = {
        "display_portfolio": True,
        "layout": getLayoutData(user=user),
        "section": {
            "categories": categories,
            "portfolios": portfolios.data,
        },
    }

    return data


def getRelatedPortfolios(*, portfolio: Project) -> dict[str, Any]:
    """Get the 2 related posts of a portfolio"""
    category = portfolio.category
    related_projects = Project.objects.filter(
        category=category,
        user_profile=portfolio.user_profile,
    ).exclude(
        id=portfolio.id,  # type: ignore
    )
    if related_projects.count() > 2:
        related_projects = related_projects[:2]
    related_projects_data = serializers.ProjectShortSerializer(
        instance=related_projects, many=True
    ).data

    return related_projects_data


def getPortfolioDetailSectionData(*, username: str, slug: str):
    """Get all the data related to single portfolio page"""
    user = findUserFromUsername(username=username)
    userProfile: UserProfile = user.user_profile  # type: ignore

    portfolio = get_object_or_404(
        Project,
        slug=slug,
        display_project=True,
        user_profile=userProfile,  # type: ignore
    )

    # if portfolio is not displayed then don't add additional resources
    if not user.user_profile.display_portfolio:  # type: ignore
        return {
            "display_portfolio": False,
            "layout": {},
            "section": {},
        }

    portfolioData = serializers.ProjectSerializer(instance=portfolio).data

    related_projects = getRelatedPortfolios(portfolio=portfolio)

    data = {
        "display_portfolio": True,
        "layout": getLayoutData(user=user),
        "section": {
            "portfolio": portfolioData,
            "related_projects": related_projects,
        },
    }

    return data


def getBlogSectionData(*, username: str) -> dict[str, Any]:
    """Get all the data related to blog page"""
    user = findUserFromUsername(username=username)
    userProfile: UserProfile = user.user_profile  # type: ignore

    if not userProfile.display_blog:
        return {
            "display_blog": False,
            "layout": {},
            "section": {},
        }

    blogs = serializers.BlogShortSerializer(
        instance=userProfile.user_profile_blogs.filter(  # type: ignore
            display_article=True
        ),
        many=True,
    )

    data = {
        "display_blog": True,
        "layout": getLayoutData(user=user),
        "section": {
            "blogs": blogs.data,
        },
    }

    return data


def getRelatedBlogs(*, blog: Blog) -> dict[str, Any]:
    """Get the 4 related posts of a blog"""
    category = blog.category
    related_posts = Blog.objects.filter(
        category=category,
        user_profile=blog.user_profile,
    ).exclude(
        id=blog.id,  # type: ignore
    )
    if related_posts.count() > 4:
        related_posts = related_posts[:4]
    related_posts_data = serializers.BlogShortGridSerializer(
        instance=related_posts, many=True
    ).data

    return related_posts_data


def getLatestBlogs(
    *, userProfile: UserProfile, blog: Blog | None = None
) -> dict[str, Any]:
    """Get the 4 latest posts of a blog"""
    latest_posts = Blog.objects.filter(
        user_profile=userProfile,
    )

    if blog is not None:
        latest_posts = latest_posts.exclude(
            id=blog.id,  # type: ignore
        )
    if latest_posts.count() > 4:
        latest_posts = latest_posts[:4]
    latest_posts_data = serializers.BlogShortGridSerializer(
        instance=latest_posts, many=True
    ).data

    return latest_posts_data


def getTagClouds(*, userProfile: UserProfile) -> dict[str, Any]:
    """get tag cloud - last 10 tag"""
    tag_cloud = Tags.objects.filter(user_profile=userProfile)
    tag_cloud_serializer = serializers.TagSerializer(
        instance=tag_cloud, many=True
    )

    return tag_cloud_serializer.data


def getAllCategories(*, userProfile: UserProfile) -> list[dict[str, Any]]:
    """Get all category for a user"""
    all_categories = [
        {
            "name": category.title,
            "count": category.category_blogs.filter(
                display_article=True
            ).count(),
        }
        for category in userProfile.blog_categories.all()  # type: ignore
    ]

    return all_categories


def getBlogDetailSectionData(*, username: str, slug: str) -> dict[str, Any]:
    """Get data for single blog page"""
    user = findUserFromUsername(username=username)
    userProfile: UserProfile = user.user_profile  # type: ignore

    if not userProfile.display_blog:
        return {
            "display_blog": False,
            "layout": {},
            "section": {},
        }

    # main blog
    blog = get_object_or_404(
        Blog,
        slug=slug,
        display_article=True,
        user_profile=userProfile,
    )
    blogSerializer = serializers.BlogSerializer(instance=blog)

    related_posts = getRelatedBlogs(blog=blog)
    latest_posts = getLatestBlogs(userProfile=userProfile, blog=blog)

    allCategories = getAllCategories(userProfile=userProfile)

    tagCloud = getTagClouds(userProfile=userProfile)

    data = {
        "display_blog": True,
        "layout": getLayoutData(user=user),
        "section": {
            "blog": blogSerializer.data,
            "site_title": userProfile.site_title,
            "related_posts": related_posts,
            "all_categories": allCategories,
            "latest_posts": latest_posts,
            "tag_cloud": tagCloud,
        },
    }

    # increse blog view
    services.increaseBlogViewCounter(blog)

    return data


def getBlogSearchData(*, username: str, query: str) -> dict[str, Any]:
    user = findUserFromUsername(username=username)
    userProfile: UserProfile = user.user_profile  # type: ignore

    if not userProfile.display_blog:
        return {"display_blog": False, "layout": {}, "section": {}}

    blogs = (
        Blog.objects.filter(user_profile=userProfile)
        .filter(
            Q(tags__title__iexact=query)
            | Q(title__icontains=query)
            | Q(short_description__icontains=query)
            | Q(meta_description__icontains=query)
        )
        .distinct()
    )
    serializer = serializers.BlogShortSerializer(instance=blogs, many=True)

    # latest_posts
    latestPosts = getLatestBlogs(userProfile=userProfile)

    allCategories = getAllCategories(userProfile=userProfile)

    # tag cloud - last 10 tag
    tagClouds = getTagClouds(userProfile=userProfile)

    data = {
        "display_blog": True,
        "layout": getLayoutData(user=user),
        "section": {
            "blogs": serializer.data,
            "latest_posts": latestPosts,
            "all_categories": allCategories,
            "tag_cloud": tagClouds,
        },
    }

    return data


def getBlogCategoryData(*, username: str, categoryName: str) -> dict[str, Any]:
    user = findUserFromUsername(username=username)
    userProfile: UserProfile = user.user_profile  # type: ignore

    if not userProfile.display_blog:
        return {
            "display_blog": False,
            "layout": {},
            "section": {},
        }

    category = get_object_or_404(
        BlogCategory,
        user_profile=userProfile,
        title__iexact=categoryName,
    )
    blogs = Blog.objects.filter(
        user_profile=userProfile,
        category=category,
    )

    serializer = serializers.BlogShortSerializer(instance=blogs, many=True)

    latestPosts = getLatestBlogs(userProfile=userProfile)
    allCategories = getAllCategories(userProfile=userProfile)
    tagClouds = getTagClouds(userProfile=userProfile)

    data = {
        "display_blog": True,
        "layout": getLayoutData(user=user),
        "section": {
            "blogs": serializer.data,
            "latest_posts": latestPosts,
            "all_categories": allCategories,
            "tag_cloud": tagClouds,
        },
    }
    return data


def getAppointmentSectionData(*, username: str) -> dict[str, Any]:
    user = findUserFromUsername(username=username)
    userProfile: UserProfile = user.user_profile  # type: ignore

    if not userProfile.display_appointments:
        return {
            "display_appointments": False,
            "layout": {},
            "section": {},
        }

    appointment = serializers.AppointmentSerializer(
        instance=userProfile.appointment,  # type: ignore
    )

    data = {
        "display_appointments": True,
        "layout": getLayoutData(user=user),
        "section": {
            "appointment": appointment.data,
        },
    }

    return data


### DASHBOARD ####
def getStatisticsData(*, user: UserAccount) -> dict[str, Any]:
    """Get the data for statistics page"""
    userProfile: UserProfile = user.user_profile  # type: ignore

    views = 0
    for blog in userProfile.user_profile_blogs.all():  # type: ignore
        views += blog.views

    services = userProfile.services.count()  # type: ignore
    clients = userProfile.clients.count()  # type: ignore
    projects = userProfile.user_profile_projects.count()  # type: ignore
    blog_posts = userProfile.user_profile_blogs.count()  # type: ignore
    testimonials = userProfile.testimonials.count()  # type: ignore
    skills = userProfile.skills.count()  # type: ignore
    messages = userProfile.messages.count()  # type: ignore

    data = {
        "views": views,
        "services": services,
        "clients": clients,
        "projects": projects,
        "blog_posts": blog_posts,
        "testimonials": testimonials,
        "skills": skills,
        "messages": messages,
    }
    return data


def getEditProfileData(*, user: UserAccount) -> dict[str, Any]:
    data = {
        "name": user.name,
        "username": user.username,
        "email": user.email,
    }

    return data


def getService(
    *,
    user: UserAccount,
    serviceId: int,
) -> Service:
    userProfile: UserProfile = user.user_profile  # type: ignore

    service = get_object_or_404(
        Service,
        user_profile=userProfile,
        id=serviceId,
    )

    return service


def getPricingPlan(
    *,
    user: UserAccount,
    pricingPlanId: int,
) -> PricingPlan:
    userProfile: UserProfile = user.user_profile  # type: ignore

    pricingPlan = get_object_or_404(
        PricingPlan,
        user_profile=userProfile,
        id=pricingPlanId,
    )

    return pricingPlan


def getEducation(
    *,
    user: UserAccount,
    educationId: int,
) -> Education:
    userProfile: UserProfile = user.user_profile  # type: ignore

    education = get_object_or_404(
        Education,
        user_profile=userProfile,
        id=educationId,
    )

    return education


def getExperience(
    *,
    user: UserAccount,
    experienceId: int,
) -> Experiences:
    userProfile: UserProfile = user.user_profile  # type: ignore

    experience = get_object_or_404(
        Experiences,
        user_profile=userProfile,
        id=experienceId,
    )

    return experience


def getProjectCategory(
    *,
    user: UserAccount,
    projectCategoryId: int,
) -> ProjectCategory:
    userProfile: UserProfile = user.user_profile  # type: ignore

    projectCategory = get_object_or_404(
        ProjectCategory,
        user_profile=userProfile,
        id=projectCategoryId,
    )

    return projectCategory


def getProject(
    *,
    user: UserAccount,
    projectId: int,
) -> Project:
    userProfile: UserProfile = user.user_profile  # type: ignore

    project = get_object_or_404(
        Project,
        user_profile=userProfile,
        id=projectId,
    )

    return project


def getBlogCategory(
    *,
    user: UserAccount,
    blogCategoryId: int,
) -> BlogCategory:
    userProfile: UserProfile = user.user_profile  # type: ignore

    blogCategory = get_object_or_404(
        BlogCategory,
        user_profile=userProfile,
        id=blogCategoryId,
    )

    return blogCategory
