from pydantic import BaseModel
from typing import Optional, List, Union
from .superuser_schema import Superuser_IN

class Language_Base(BaseModel):
    language: str
    id: int

class Language_IN_JSON(Superuser_IN):
    language: str

class Statistics(BaseModel):
    games: int
    hits: int


class Word_Base(BaseModel):
    word: str
    class Config:
        orm_mode = True


class Empty_Word(BaseModel):
    msg:str


class Word_IN(Word_Base):
    lang: str
    hint: Optional[List[dict]] = None
    class Config:
        orm_mode= True

class Word_IN_JSON(Word_IN,Superuser_IN ):
    pass


class Hint(BaseModel):
    hint: str


class Word_Out(Word_Base):
    lang: int
    sanitarized: str
    letters: int
    statistics: Union[List[Statistics],Statistics]
    hints: Union[List[Hint],Hint]

    class Config:
        orm_mode= True



