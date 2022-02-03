import React, { useState, useEffect, useCallback, useRef, useContext} from 'react';
import { SocketProvider } from './socketProvider.jsx';
import { ResultProvider } from './resultProvider.jsx';

import { useSocket } from "./useSocket";

import Hangman from './hangman/hangman';



// ! Reconectar socket quando em play again
// ! mudar a screen quando terminar um jogo perdendo ou ganhando
// ! Apenas uma conexão ao socket ao conectar a pagina
// ! desconectar ao sair do componente filho

function StartScreen(props){
    return (
        <div>
            <h1>Aqui vc dá play no jogo</h1>
            <br/>
            <button onClick={()=>{props.restart(props.url);props.click()}}>Start the Game</button>
        </div>
    );
}


function PlayScreen(props){
    //const socket = useSocket();
    //const socketProvider = useContext(SocketProvider) ;
    //const resultProvider = useContext(ResultProvider) ;
    //console.log("socket provider :",socketProvider)
    //console.log("result provider :",resultProvider)

   // props.setWs(props.url);

    const socket = props.socket;

    socket.send(' ')

    const [ data, setData ] = useState('');
    const [ response, setResponse ] = useState(socket.data);
    const [ attempts, setAttempts ] = useState(0)

    const onClose = useCallback(() => socket)

    const onMessage = useCallback((message)=>{
        message = JSON.parse(message.data);
        //console.log("data ->", message);
        var attempts = message.max_attempts - message.num_guesses
        var info = (' -> ' + message.hidden_word + '       You Guesses: ' + message.guessed 
                + ' You have: ' +  attempts
                + ' guesses left')
                
                if(message.state_index === 2)
                {
                    info += ' '+ message.word;
                    info = message.state+' '+info;
                    
                    props.setResult(message.word);

                    socket.close();

                    props.changer(2);
                }else if(message.state_index === 3)
                {
                    info += ' '+ message.word;
                    info = message.state+' '+info;

                    props.setResult(message.word);


                    socket.close();
                    props.changer(3);                                                
                }else  if(message.state_index === 1)
                {
                    console.log("you are playing");
                }
        setResponse(info);
        setAttempts(message.num_guesses);
                                        });

    const textInput = useRef(null);


    useEffect(()=>{
        socket.addEventListener("message", onMessage);

        return ()=>{
            socket.removeEventListener("message", onMessage);
        };
    },[socket, onMessage]);

    /*

    useEffect(()=>{
        socket.addEventListener("close", onClose);

        return ()=>{
            socket.removeEventListener("close", onClose);
        };
    },[socket, onClose]);*/




    function updateData(e)
    {
        setData(e.target.value)        
    }

    function sendText(e){
        socket.send(e.target.value)
    }

    function handle_data(e){
        socket.send(data);
        textInput.current.value = '';
    }

    function handleKeyPress(e){
        if (e.key === 'Enter')
        {
            handle_data(e);
        }
    }

    return (
        <div>
            <h1>Aqui vc joga</h1>
            <p>{response}</p>
            <Hangman attempts={attempts}/>
            <input type="text" 
                    ref={textInput} 
                    onChange = { (e)=> updateData(e) }
                    onKeyPress={(e)=> handleKeyPress(e)}></input>
            <button onClick = { (e)=> handle_data(e) }>SEND</button>
        </div>
    );
}

/*

function WinScreen(props){
    return (
            <div>
                <h1>Você Ganhou</h1>
                <h2>A Palavra era {props.result}</h2>
                <button onClick = { ()=>{ props.restart("restart");
                                         props.changer(1);}}>Play Again!</button>
                <button onClick = {(e)=>{console.log("home");
                                           props.changer(0);}}>Go To Home</button>
            </div>
            )
}




function LoseScreen(props){
    return (
            <div>
                <h1>Ixe vc perdeu</h1>
                <h2>A Palavra era {props.result}</h2>
                <button onClick = { ()=> {props.restart("restart")}}>Play Again!</button>
                <button onClick = {(e)=>console.log("home")}>Go To Home</button>
            </div>
    )
}
*/


function ResultScreen(props){

    return (
        <div>
            <h1>{props.message}</h1>
            <h2>A Palavra era {props.result}</h2>
            <button onClick = { ()=>{props.restart(props.url); props.changer(1);}}>Play Again!</button>
            <button onClick = {(e)=>{ props.changer(0);}}>Go To Home</button>
        </div>
)
}



//########################

function ScreenSelector(props){
    
    var screen = [
                    <StartScreen 
                        click={props.click}
                        socket={props.ws}
                        restart={(value)=>props.setWs(value)}
                        url={props.url}
                    />,
                    <PlayScreen
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                        socket={props.ws}
                        restart={(value)=>props.setWs(value)}
                        url={props.url}
                        updateResult={(value)=>props.updateResult(value)}
                    />,
                    <ResultScreen 
                        message="Você Ganhou"
                        result={props.result} 
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                        socket={props.ws}
                        restart={(value)=>props.setWs(value)}
                        url={props.url}
                    />,
                    <ResultScreen 
                        message="Ixe vc perdeu" 
                        result={props.result}
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                        socket={props.ws}
                        restart={(value)=>props.setWs(value)}
                        url={props.url}
                    />
            ];

    return screen[props.screen];
}



//##########################
function Card(props){
    const [ screen, setScreen ] = useState(0);
    const [restart, setRestart ] = useState('');
    
    function changeScreen(){
        var actual = screen + 1

        if (actual > 3) {  actual = 0 ; }
        
        setScreen(actual);
    }

    function changer(nextScreen){
        setScreen(nextScreen)
    }
    
    function StartGame(){
        setScreen(1);
    }

    return(
        <SocketProvider.Consumer>  
           { ({ws, setWs, url})=>(
               <ResultProvider.Consumer>
                   {({result, setResult})=>(
                       <div>
                            <button onClick={changeScreen}>CS</button>         
                            <ScreenSelector 
                                changer={(nextScreen)=>{changer(nextScreen);
                                    console.log("nextScreen ->",nextScreen)}} 
                                screen={screen} 
                                click={StartGame}
                                socket={ws}
                                restart={(value)=>setWs(value)}
                                url={url}
                                result={result}
                                updateResult={(value)=>setResult(value)}
                        />
                        </div>)}
                </ResultProvider.Consumer>
           )}
        </SocketProvider.Consumer>
    )


}


export default( Card );