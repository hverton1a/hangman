import { useContext} from 'react';

import { ResultContext } from '../resultContext.jsx';


function ResultScreen(props){
    const resultProvider = useContext(ResultContext);
    const result = resultProvider.result;

    return (
        <div>
            <h1>{props.message}</h1>
            <h2>A Palavra era {result}</h2>
            <button onClick = { ()=>{  props.changer(1);}}>Play Again!</button>
            <button onClick = { (e)=>{ props.changer(0);}}>Go To Home</button>
        </div>
    )
}


export default( ResultScreen );