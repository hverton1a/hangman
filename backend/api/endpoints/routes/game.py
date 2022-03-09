from fastapi import APIRouter, WebSocket, Depends
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session

from db.database import get_db
from game.hangman import Game

import json

router = APIRouter()


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Hangman Test Screen</title>
    </head>
    <body>
        <h1>Hangman Test Screen</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <p> Digite a letra desejada, se for digitado mais de uma letra <br/>
        será considerado apenas a primeira, caso seja iniciado com <br/>
        qualquer outro caracter que nao seja uma letra será ignorado</p>
        <ul id='messages'>
        </ul>
        <script>
				var ws = new WebSocket(`ws://horvat-projects.xyz/ws`);
                ws.onmessage = function(event) {
                    var messages = document.getElementById('messages')
                    var message = document.createElement('li')
                    var content = document.createTextNode(event.data)
                    message.appendChild(content)
                    messages.appendChild(message)
                };
            
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@router.get("/html-ws-test-page")
async def get_html_test_page():
    '''
    API Endpoint with a simple html ,
    for testing without a external frontend.
    '''
    return HTMLResponse(html)


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, db:Session = Depends(get_db)):
    '''
    Websocket Endpoit for the Hangman game loop.
    '''
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
