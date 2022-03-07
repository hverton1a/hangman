import Hang from './Hang';
import Stickman from './Stickman';
import '../../styles/Hangman.css';
 
function Hangman(props) 
{
    return(
        <div className= "svg-wrapper">
            <svg width="100%" height="100%">
                <Hang/>
                <Stickman attempts={props.attempts}/>
            </svg>
        </div>
    )
}

export default Hangman;