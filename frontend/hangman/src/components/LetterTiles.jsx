import { useEffect, useState } from 'react';
import './LetterTiles.css';


function LetterButton(props)
{
    return <button className="letters" style={{visibility: props.display}}
                    onClick={(e)=>{props.guess(e.target.firstChild.data)}}
                    disabled={props.disabled}>
                        {props.content}
                        </button>
}

function LetterTiles(props)
{
    useEffect(()=>{console.log("letterTiles list -> ", props.list)},[]);

    return (
            <div className='letter-tiles'>                  
                {
                    props.letterlist.map(
                        (el,i)=> 
                        <LetterButton key={ i.toString() + props.letterlist[i] } 
                                      click={(content)=>{console.log(props.letterlist[i])}}
                                      content={props.letterlist[i]}
                                      guess={(value)=>{props.func(value);}}
                                      display={props.display}
                                      disabled={(props.state.includes(props.letterlist[i]))}
                                      />
                                    )
                }
            </div>
            )
}

export default LetterTiles