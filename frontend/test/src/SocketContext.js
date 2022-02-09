//var ws = new WebSocket(`ws://192.168.0.208:5000/ws`);
import { createContext, useState } from 'react';
import { useSocket } from './useSocket';

export const SocketContext = createContext();

export const SocketProvider = ({children})=>{
    const [ url, setUrl ] = useState("ws://192.168.0.208:5000/test-ws");
    const [ ws, setWs ] = useState(useSocket);
    //ws.close()

    return (
        <SocketContext.Provider
            value={{
                ws,
                setWs,
                url,
                setUrl
            }}>
            {children}  
        </SocketContext.Provider>
            
    );
};