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


export default( ResultScreen );