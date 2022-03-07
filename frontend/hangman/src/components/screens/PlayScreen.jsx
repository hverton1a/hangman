import { useState, useEffect, useCallback, useContext} from 'react';
import { SocketContext } from '../SocketContext.jsx';
import { ResultContext } from '../ResultContext.jsx';

import Hangman from '../hangman/Hangman';
import HiddenWord from '../HiddenWord';
import LetterTiles from '../LetterTiles';

function PlayScreen(props){
    const PLAYSCREEN = 1;
    const ERRORSCREEN = 4;
    const websocket = useContext(SocketContext);

    var ws = websocket.ws;
    const url = websocket.url;
    const setWs = websocket.setWs;

    const [ screen, setScreen ] = useState(PLAYSCREEN);
    
    useEffect(()=>{
            if ((!websocket.ws)||(websocket.ws.readyState > 1)) // OPEN = 1
            {
                ws = new WebSocket(url);
                setWs( ws );
                if ( ws.readyState === ws.CLOSE )
                {
                    props.changer( ERRORSCREEN );
                }
            }

            // TODO first message as a authentication token
            // TODO -> ws.onopen = () =>{ ws.send(process.env.WEBSOCKET_TOKEN)}
            
            ws.onopen = () =>{ ws.send(' ');
            setDisplay('visible');}
        },[]);
        
        
    const resultProvider = useContext(ResultContext);
    const setResult = resultProvider.setResult;
        
    const [ hiddenWord, setHiddenWord ] = useState(['Buscando Palavra ...']);
    const [ display, setDisplay ] = useState('hidden');
    const [ attempts, setAttempts ] = useState(0);
    const [ guessed, setGuessed ] = useState([]);
   
    const onMessage = useCallback((message)=>{
            message = JSON.parse(message.data);
            
            if(( message.state_index === 2) || 
                    (message.state_index === 3))
            {
                setScreen( message.state_index );
                setResult(message.word);
                
                props.changer(message.state_index );
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

    useEffect(()=>{
            ws.onclose = () =>{ 
                    if (screen === 1){ props.changer(ERRORSCREEN);}
                }
    },[ws, onMessage, onclose]);

    return (
        <div>
            <h2>Hangman Game</h2>
            <h3>Tente Descobrir a palavra.</h3>
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