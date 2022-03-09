from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import Union, Any

from api.crud.words import Word_Crud
from db.database import get_db
from db.session import DBSession
from schemas.word_schema import Word_IN, Word_Out, Empty_Word, \
                                Word_Base, Language_IN_JSON, \
                                Word_IN_JSON

from utils.superuser_validation import superuser_validation

router = APIRouter()
crud = Word_Crud(db=DBSession())

@router.post('/add-language/')
def add_language(language_in_json: Language_IN_JSON, db:Session = Depends(get_db)):
    ''' 
    Endpoint for manual language inclusding.

    {
        "Superuser":"username", 
        "Token":"A+V@LID=T0K3N",
        "language": "lan", // three character label
    }
    '''
    if (not superuser_validation(language_in_json, db) ):
         return status.HTTP_401_UNAUTHORIZED
    return crud.add_language(language=language_in_json.language)


@router.post('/add-word/')
async def add_word(word_in_json: Word_IN_JSON, db:Session = Depends(get_db)):
    '''
    Endpoint for manual word including.

    {
    "Superuser":"username", 
    "Token":"A+V@LID=T0K3N",
    "word":"aword",
    "hint": [ {} ] , // optional
    "lang": "lan", // three character label
    }
    '''
    if (not superuser_validation(word_in_json, db) ):
         return status.HTTP_401_UNAUTHORIZED
    return crud.add_one(word_in)


@router.get('/list-languages/')
def list_languages(db:Session = Depends(get_db)):
    '''
    Endpoint for listing Database registered languages.
    '''
    response = crud.list_languages()
    return response


@router.post('/info/',response_model= Union[Empty_Word, Word_Out, Any])
def get_word_info(request:Word_Base, db:Session = Depends(get_db)):
    '''
    Return the information of a given word from Word Bank.

    {
        "word":"aword" //desired word request
    }
    '''
    return crud.get_word(request)


@router.get('/lucky-word/')
def get_random_word(db:Session = Depends(get_db)):
    '''
    Return a Random Word.
    '''
    result = crud.get_random_word()
    return {"word":result.word,
            "playword":result.playword, 
            "letters":result.letters,
            "language":crud.get_language_by_id(result.language_id).language}
