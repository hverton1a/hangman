from fastapi import APIRouter

from api.endpoints.routes import game
from api.endpoints.routes import scrap
from api.endpoints.routes import word
from api.endpoints.routes import api
# TODO from api.endpoints.routes import user

router = APIRouter()

router.include_router(word.router, tags=["word"])
router.include_router(scrap.router, tags=["scrap"])
router.include_router(game.router, tags=["game"])
router.include_router(api.router, tags=["api"])
# TODO router.include_router(user.roter, tags=["user"])