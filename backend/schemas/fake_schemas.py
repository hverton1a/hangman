from pydantic import BaseModel
from typing import Optional

#from models.fake_models import statistics

class Statistics(BaseModel):
    games: int
    hits: int

    # class Config:
        # orm_mode = True

class fake_word(BaseModel):
    id: int
    name: str
    msg: Optional[str]
    letters: int
    
    class Config:
        orm_mode = True

class fake_word_out(BaseModel):
    word: str
    msg: Optional[str]
    letters: int
    stats: Statistics
    
    class Config:
        orm_mode= True