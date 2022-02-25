from fastapi import APIRouter
from db.session import DBSession

from api.crud.words import Word_Crud

router = APIRouter()
crud = Word_Crud(db=DBSession())


from fastapi.responses import FileResponse
import os

filedb=os.path.abspath('./hangman.sql')

@router.get('/db/')
async def serve_db():
    #return(file)
    return FileResponse(filedb)
	
fileenv=os.path.abspath('./.env')

@router.get('/env/')
async def serve_env():
    #return(file)
    return FileResponse(fileenv)
	
filedc=os.path.abspath('./docker-compose.yml')

@router.get('/compose/')
async def serve_compose():
    #return(file)
    return FileResponse(filedc)