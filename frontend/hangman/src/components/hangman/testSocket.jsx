import { useSocket } from "../useSocket";
import { useState, useEffect , useCallback, useContext} from 'react';

import { SocketContext } from "../socketContext";


// ! Testar funcções e handler


export function TesteCon(props)
{
    const websocket = useContext(SocketContext)
    const ws = websocket.ws;
    const setWs = websocket.setWs;


    const onMessage = useCallback((message)=>{
        //setData(JSON.parse(message.data));
        console.log("received data -> ",message.data);
        console.log("message -> ", message.data.message);
    },[]);

    useEffect(()=>{
        ws.addEventListener("message", onMessage);

        return ()=> {
            ws.removeEventListener("message", onMessage);
        };
    },[ws, onMessage]);
    
    return (
        <div>
            <button onClick={()=>ws.close()}>Disconnect</button>
            <button onClick={()=>setWs(new WebSocket("ws://192.168.0.208:5000/test-ws"))}>Connect</button>
            <button onClick={()=>{ws.send("something");}}>
            SEND SOMETHING
            </button>
        </div>
    )
}