import React, { useState, useEffect, useCallback, useRef, useContext} from 'react';
import { SocketContext } from './socketContext.jsx';
import { ResultContext } from './resultContext.jsx';
import LetterTiles from './LetterTiles';
import HiddenWord from './HiddenWord';
import './card.css';

import Hangman from './hangman/hangman';

const letterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");


// ! refatorar usestate para usereducer
// ! refatorar as screens em varios arquivos
// ! refatorar o componente playscreen
// ! limpeza geral

function StartScreen(props){
    const websocket = useContext(SocketContext);
    
    const ws = websocket.ws;
    const url = websocket.url;
    const setWs = websocket.setWs;

    return (
        <div>
            <h1>Aqui vc dá play no jogo</h1>
            <br/>
            <button onClick={()=>{ props.changer(1)}}>
                        Start the Game
            </button>
        </div>
    );
}


function PlayScreen(props){
    const websocket = useContext(SocketContext);

    var ws = websocket.ws;
    const url = websocket.url;
    const setWs = websocket.setWs;
    
    
    const resultProvider = useContext(ResultContext);
    //const result = resultProvider.result;
    const setResult = resultProvider.setResult;
    

    const [ hiddenWord, setHiddenWord ] = useState([]);
    const [ display, setDisplay ] = useState('hidden');

    useEffect(()=>{
        if ((!websocket.ws)||(websocket.ws.readyState > 1))
        {
            ws = new WebSocket(url);
            setWs(ws);
        }
        ws.onopen = () =>{ ws.send(' ');
                            setDisplay('visible');}
        
        },[]);

    const [ data, setData ] = useState('');
    const [ response, setResponse ] = useState(data);
    const [ attempts, setAttempts ] = useState(0)

    const [guessed, setGuessed] = useState([]);


    const onMessage = useCallback((message)=>{
        message = JSON.parse(message.data);

        var attempts = message.max_attempts - message.num_guesses
        var info = (' -> ' + message.hidden_word + '       You Guesses: ' + message.guessed 
                + ' You have: ' +  attempts
                + ' guesses left')
                
                if(message.state_index === 2)
                {
                    info += ' '+ message.word;
                    info = message.state+' '+info;
                    
                    setResult(message.word);

                    ws.close();

                    props.changer(2);
                }else if(message.state_index === 3)
                {
                    info += ' '+ message.word;
                    info = message.state+' '+info;

                    setResult(message.word);


                    ws.close();
                    props.changer(3);                                                
                }else  if(message.state_index === 1)
                {
                    console.log("you are playing");
                }
        setResponse(info);
        setAttempts(message.num_guesses);
        setGuessed(message.guessed);
        setHiddenWord(message.hidden_word);
                                        });

    const textInput = useRef(null);

    useEffect(()=>{
        ws.addEventListener("message", onMessage);

        return ()=>{
            ws.removeEventListener("message", onMessage);
        };
    },[ws, onMessage]);


    function updateData(e)
    {
        setData(e.target.value)        
    }

    function handle_data(e){
        ws.send(data);
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
            <h2>Hangman Game</h2>
            <h3>Try to hit the hidden word, guessing it´s letters.</h3>
            <p>{response}</p>
            <Hangman attempts={attempts}/>
            <HiddenWord word={hiddenWord}/>
            <LetterTiles display={display} 
                        list={letterList} 
                        func={(value)=>{ws.send(value);}}
                        state={guessed}/>
        </div>
    );
}



function ResultScreen(props){
    const websocket = useContext(SocketContext);
    //const { ws, url, setWs } = {websocket};
    
    const setWs = websocket.setWs;
    const url = websocket.url;

    const resultProvider = useContext(ResultContext);
    const result = resultProvider.result;

    return (
        <div>
            <h1>{props.message}</h1>
            <h2>A Palavra era {result}</h2>
            <button onClick = { ()=>{  props.changer(1);}}>Play Again!</button>
            <button onClick = { (e)=>{ props.changer(0);}}>Go To Home</button>
        </div>
    )
}


function ScreenSelector(props){
    
    var screen = [
                    <StartScreen 
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                    />,
                    <PlayScreen
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                    />,
                    <ResultScreen 
                        message="Você Ganhou"
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                    />,
                    <ResultScreen 
                        message="Ixe vc perdeu" 
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                    />
            ];

    return screen[props.screen];
}



function Card(props){
    const [ screen, setScreen ] = useState(0);

    const websocket = useContext(SocketContext);
    const ws = websocket.ws;
    const url = websocket.url;
    const setWs = websocket.setWs;
    //const { ws, url, setWs } = {websocket};

    const resultProvider = useContext(ResultContext);
    const result = resultProvider.result;
    const setResult = resultProvider.setResult;

    
    function changeScreen(){
        var actual = screen + 1

        if (actual > 3) {  actual = 0 ; }
        
        setScreen(actual);
    }

    function changer(nextScreen){
        setScreen(nextScreen)
    }
    
    function StartGame(){
        setScreen(1);
    }

    return(
        <div className="card">
            <button onClick={changeScreen}>CS</button>         
            <ScreenSelector 
                changer={(nextScreen)=>{changer(nextScreen);}}
                screen={screen}
            />
        </div>
        );

}


export default( Card );