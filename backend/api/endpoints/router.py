from fastapi import APIRouter

from api.endpoints.routes import game
from api.endpoints.routes import scrap
# from api.endpoints.routes import tests
# from api.endpoints.routes import user
from api.endpoints.routes import word


router = APIRouter()

# router.include_router(tests.router, tags=["tests"])
router.include_router(word.router, tags=["word"])
router.include_router(scrap.router, tags=["scrap"])
router.include_router(game.router, tags=["game"])