from tkinter import W
from typing import Any
from fastapi import FastAPI, Depends
from db.database import get_db
from sqlalchemy.orm import Session
import uvicorn
from models.word_model import Language

from utils.word_scraper import Word_Scraper
from utils.scrap_recipes import catalog
from bs4 import BeautifulSoup

from api.endpoints.router import router

app = FastAPI()

# TODO refactor all endpoints to routes and include to router
app.include_router(router)


@app.get('/')
def health_check(db:Session = Depends(get_db)):
    return {"message" : "It's All Good Man"}


# TODO a registered and authorized user can send a update request
@app.get('/update_word_bank', response_model=Any)
def update_word_bank(db:Session = Depends(get_db)):
    # TODO instantiate a scraper
    scraper = Word_Scraper(catalog['Dicio'], BeautifulSoup)
    
    result = scraper.store_words(scraper.scrap_words()[:10])

    # TODO start scraping
    # TODO instantiate a word_crud
    # TODO word_crud.add_may(list)
    return {"result":result}

# TODO implement a user registration 
@app.post('/user_register', response_model=Any)
def user_register(db:Session = Depends(get_db)):
    return {}

# TODO implement a user authentication, for the api and token for the frontend
@app.post('/login', response_model=Any)
def user_login(db:Session = Depends(get_db)):
    return {}

# TODO a simple endpoint to get a ramdom word
@app.get('/give_me_a_random_word', response_model=Any)
def get_word(db:Session = Depends(get_db)):
    return {}

# TODO return a list of random words
@app.get('/get_word_list', response_model=Any)
def get_word_list(limit: int = 10, db:Session = Depends(get_db)):
    return {}

# TODO Redirect to the React app page
@app.get('/hangman_game')
def redirect():
    return {}

# TODO Implement the game loop checking que letters imputed and resulting return
@app.websocket('/game')
def game_loop(db:Session = Depends(get_db)):
    return {}


if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)