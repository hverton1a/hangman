
function ErrorScreen(props){

    return (
        <div>
            <h1>Desculpe!<br/>{props.message}</h1>
            <button onClick = { ()=>{  props.changer(1);}}>Jogar</button>
            <button onClick = { (e)=>{ props.changer(0);}}>Home</button>
        </div>
    )
}


export default( ErrorScreen );