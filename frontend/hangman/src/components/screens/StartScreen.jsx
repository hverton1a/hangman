function StartScreen(props){
    return (
        <div>
            <h1>Aqui vc dá play no jogo</h1>
            <br/>
            <button onClick={()=>{props.click()}}>Start the Game</button>
        </div>
    );
}

export default StartScreen;