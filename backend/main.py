from typing import Any
from fastapi import FastAPI, Depends
from db.database import get_db
from sqlalchemy.orm import Session
from config.settings import DOMAIN_PORT
import uvicorn

from api.endpoints.router import router

app = FastAPI()

# TODO refactor all endpoints to routes and include to router
app.include_router(router)

@app.get('/')
def health_check(db:Session = Depends(get_db)):
    return {"message" : "It's All Good Man"}


if __name__ == '__main__':
    try:
        DOMAIN_PORT=int(DOMAIN_PORT)
    except:
        print("invalid domain port, using default 3000")
        DOMAIN_PORT=3000

    uvicorn.run("main:app", host="0.0.0.0", port=DOMAIN_PORT, reload=True)
