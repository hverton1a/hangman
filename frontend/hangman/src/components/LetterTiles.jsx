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
    //const [state, setState]=useState(props.state)
    //
    //function show(){
    //    setDisplay('visible');
    //}

    return (
            <div className='letter-tiles'>                  
                {
                    props.list.map(
                        (el,i)=> 
                        <LetterButton key={ i.toString() + props.list[i] } 
                                      click={(content)=>{console.log(props.list[i])}}
                                      content={props.list[i]}
                                      guess={(value)=>{props.func(value);}}
                                      display={props.display}
                                      disabled={(props.state.includes(props.list[i]))}
                                      />
                                    )
                }
            </div>
            )
}

export default LetterTiles