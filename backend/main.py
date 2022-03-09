from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn

from api.endpoints.router import router
from config.settings import DOMAIN_PORT
description = """
Hangman API.

BackEnd for a Hangman Game.

Developed with Docker, Python (FastAPI,
SqlAlchemy, Alembic, Pydantic) 
Mysql.


The game is served by a websocket connection, 
and http for the others endpoints


You will be able to:

#Play An Awesome Hangman Game, with a Random Word.

At this point only Portuguese Words are available, scrapped
from  Dico - https://www.dicio.com.br.

The WordScrapper implemmented can be customized with various "Recipes",
enabling scrap another dictionary sites/api of any alphabetic
language.

* **Create users** (_not implemented_).
* **Read users** (_not implemented_).
"""

app = FastAPI(
    title="Hangman Game",
    description=description,
    version="0.8.0",
    contact={
        "name": "Hangman Game API",
        "url": "https://hangman-chi.vercel.app/",
        "email": "hev.dev.proj@gmail.com",
    }
)
app.mount("/static", StaticFiles(directory='static'), name='static')
app.include_router(router)

if __name__ == '__main__':
    try:
        DOMAIN_PORT=int(DOMAIN_PORT)
    except:
        print("invalid domain port, using default 3000")
        DOMAIN_PORT=3000

    uvicorn.run("main:app", host="0.0.0.0", port=DOMAIN_PORT, reload=True)
