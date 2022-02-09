import os
from pydantic import BaseSettings
from dotenv import load_dotenv


load_dotenv(".env")
DB_PASSWORD=os.getenv("DB_PASSWORD")
DB_DIALECT=os.getenv("DB_DIALECT")
DB_USER=os.getenv("DB_USER")
DB_HOST=os.getenv("DB_HOST")
DB_PORT=os.getenv("DB_PORT")
DB_NAME=os.getenv("DB_NAME")


class SQLAlchemy(BaseSettings):
    DATABASE_URI: str = f'{DB_DIALECT}://{DB_USER}:{DB_PASSWORD}@'+\
        f'{DB_HOST}:{DB_PORT}/{DB_NAME}'


class Scraper(BaseSettings):
    DEFAULT_URL = 'https://dicio.com.br/lista-de-palavras'
    DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWYZ'
    DEFAULT_LANGUAGE = 'por'
    SHOW_UP_TO = 20
    VALID_LANGUAGES = ('por', 'eng')

    INVALID_LANGUAGE_MESSAGE = 'Invalid language. \n' + \
                             f'The accepted languages are: {VALID_LANGUAGES}'

sqlalchemy_cfg = SQLAlchemy()
scraper_cfg = Scraper()