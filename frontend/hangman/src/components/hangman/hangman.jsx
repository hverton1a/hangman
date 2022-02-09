import Hang from './hang';
import Stickman from './stickman';
import '../../styles/hangman.css';

function Hangman(props) 
{
    return(
        <div class = "svg-wrapper">
            <svg width="100%" height="100%">
                <Hang/>
                <Stickman attempts={props.attempts}/>
            </svg>
        </div>
    )
}

export default Hangman;