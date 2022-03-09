from fastapi import APIRouter, Depends, status
from db.session import DBSession
from sqlalchemy.orm import Session
from db.database import get_db

from api.crud.words import Word_Crud

from bs4 import BeautifulSoup
from utils.word_scraper import Word_Scraper
from utils.scrap_recipes import catalog
from schemas.scrap_schema import Scrap_Words_JSON

from utils.superuser_validation import superuser_validation

#from models.superuser_model import Superuser, Token

router = APIRouter()
crud = Word_Crud(db=DBSession())

@router.get('/list-recipes/')
def get_recipe_list():
    '''
    Return a list of Scrap Recipes Available.
    '''
    return {"recipes":[recipe for recipe in catalog.keys()]}


# TODO Implement a Pub/sub worker to handle the scraping and storing

@router.post('/scrap-words/')
def scrap_words(scrap_words_json: Scrap_Words_JSON, db:Session = Depends(get_db)):
    '''
    Word Bank database update Endpoint.
    Require authenticated user and a valid Token for this operation.

    Receives a JSON:
    {
        "Superuser":"username", 
        "Token":"A+V@LID=T0K3N",
        "Recipe":"a_valid_scrap_recipe", //which will be used by the scrapper
    }
    '''
    '''
    query =  (db.query(Superuser, Token)
                .filter(Superuser.superuser == \
                            scrap_words_JSON.superuser)
                .filter(Token.token == \
                            scrap_words_JSON.token)
                            ).first()'''

    if (not superuser_validation(scrap_words_json, db) ):
         return status.HTTP_401_UNAUTHORIZED

    scraper = Word_Scraper(catalog['Dicio'], BeautifulSoup)

    result = scraper.scrap_words()
    crud.add_many(result)
    return result