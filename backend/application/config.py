from datetime import timedelta
import os

class Config():
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class LocalDevelopmentConfig(Config):
    DEBUG = True

    SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback-jwt-secret")

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=2)


    SQLALCHEMY_DATABASE_URI = os.getenv(
            "DATABASE_URL", "sqlite:///blog.db"
        )

