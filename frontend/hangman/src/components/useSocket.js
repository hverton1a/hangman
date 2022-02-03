import { SocketContext }from "./socketProvider.jsx";
import { useContext }from "react";

export const useSocket = () =>{
    const socket = useContext(SocketContext);

    return socket;
};

// default useSocket;