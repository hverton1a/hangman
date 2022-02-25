from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.session import DBSession

from typing import Any

router = APIRouter()

# TODO implement a user registration 
@app.post('/user_register', response_model=Any)
def user_register(db:Session = Depends(get_db)):
    return {}

# TODO implement a user authentication, for the api and token for the frontend
@app.post('/login', response_model=Any)
def user_login(db:Session = Depends(get_db)):
    return {}