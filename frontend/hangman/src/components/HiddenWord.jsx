import { useEffect, useState } from 'react';
import './HiddenWord.css';

function HiddenWord(props)
{
    console.log(props.word);
    return (
             <p className="hiddenword" >{props.word.join(" ")}</p>
        )
}

export default HiddenWord;