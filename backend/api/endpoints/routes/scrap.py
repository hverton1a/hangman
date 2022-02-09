from fastapi import APIRouter
from db.session import DBSession

from api.crud.words import Word_Crud


from bs4 import BeautifulSoup
from utils.word_scraper import Word_Scraper
from utils.scrap_recipes import catalog


router = APIRouter()
crud = Word_Crud(db=DBSession())

# ! Implement an Authenticate and authorized requirement to access scraping


@router.get('/list-recipes/')
def get_recipe_list():
    return {"recipes":[recipe for recipe in catalog.keys()]}


# TODO Implement a Pub/sub worker to handle the scraping and storing
'''
@router.post('/scrap-words/{recipe}')
def scrap_words(recipe:str):
    scraper = Word_Scraper(catalog['Dicio'], BeautifulSoup)

    result = scraper.scrap_words()
    crud.add_many(result)
    return result
'''