from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


# Base Model
class BaseModel(models.Model):
    created_at = models.DateTimeField(
        db_index=True,
        default=timezone.now,
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# User Profile
class UserProfile(BaseModel):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="user_profile",
    )

    # Settings
    # Website Setting
    site_title = models.CharField(
        max_length=200,
        blank=True,
    )
    webmaster_email = models.EmailField(
        max_length=100,
        blank=True,
    )
    favicon = models.ImageField(
        upload_to="favicon/",
        default="favicon/default.png",
    )
    start_page_background = models.ImageField(
        upload_to="start-page-background/",
        default="start-page-background/default.jpg",
    )
    about_me_image = models.ImageField(
        upload_to="about-me-image/",
        default="about-me-image/default.png",
    )
    contact_form_image = models.ImageField(
        upload_to="contact-form-image/",
        default="contact-form-image/default.png",
    )

    # General Settings
    # Display Sections
    display_resume = models.BooleanField(default=True)
    display_portfolio = models.BooleanField(default=True)
    display_blog = models.BooleanField(default=True)
    display_appointments = models.BooleanField(default=True)
    # display part
    display_services = models.BooleanField(default=True)
    display_fun_facts = models.BooleanField(default=True)
    display_pricing_plans = models.BooleanField(default=True)
    display_testimonials = models.BooleanField(default=True)
    display_clients = models.BooleanField(default=True)
    display_contact_form = models.BooleanField(default=True)
    # Blog Page widgets appearance
    blog_allow_search_box = models.BooleanField(default=True)
    blog_allow_categories = models.BooleanField(default=True)
    blog_allow_latest_posts = models.BooleanField(default=True)
    blog_allow_popular_posts = models.BooleanField(default=True)
    # Post Page widgets appearance
    post_allow_search_box = models.BooleanField(default=True)
    post_allow_latest_posts = models.BooleanField(default=True)
    post_allow_related_posts = models.BooleanField(default=True)
    post_allow_tags = models.BooleanField(default=True)
    # Project page widgets appearance
    project_allow_related_posts = models.BooleanField(default=True)

    # SEO
    meta_description = models.TextField(blank=True)

    # About me
    profile_picture = models.ImageField(
        upload_to="profile-pics/",
        default="profile-pics/default.png",
    )
    nationality = models.CharField(max_length=50, blank=True)
    about_me = models.TextField(blank=True)
    my_positions = models.TextField(
        default="Developer\r\nHacker\r\nUI/UX Designer"
    )
    why_hire_me = models.CharField(
        max_length=500,
        default="I'm the best developer in the marketplace",
    )
    video_description = models.CharField(max_length=100, blank=True)
    resume = models.FileField(upload_to="resume/", blank=True)
    # Contact Information
    address = models.TextField(blank=True)
    gmap_iframe = models.CharField(max_length=2000, blank=True)
    phone = models.TextField(blank=True)
    email = models.TextField(blank=True)
    # Statictics
    projects = models.IntegerField(default=0)
    meetings = models.IntegerField(default=0)
    happy_clients = models.IntegerField(default=0)
    awards_won = models.IntegerField(default=0)
    experience = models.IntegerField(default=0)
    # Social Links
    facebook = models.URLField(max_length=200, blank=True)
    twitter = models.URLField(max_length=200, blank=True)
    instagram = models.URLField(max_length=200, blank=True)
    whatsapp = models.URLField(max_length=200, blank=True)
    youtube = models.URLField(max_length=200, blank=True)
    linkedin = models.URLField(max_length=200, blank=True)
    snapchat = models.URLField(max_length=200, blank=True)
    github = models.URLField(max_length=200, blank=True)
    pinterest = models.URLField(max_length=200, blank=True)
    reddit = models.URLField(max_length=200, blank=True)
    stackoverflow = models.URLField(max_length=200, blank=True)
    behance = models.URLField(max_length=200, blank=True)
    skype = models.URLField(max_length=200, blank=True)
    vimeo = models.URLField(max_length=200, blank=True)
    codepen = models.URLField(max_length=200, blank=True)
    dribble = models.URLField(max_length=200, blank=True)
    dropbox = models.URLField(max_length=200, blank=True)
    flickr = models.URLField(max_length=200, blank=True)
    rss = models.URLField(max_length=200, blank=True)
    soundcloud = models.URLField(max_length=200, blank=True)
    tumblr = models.URLField(max_length=200, blank=True)
    yelp = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return str(self.user.email)


class Service(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="services",
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(
        upload_to="services/",
        default="services/default.png",
    )

    def __str__(self):
        return str(self.title)


class PricingPlan(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="pricing_plans",
    )
    display_plan = models.BooleanField(default=True)
    plan_name = models.CharField(max_length=200)
    plan_price = models.CharField(max_length=20)
    price_duration = models.CharField(max_length=50)
    plan_currency = models.CharField(max_length=20)
    is_featured = models.BooleanField(default=False)
    feature_comment = models.CharField(
        max_length=200,
        blank=True,
    )
    features = models.TextField()
    plan_icon = models.ImageField(
        upload_to="plan-icons/",
        default="plan-icons/default.png",
    )

    @property
    def plan_icon_path(self):
        return f"/media/{self.plan_icon.name}"

    def __str__(self):
        return str(self.plan_name)


class Education(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="educations",
    )
    school = models.CharField(max_length=200)
    field = models.CharField(max_length=100)
    image = models.ImageField(upload_to="educations/")
    description = models.TextField(blank=True)
    date_from = models.DateField()
    date_to = models.DateField()
    currently_studying = models.BooleanField(default=False)

    def __str__(self):
        return str(self.school)


class Experiences(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="experiences",
    )
    company = models.CharField(max_length=200)
    image = models.ImageField(upload_to="experiences/")
    position = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date_from = models.DateField()
    date_to = models.DateField()
    currently_working = models.BooleanField(default=False)

    def __str__(self):
        return str(self.company)


class ProjectCategory(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="project_categories",
    )
    title = models.CharField(max_length=100)

    def __str__(self):
        return str(self.title)


class Project(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="user_profile_projects",
    )
    display_project = models.BooleanField(default=True)
    category = models.ForeignKey(
        ProjectCategory,
        on_delete=models.SET_NULL,
        related_name="category_projects",
        null=True,
    )
    title = models.CharField(max_length=200)
    link = models.URLField(
        max_length=500,
        blank=True,
    )
    published = models.DateField()
    featured_image = models.ImageField(
        upload_to="project_feature_images/",
    )
    description = models.TextField()  # markdown field
    meta_description = models.TextField(blank=True)

    def __str__(self):
        return str(self.title)


class Tags(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="tags",
    )
    title = models.CharField(max_length=200)

    def __str__(self):
        return str(self.title)


class BlogCategory(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="blog_categories",
    )
    title = models.CharField(max_length=100)

    def __str__(self):
        return str(self.title)


class Blog(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="user_profile_blogs",
    )
    display_article = models.BooleanField(default=True)
    author = models.CharField(max_length=200)
    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.SET_NULL,
        related_name="category_blogs",
        null=True,
    )
    title = models.CharField(max_length=200)
    short_description = models.TextField()
    description = models.TextField()  # markdown field
    featured_image = models.ImageField(
        upload_to="blog_feature_images/",
    )
    tags = models.ManyToManyField(
        Tags,
        related_name="blogs",
    )
    meta_description = models.TextField(blank=True)

    def __str__(self):
        return str(self.title)


class SkillCategory(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="skill_categories",
    )
    title = models.CharField(max_length=100)

    def __str__(self):
        return str(self.title)


class Skill(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="skills",
    )
    category = models.ForeignKey(
        SkillCategory,
        on_delete=models.SET_NULL,
        related_name="skills",
        null=True,
    )
    title = models.CharField(max_length=100)
    level = models.IntegerField()

    def __str__(self):
        return str(self.title)


class Testimonial(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="testimonials",
    )
    name = models.CharField(max_length=100)
    image = models.ImageField(
        upload_to="testimonial_images/",
    )
    position = models.CharField(max_length=100)
    rating = models.IntegerField(default=5)
    message = models.TextField()

    @property
    def image_path(self):
        return f"/media/{self.image.name}"

    def __str__(self):
        return str(self.name)


class Client(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="clients",
    )
    name = models.CharField(max_length=100)
    image = models.ImageField(
        upload_to="client_images/",
    )

    @property
    def image_path(self):
        return f"/media/{self.image.name}"

    def __str__(self):
        return str(self.name)


class Message(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="messages",
    )
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    message = models.TextField()

    def __str__(self):
        return str(self.name)


class Appointment(BaseModel):
    user_profile = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="appointments",
    )
    sunday = models.BooleanField(default=True)
    sunday_start_time = models.TimeField(blank=True)
    sunday_end_time = models.TimeField(blank=True)
    monday = models.BooleanField(default=True)
    monday_start_time = models.TimeField(blank=True)
    monday_end_time = models.TimeField(blank=True)
    tuesday = models.BooleanField(default=True)
    tuesday_start_time = models.TimeField(blank=True)
    tuesday_end_time = models.TimeField(blank=True)
    wednesday = models.BooleanField(default=True)
    wednesday_start_time = models.TimeField(blank=True)
    wednesday_end_time = models.TimeField(blank=True)
    thursday = models.BooleanField(default=True)
    thursday_start_time = models.TimeField(blank=True)
    thursday_end_time = models.TimeField(blank=True)
    friday = models.BooleanField(default=True)
    friday_start_time = models.TimeField(blank=True)
    friday_end_time = models.TimeField(blank=True)
    saturday = models.BooleanField(default=True)
    saturday_start_time = models.TimeField(blank=True)
    saturday_end_time = models.TimeField(blank=True)

    def __str__(self):
        return str(self.user_profile.user.email)
