import {useEffect, useState, createContext, ReactChild} from 'react';

const webSocket = new WebSocket("ws://192.168.0.208:5000/ws");

export const SocketContext = createContext({ws:WebSocket,setWs:()=>{},url:String,setUrl:()=>{}});

/*
interface ISocketProvider {
    children: ReactChild;
}
export const SocketProvider = (props: ISocketProvider) => {

*/

export const SocketProvider = ({children}) => {
    const [ws, setWs] = useState (null);
    //const [ws, setWs] = useState (webSocket);
    const [url, setUrl] = useState ("ws://192.168.0.208:5000/ws");
    /*
    useEffect(() => {
        const onClose = () => {
            //setTimeout(() =>{
            //setWs(new WebSocket("ws://192.168.0.208:5000/ws"));
            //}
            //);
            console.log("fechado");
    };

    
    ws.addEventListener("close", onClose);
    
    return () => {
        ws.removeEventListener("close", onClose);
    };
    },[ws, setWs] );
    function restart(restart){
        if (restart === "restart")
        {
            console.log("socketProvider")
            //setWs(new WebSocket("ws://192.168.0.208:5000/ws"));
        }
    }
    */

    //props.restart = '';

    return (
    <SocketContext.Provider value={{ws,setWs,url,setUrl}}>
        {children}
    </SocketContext.Provider>
);}
/*
export default (SocketProvider,
                SocketContext);*/

