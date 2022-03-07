import { useEffect } from 'react';
import { useContext} from 'react';

import { ResultContext } from '../ResultContext.jsx';
import { SocketContext } from '../SocketContext.jsx';

function ResultScreen(props){
    const websocket = useContext(SocketContext);
    const resultProvider = useContext(ResultContext);
    const result = resultProvider.result;
    
    useEffect(()=>{
        var ws = websocket.ws;
        const setWs = websocket.setWs;
        if (ws){
            ws.close();
            setWs(ws);
        }
    },[websocket.ws]);

    return (
        <div>
            <h1>{props.message}</h1>
            <h2>A Palavra era {result}</h2>
            <button onClick = { ()=>{  props.changer(1);}}>Jogar Novamente!</button>
            <button onClick = { (e)=>{ props.changer(0);}}>Home</button>
        </div>
    )
}


export default( ResultScreen );