import './LetterTiles.css';


function LetterButton(props)
{
    return <button className="letters" style={{visibility: props.display}}
                    onClick={(e)=>{props.click(e.target.firstChild.data)}}
                    disabled={props.disabled}>
                        {props.content}
                        </button>
}

function LetterTiles(props)
{
    return (
            <div className='letter-tiles'>                  
                {
                    props.letterlist.map(
                        (el,i)=> 
                        <LetterButton key={ i.toString() + props.letterlist[i] } 
                                      content={props.letterlist[i]}
                                      click={(value)=>{props.func(value);}}
                                      display={props.display}
                                      disabled={(props.state.includes(props.letterlist[i]))}
                                      />
                                    )
                }
            </div>
            )
}

export default LetterTiles