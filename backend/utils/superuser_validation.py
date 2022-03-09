from fastapi import Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.session import DBSession
from schemas.scrap_schema import Scrap_Words_JSON
   
db = DBSession()

def superuser_validation(form: Scrap_Words_JSON, db=Depends(get_db)):
    query =  (db.query(Superuser, Token)
            .filter(Superuser.superuser == \
                        scrap_words_JSON.superuser)
            .filter(Token.token == \
                        scrap_words_JSON.token)
                        ).first()

    return query