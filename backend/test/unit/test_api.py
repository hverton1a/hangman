import unittest
import requests

class Test(unittest.TestCase):
    def test_health_check_endpoint_response_200(self):
        result = requests.get('http://localhost:5000')
        self.assertEqual(result.status_code,200)

    # TODO
    ''' 
    @router.post('/add-language/{language}')
def add_language(language:str, db:Session = Depends(get_db)):
    ''' ''' Test Docstring
    ''' '''
    return crud.add_language(language=language)


@router.post('/add-word/')
async def add_word(word_in:Word_IN, db:Session = Depends(get_db)):
    return crud.add_one(word_in)


@router.get('/list-languages/')
def list_languages(db:Session = Depends(get_db)):
    response = crud.list_languages()
    return response


@router.post('/query/',response_model= Union[Empty_Word, Word_Out, Any])
def get_word(request:Word_Base, db:Session = Depends(get_db)):
    return crud.get_word(request)


@router.get('/lucky-word/')
def get_randomword(db:Session = Depends(get_db)):
    result = crud.get_random_word()
    return {"word":result.word,
            "playword":result.playword, 
            "letters":result.letters,
            "language":crud.get_language_by_id(result.language_id).language}


@router.get('/list-recipes/')
def get_recipe_list():
    return {"recipes":[recipe for recipe in catalog.keys()]}

    @router.get("/html-ws")
async def get():
    return HTMLResponse(html)


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, db:Session = Depends(get_db)):
    try:
        await websocket.accept()
        game = Game(db=db)
        await websocket.send_text(json.dumps(game.loop_obj.to_json()))

        while game.in_loop:
            data = await websocket.receive_text()
            if not data:
                continue
            result = game.loop(data)
            await websocket.send_text(json.dumps(result))

    finally:
        await websocket.close()

    '''