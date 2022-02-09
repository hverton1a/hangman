import { useContext, useRef, useState, useCallback, useEffect } from "react";
import { UserContext } from "./UserContext";
import { SocketContext } from "./SocketContext";

// This component displays name from Context
const Name = () => {
    const user = useContext(UserContext);
    const websocket = useContext(SocketContext)
    const myref = useRef(null);

    const [ data, setData ] = useState('')


    var socket = websocket.ws;

    const onMessage = useCallback((message)=>{
        setData(JSON.parse(message.data));
    },[]);

    useEffect(()=>{
        socket.addEventListener("message", onMessage);

        return ()=> {
            socket.removeEventListener("message", onMessage);
        };
    },[socket, onMessage]);

    return (
        <div style={{ marginTop: "30px" }}>
        <h2 className="is-size-4">
            <strong>Name</strong>: {user.name}
        </h2>
        <input ref={myref} type="text"/>
        <button onClick={()=>{
            user.setName(myref.current.value);
        }}>SET NAME</button>
        <button onClick={()=>{
            var old = socket;
            //socket.removeEventListener("message", onMessage);
            old.removeEventListener("message", onMessage);
            old.close()
            websocket.setWs(websocket.url);
            socket = websocket.ws;
        }}>CONNECT</button>
        <button onClick={()=>{console.log(user.name);socket.send(user.name)}}>SEND NAME</button>
        <p>{JSON.stringify(data)}</p>
        </div>
    );
};

export default Name;