import React, { useState, useEffect } from 'react';


function StartScreen(props){
    return <h1>Aqui vc dá play no jogo</h1>;
}


function PlayScreen(props){
    return <h1>Aqui vc dá joga</h1>;
}


function WinScreen(props){
    return <h1>Aqui vc dá joga</h1>;
}

   function Game(props){
       /*
       var ws = new WebSocket(`ws://localhost:5000/ws`);
       function sendMessage(event) {
           var input = document.getElementById("messageText");
           ws.send(input.value);
           input.value = '';
           event.preventDefault();
       }
       
       
       var client_id = Date.now();
       document.querySelector("#ws-id").textContent = client_id;
    ws.onmessage = function(event) {
        var messages = document.getElementById('messages');
        var message = document.createElement('li');
        var content = document.createTextNode(event.data);
        message.appendChild(content);
        messages.appendChild(message);
    };*/

    const [title, settitle] = useState('playing');

    function set_tittle(e){
        settitle(e.target.value)
    }

    useEffect(()=>{

    });

    return  (<div>
        <p>{title}</p>
        <input type="text" onChange={ (e) => set_tittle(e) }/>
    </div>);
}


export default(Game);