from fastapi import APIRouter
from db.session import DBSession

from api.crud.words import Word_Crud

router = APIRouter()
crud = Word_Crud(db=DBSession())

