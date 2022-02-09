import React, { useState, useEffect, useCallback, useRef, useContext} from 'react';
import { SocketContext } from './socketContext.jsx';
import { ResultContext } from './resultContext.jsx';

import { useSocket } from "./useSocket";

import Hangman from './hangman/hangman';

function PlayScreen(props){
    const websocket = useContext(SocketContext);
    const socket = websocket.ws;
    const setWs = websocket.setWs;

    const resultProvider = useContext(ResultContext);
    const result = resultProvider.result;
    const setResult = resultProvider.setResult;


    //const socket = props.socket;

    socket.send(' ')

    const [ data, setData ] = useState('');
    const [ response, setResponse ] = useState(socket.data);
    const [ attempts, setAttempts ] = useState(0)

    //const onClose = useCallback(() => socket)

    const onMessage = useCallback((message)=>{
        message = JSON.parse(message.data);
        //console.log("data ->", message);
        var attempts = message.max_attempts - message.num_guesses
        var info = (' -> ' + message.hidden_word + '       You Guesses: ' + message.guessed 
                + ' You have: ' +  attempts
                + ' guesses left')
                
                if(message.state_index === 2)
                {
                    info += ' '+ message.word;
                    info = message.state+' '+info;
                    
                    setResult(message.word);

                    socket.close();

                    props.changer(2);
                }else if(message.state_index === 3)
                {
                    info += ' '+ message.word;
                    info = message.state+' '+info;

                    setResult(message.word);


                    socket.close();
                    props.changer(3);                                                
                }else  if(message.state_index === 1)
                {
                    console.log("you are playing");
                }
        setResponse(info);
        setAttempts(message.num_guesses);
                                        });

    const textInput = useRef(null);


    useEffect(()=>{
        socket.addEventListener("message", onMessage);

        return ()=>{
            socket.removeEventListener("message", onMessage);
        };
    },[socket, onMessage]);


    function updateData(e)
    {
        setData(e.target.value)        
    }

    function sendText(e){
        socket.send(e.target.value)
    }

    function handle_data(e){
        socket.send(data);
        textInput.current.value = '';
    }

    function handleKeyPress(e){
        if (e.key === 'Enter')
        {
            handle_data(e);
        }
    }

    return (
        <div>
            <h1>Aqui vc joga</h1>
            <p>{response}</p>
            <Hangman attempts={attempts}/>
            <input type="text" 
                    ref={textInput} 
                    onChange = { (e)=> updateData(e) }
                    onKeyPress={(e)=> handleKeyPress(e)}></input>
            <button onClick = { (e)=> handle_data(e) }>SEND</button>
        </div>
    );
}


export default( PlayScreen );