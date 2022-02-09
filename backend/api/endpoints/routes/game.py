from fastapi import APIRouter, WebSocket, Query, Cookie, Depends, WebSocketDisconnect
from fastapi.responses import HTMLResponse,  RedirectResponse
from typing import Optional

from sqlalchemy.orm import Session

from db.database import get_db
import json

from game.hangman import Game

router = APIRouter()


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <div><h2>Your ID: <span id="ws-id"></span></h2><button click="connect(event)"></button></div>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            
                var client_id = Date.now()
                document.querySelector("#ws-id").textContent = client_id;
                var ws = new WebSocket(`ws://localhost:5000/ws`);
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

    return RedirectResponse('/')



@router.websocket("/test-ws")
async def websocket_endpoint(websocket: WebSocket, db:Session = Depends(get_db)):
    try:
        await websocket.accept()
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(json.dumps({"message": data}))

    finally:
        print("Forced connection closed");
