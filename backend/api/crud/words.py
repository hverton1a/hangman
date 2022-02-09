from sqlalchemy.orm import Session
from models.word_model import Word, Language, Statistics, Hints
from schemas.word_schema import Word_IN, Word_Out, Word_Base, Empty_Word, Language_Base
from typing import List, Union
from unidecode import unidecode
from random  import choice

from db.session import Base


class Crud():
    def __init__(self, db:Session):
        self.db = db

# ! Check optimization methods
class Word_Crud(Crud):
    def __init__(self, db:Session):
        Crud.__init__(self, db=db)

    # ! Not needed to check for every word if the language exists
    def add_one(self, word_in:Word_IN) -> Word_Out:
        language_id = self.add_language(word_in.lang)

        new_word = word_in.word.strip().upper()

        word = Word(word=new_word,
                    language_id = language_id,
                    playword = self.sanitarize(new_word),
                    letters = len(new_word)
                    )

        new_stats = Statistics(games = 0, hits = 0)
        new_hints = Hints(hint = '')

        word.statistics.append(new_stats)
        word.hints.append(new_hints)

        result = self.db.query(Word) \
                .filter(Word.playword == self.sanitarize(new_word)).first()

        if not result:
            result, new_stats, new_hints = self.commit_new_word(word, 
                                                                new_stats, 
                                                                new_hints)

        return {"word":result.word, 
                    "id":result.id, 
                    "hint_id":new_hints.id, 
                    "statistics_id":new_stats.id}


    def commit_new_word(self,word, new_stats, new_hints) \
                                                -> Union[Word,Statistics,Hints]:
        word = self.commit_helper(word)[0]

        new_stats.word_id = word.id
        new_hints.word_id = word.id

        new_stats, new_hints = self.commit_helper(new_stats, new_hints)

        return word, new_stats, new_hints


    def commit_helper(self, *models:Base) -> Base:
        for model in models:
            self.db.add(model)
            self.db.commit()
            self.db.refresh(model)
        return models


    def add_many(self, words:List[Word_IN]) -> List[Word_Out]:
        for entry in words:
            self.add_one(entry)
        return words


    def update(self):
        # TODO implement an update method
        pass


    def delete(self):
        # TODO implement an update method
        pass


    def get_random_word(self)-> Word:
        rows = self.db.query(Word).count()
        limit = choice(range(1,rows))
        skip = choice(range(1,int(rows//10)))
        result = self.get_list_of_words(skip,limit) or \
                            self.db.query(Word).first()
        if type(result) == list:
            result = choice(result)

        return result


    def get_list_of_words(self, skip:int=0, limit:int=10):
        return self.db.query(Word).limit(limit).offset(skip).all()


    def sanitarize(self, input:str):
        return unidecode(input)


    def list_languages(self):
        return self.db.query(Language).all()
        

    def get_language(self, language:str):
        return (self.db.query(Language)
                .filter(Language.language == language)).first()
    
    def get_language_by_id(self, id:int):
        return (self.db.query(Language)
            .filter(Language.id == id)).first()
        

    def add_language(self, language:str) -> int:
        sanitized_language = self.sanitarize(language.strip().lower())
        result = self.get_language(sanitized_language)
        
        if not result:
            lang = Language(language=sanitized_language)
            self.db.add(lang)
            self.db.commit()
            self.db.refresh(lang)
            result = lang
        
        return result.id


    def get_word(self, request:Word_Base):
        fields = (  Word.word,
                    Word.playword,
                    Word.letters, 
                    Language.language, 
                    Statistics.games, 
                    Statistics.hits, 
                    Hints.hint  )
                        
        query = (self.db
                    .query(*fields)
                    .join(Language, Statistics, Hints)
                    .filter(Word.playword == \
                                        self.sanitarize(request.word.upper()))
                            ).first()

        query = query or Empty_Word(msg="Word not found Not Found")

        return query


    def parse_Word_Out():
        pass
