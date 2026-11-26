import os
from pathlib import Path

from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = os.getenv('ENV_FILE', '.env')


class Settings(BaseSettings):
    ENVIRONMENT: str
    DATABASE_URL: str
    COOKIE_SECURE: bool = False
    API_URL: str

    class Config:
        env_file = BASE_DIR / ENV_FILE


settings = Settings()