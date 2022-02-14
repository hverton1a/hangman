from fastapi import APIRouter
from db.session import DBSession

from api.crud.words import Word_Crud

router = APIRouter()
crud = Word_Crud(db=DBSession())

from fastapi.responses import FileResponse
import os

file=os.path.abspath('./hangman.sql')

@router.get('/db/')
async def serve_db():
    #return(file)
    return FileResponse(file)