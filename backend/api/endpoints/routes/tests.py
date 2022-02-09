from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.session import DBSession

from bs4 import BeautifulSoup
from utils.word_scraper import Word_Scraper
from utils.scrap_recipes import catalog, recipe_list


from models.fake_models import fake_word, stats_fake
from models.word_model import Language
from api.crud.words import Word_Crud

from schemas.word_schema import Word_IN
from schemas.fake_schemas import fake_word_out, Statistics
from config.settings import sqlalchemy_cfg

from typing import Union, Dict


router = APIRouter()
crud = Word_Crud(db=DBSession())

@router.get('/db_test', response_model= fake_word_out)
def db_test(db:Session = Depends(get_db)):
    wrd = 'rolamento'
    fk_word = fake_word(
        word = wrd,
        msg = 'apos o rolamento tudo correu bem para ele.',
        letters = len(wrd)
    )
    
    db.add(fk_word)
    db.commit()
    db.refresh(fk_word)

    fk_word = db.query(fake_word).filter(fake_word.word == wrd).first()

    stats = stats_fake(
        games = 13,
        hits = 4,
        word_id = fk_word.id
    )

    db.add_all([stats])
    db.commit()

    db.refresh(fk_word)

    return {"word": fk_word.word,
            "msg": fk_word.msg,
            "letters": fk_word.letters,
            "stats": {"games": stats.games,
                        "hits": stats.hits}}


@router.get('/query/{word}', response_model= Union[fake_word_out, Dict])
def test_get(word:str, db:Session = Depends(get_db) ):

    query = db.query(fake_word, stats_fake)\
            .join(stats_fake)\
            .filter(fake_word.word==word)\
            .first()

    if query is not None:
        response = {"word": query.fake_word.word,
            "msg": query.fake_word.msg,
            "letters": query.fake_word.letters,
            "stats":{"games":query.stats_fake.games,
                     "hits": query.stats_fake.hits}}
    else:
        response = {}
    
    return response
'''
@router.get('/list-recipes/')
def get_recipe_list():
    return {"recipes":[recipe for recipe in catalog.keys()]}

@router.get('/scrap-words/{recipe}')
def scrap_words(recipe:str):
    scraper = Word_Scraper(catalog['Dicio'], BeautifulSoup)

    result = scraper.scrap_words()
    crud.add_one(result[1])
    #return crud.add_many(result[:20])
    return result[1]
'''
