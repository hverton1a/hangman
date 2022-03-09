from pydantic import BaseModel

class Superuser_IN(BaseModel):
    superuser: str
    token: str