import os
from fastapi import APIRouter
from fastapi.responses import FileResponse


router = APIRouter()

@router.get('/')
def index():
    '''
    Api Landing Page EndPoint.
    '''
    return FileResponse(os.path.abspath('./static/index.html'))

@router.get('/health-check')
def health_check():
    '''
    Health Check Endpoint.
    '''
    return {"message" : "It's All Good Man"}