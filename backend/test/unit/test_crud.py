from unittest import TestCase
import os
from db.session import DBSession
from models.word_model import Language
from api.crud.words import Word_Crud
#from schemas.word_schema import Word_IN

class Test_Crud(TestCase):
    def setUp(self) -> None:
        self.db = DBSession()
        self.crud = Word_Crud(db=self.db)

    def test_list_languages(self):
        self.assertEqual(self.crud.list_languages(),self.db.query(Language).all())
        
    def test_word_crud_add_language(self):
        result_id = self.crud.add_language("esp")
        self.assertEqual(result_id, 
                            (self.db.query(Language).
                                    filter(Language.language=="esp")).first().id)


