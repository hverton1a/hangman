import Hang from './hang';
import Stickman from './stickman';

function Hangman(props) 
{
    return(<div>
        <p>--inside --> {props.attempts}</p>
        <svg width="40vw" height="50vh">
            <Hang/>
            <Stickman attempts={props.attempts}/>
        </svg>
        </div>
    )
}


export default Hangman