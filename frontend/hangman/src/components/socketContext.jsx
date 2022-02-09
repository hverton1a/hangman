import { createContext, useState } from 'react';

export const SocketContext = createContext();

export const SocketProvider = ({children})=>{
    const [ url, setUrl ] = useState("ws://192.168.0.208:5000/ws");
    const [ ws, setWs ] = useState(null);

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

