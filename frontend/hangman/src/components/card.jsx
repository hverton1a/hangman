import { useState } from 'react';
import './card.css';

import ScreenSelector from './screens/ScreenSelector';

function Card(){
    const [ screen, setScreen ] = useState(0);
    
    return(
        <div className="card">        
            <ScreenSelector 
                changer={(nextScreen)=>{setScreen(nextScreen);}}
                screen={screen}
            />
        </div>
        );
}

export default( Card );