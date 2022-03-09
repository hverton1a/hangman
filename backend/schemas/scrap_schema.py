from pydantic import BaseModel
from .superuser_schema import Superuser_IN

class Scrap_Words_JSON(Superuser_IN):
        recipe: str
        class Config:
            orm_mode= True