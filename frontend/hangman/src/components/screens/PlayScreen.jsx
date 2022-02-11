import { useState, useEffect, useCallback, useContext} from 'react';
import { SocketContext } from '../socketContext.jsx';
import { ResultContext } from '../resultContext.jsx';

import Hangman from '../hangman/hangman';
import HiddenWord from '../HiddenWord';
import LetterTiles from '../LetterTiles';

function PlayScreen(props){
    const websocket = useContext(SocketContext);
    var ws = websocket.ws;
    const url = websocket.url;
    const setWs = websocket.setWs;
    
    useEffect(()=>{
            if ((!websocket.ws)||(websocket.ws.readyState > 1))
            {
                ws = new WebSocket(url);
                setWs(ws);
            }
            ws.onopen = () =>{ ws.send(' ');
            setDisplay('visible');}
        },[]);
    
    const resultProvider = useContext(ResultContext);
    const setResult = resultProvider.setResult;

    const [ hiddenWord, setHiddenWord ] = useState(['Buscando Palavra ...']);
    const [ display, setDisplay ] = useState('hidden');
    const [ attempts, setAttempts ] = useState(0);
    const [guessed, setGuessed] = useState([]);

    const onMessage = useCallback((message)=>{
            message = JSON.parse(message.data);

            if(message.state_index === 2)
            {
                setResult(message.word);
                ws.close();
                props.changer(2);
            }else if(message.state_index === 3)
            {
                setResult(message.word);
                ws.close();
                props.changer(3);                                                
            }
            setAttempts(message.num_guesses);
            setGuessed(message.guessed);
            setHiddenWord(message.hidden_word);
        });


    useEffect(()=>{
        ws.addEventListener("message", onMessage);

        return ()=>{
            ws.removeEventListener("message", onMessage);
        };
    },[ws, onMessage]);

    return (
        <div>
            <h2>Hangman Game</h2>
            <h3>Tente DEscobrir a palavra.</h3>
            <Hangman attempts={attempts}/>
            <HiddenWord word={hiddenWord}/>
            <LetterTiles display={display} 
                        letterlist={ 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("")} 
                        func={(value)=>{ws.send(value);}}
                        state={guessed}/>
        </div>
    );
}


export default( PlayScreen );