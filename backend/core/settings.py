from datetime import timedelta
from pathlib import Path
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=False, cast=bool)

ALLOWED_HOSTS = str(config("ALLOWED_HOSTS")).split(" ")


# Application definition
MY_APPS = [
    "accounts",
    "resume",
]

THIRD_PARTY_APPS = [
    "corsheaders",
    "rest_framework",
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    *MY_APPS,
    *THIRD_PARTY_APPS,
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ALLOWED_ORIGINS = str(config("CORS_ALLOWED_ORIGINS")).split(" ")

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# set PYTHONIOENCODING=utf-8

# python manage.py dumpdata --format=json --indent=4
# accounts.UserAccount > fixtures/user.json

# python manage.py dumpdata resume --format=json --indent=4
# > fixtures/resume.json
# comment out all the signals for this time

# python manage.py loaddata fixtures/user.json
# python manage.py loaddata fixtures/resume.json

# uncomment all the signal code


# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation."
        + "UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation."
        + "MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation."
        + "CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation."
        + "NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = "en-us"

# TIME_ZONE = "UTC"
TIME_ZONE = "Asia/Kolkata"

USE_I18N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "static_files"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "upload"

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom Model
AUTH_USER_MODEL = "accounts.UserAccount"

# Rest framework
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination."
    + "PageNumberPagination",
    "PAGE_SIZE": 10,
    # 'EXCEPTION_HANDLER': 'core.resume.utils.custom_exception_handler'
}
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=10),
}

FILE_UPLOAD_PERMISSIONS = 0o640

# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'filters': {
#         'require_debug_false': {
#             '()': 'django.utils.log.RequireDebugFalse'
#         }
#     },
#     'handlers': {
#         'mail_admins': {
#             'level': 'ERROR',
#             'filters': ['require_debug_false'],
#             'class': 'django.utils.log.AdminEmailHandler'
#         }
#     },
#     'loggers': {
#         'django.request': {
#             'handlers': ['mail_admins'],
#             'level': 'ERROR',
#             'propagate': True,
#         },
#     }
# }

# if DEBUG is False:
#     LOGGING = {
#         "version": 1,
#         "disable_existing_loggers": False,
#         "formatters": {
#             "verbose": {
#                 "format": "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] "
#                 + "%(message)s",
#                 "datefmt": "%d/%b/%Y %H:%M:%S",
#             },
#             "simple": {"format": "%(levelname)s %(message)s"},
#         },
#         "handlers": {
#             "file": {
#                 "level": "DEBUG",
#                 "class": "logging.FileHandler",
#                 "filename": "log/log.log",
#                 "formatter": "verbose",
#             },
#         },
#         "loggers": {
#             "django": {
#                 "handlers": ["file"],
#                 "propagate": True,
#                 "level": "DEBUG",
#             },
#             "MYAPP": {
#                 "handlers": ["file"],
#                 "level": "DEBUG",
#             },
#         },
#     }
