import '../styles/HiddenWord.css';

function HiddenWord(props)
{
    return (
             <p className="hiddenword" >{props.word.join(" ")}</p>
        )
}

export default HiddenWord;