from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.session import DBSession

from api.crud.words import Word_Crud

from schemas.word_schema import Word_IN, Word_Out, Empty_Word, Word_Base

from typing import Union, Any


router = APIRouter()
crud = Word_Crud(db=DBSession())


@router.post('/add-language/{language}')
def add_language(language:str, db:Session = Depends(get_db)):
    ''' Test Docstring
    '''
    return crud.add_language(language=language)


@router.post('/add-word/')
async def add_word(word_in:Word_IN, db:Session = Depends(get_db)):
    return crud.add_one(word_in)


@router.get('/list-languages/')
def list_languages(db:Session = Depends(get_db)):
    response = crud.list_languages()
    return response


@router.post('/query/',response_model= Union[Empty_Word, Word_Out, Any])
def get_word(request:Word_Base, db:Session = Depends(get_db)):
    return crud.get_word(request)


@router.get('/lucky-word/')
def get_randomword(db:Session = Depends(get_db)):
    result = crud.get_random_word()
    return {"word":result.word,
            "playword":result.playword, 
            "letters":result.letters,
            "language":crud.get_language_by_id(result.language_id).language}
