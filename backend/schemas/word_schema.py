from pydantic import BaseModel
from typing import Optional, List, Union

class Language_Base(BaseModel):
    language: str
    id: int

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



