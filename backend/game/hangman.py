from sqlalchemy.orm import Session
from api.crud.words import Word_Crud
from models.word_model import Word
from api.crud.words import Word_Crud

class State:
    playing = 'Playing'
    lose = 'Game Over'
    win = 'Win the Game'

    @staticmethod
    def state_index():
        return {'Playing':1, 'Game Over': 3, 'Win the Game' :2}


class Loop_Obj:
    ''' 
    Main Game Loop Object.
    Set initial state and handle json parse.
    '''
    def __init__(self, word:Word, attempts:int = 8):
        self.hidden_word = ['_' for i in range(0, word.letters) ]
        self.state = State.playing
        self.index_state = State.state_index()[State.playing]
        self.guessed = []
        self.num_letters = word.letters
        self.max_attempts = attempts
        self.num_guesses = len(self.guessed)
        self.word = ''

    def to_json(self):
        return {"hidden_word": self.hidden_word, 
                "num_of_letters": self.num_letters,
                "guessed": self.guessed,
                "state": self.state, 
                "state_index": self.index_state,
                "max_attempts": self.max_attempts,
                "num_guesses": self.num_guesses,
                "word":self.word}


class Game:
    def __init__(self, db:Session):
        self.db = db
        self.in_loop = True
        self.guess = ''
        self.crud = Word_Crud(db = db)
        self.setup()


    def loop(self, data):

        if not data or data.isspace():
            return self.loop_obj.to_json()
        
        self.retrieve_user_input(data)

        if self.loop_obj.state is not State.playing:
            self.in_loop = False
            return {"word":self.loop_obj.to_json()['playword'],
                        "state":self.loop_obj.to_json()['state']}

        self.check_guess(self.word.playword, self.guess)
        self.check_state()

        return self.loop_obj.to_json()


    def retrieve_user_input(self, data):
        self.guess = ''
        data = data.strip()
        
        if data[0].isalpha():
            self.guess = data.upper()[0] or ''
        else:
            self.guess = ''


    def check_guess(self, word:str, guess:str):
        if guess in self.word.playword and \
            guess not in self.loop_obj.guessed and\
                guess != '':
            self.guessed_right()
        elif guess not in self.loop_obj.guessed and\
                guess !='':
            self.guessed_wrong()

        return self.loop_obj.to_json()
    

    def guessed_right(self):
        playword = self.word.playword
        index = playword.index(self.guess)
        self.loop_obj.hidden_word[index] = self.guess

        if playword.count(self.guess) > 1:
            for i in range(index + 1, self.loop_obj.num_letters):
                if playword[i] == self.guess:
                    self.loop_obj.hidden_word[i] = self.guess

        self.add_to_guessed()


    def guessed_wrong(self):
        self.add_to_guessed()
        self.loop_obj.num_guesses += 1


    def add_to_guessed(self):
        if self.guess != '':
            self.loop_obj.guessed.append(self.guess)


    def setup(self):
        self.word = self.get_word()
        self.loop_obj = Loop_Obj(self.word)
        

    def check_state(self):
        if self.loop_obj.hidden_word.count('_')<=0:
            self.loop_obj.index_state = State.state_index()[State.win]
            self.loop_obj.state = State.win
            self.loop_obj.word = self.word.word

            # TODO add Statistics update on Hits

            self.in_loop= False
        elif self.loop_obj.num_guesses >= self.loop_obj.max_attempts:
            self.loop_obj.index_state = State.state_index()[State.lose]
            self.loop_obj.state = State.lose
            self.loop_obj.word = self.word.word
            self.in_loop= False

    def get_word(self) -> Word:
        # TODO add update Statistics on Games
        return self.crud.get_random_word()

    def update_word_stat(self, word: Word) -> Word:
        self.crud.get_word(self.word.word)