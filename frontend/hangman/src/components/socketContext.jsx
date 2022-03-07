import { createContext, useState } from 'react';

export const SocketContext = createContext();

export const SocketProvider = ({children})=>{
    const [ url, setUrl ] = useState(process.env.REACT_APP_WS_URL);
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

