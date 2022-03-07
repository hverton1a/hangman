 
function Eyes() 
{
    return(
        <svg id="eyes" x="23%" y="27%" width="47%" height="12%" >
			<line x1="5%" y1="30%" x2="55%" y2="30%" stroke="black" fill="black" strokeWidth="2.5%" /> 
			<line x1="10%" y1="20%" x2="20%" y2="40%" stroke="black" fill="black" strokeWidth="2.5%" /> 
			<line x1="20%" y1="20%" x2="10%" y2="40%" stroke="black" fill="black" strokeWidth="2.5%" />
			<line x1="40%" y1="20%" x2="50%" y2="40%" stroke="black" fill="black" strokeWidth="2.5%" /> 
			<line x1="50%" y1="20%" x2="40%" y2="40%" stroke="black" fill="black" strokeWidth="2.5%" /> 
		</svg>
    )
}

function Mouth() 
{

    return 	(<svg id="mouth" x="28%" y="29%" width="20%" height="8%"  >
                <ellipse cx="40%" cy="98%" rx="60%" ry="20%" stroke="black" fill="none"  strokeWidth="5%" />
            </svg>)
}

function Head() 
{
    return(
        <circle id="head" cx="38%" cy="30%" r="12%"  stroke="black" strokeWidth="4" fill="none" />
    )
}

function Torso() 
{
    return(
        <rect id="torso" x="36%" y="39%" width="4%" height="29%" stroke="black" fill="black" strokeWidth="0.5%" />
    )
}

function LArm() 
{
    return(
        <line id="l-arm" x1="38%" y1="42%" x2="10%" y2="69%" stroke="black" fill="black" strokeWidth="2%" />
    )
}

function RArm() 
{
    return(
        <line id="r-arm" x1="38%" y1="42%" x2="63.5%" y2="69%" stroke="black" fill="black" strokeWidth="2%" />
    )
}

function LLeg() 
{
    return(
        <line id="l-leg" x1="38%" y1="66.5%" x2="10%" y2="98%" stroke="black" fill="black" strokeWidth="3%" />
    )
}

function RLeg() 
{
    return(
        <line id="r-leg" x1="38%" y1="66.5%" x2="63.5%" y2="98%" stroke="black" fill="black" strokeWidth="3%" />
    )
}

function Stickman (props)
{
    
    const stickmanParts=[
                <Head key="Head" />,
                <Torso key="Torso" />,
                <LArm key="LArm" />,
                <RArm key="RArm" />,
                <LLeg key="LLeg" />,
                <RLeg key="RLeg" />,
                <Eyes key="Eyes" />,
                <Mouth key="Mouth" />];
        
    var showParts = [];
    
    if (props.attempts > 0)
    {
        for (let i=1 ; i <= props.attempts; i++)
        {
            showParts.push(stickmanParts[i-1]);
        }
    }

    return(
        <svg x="49%" y="8%" width="30%" height="65%" >
            {showParts}
        </svg>
    )
}


export default Stickman;