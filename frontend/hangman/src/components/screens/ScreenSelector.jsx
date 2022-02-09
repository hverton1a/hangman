import StartScreen from './StartScreen';
import PlayScreen from './PlayScreen';
import ResultScreen from './ResultScreen';

function ScreenSelector(props){
    
    var screen = [
                    <StartScreen 
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                    />,
                    <PlayScreen
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                    />,
                    <ResultScreen 
                        message="Parabens, Você Ganhou"
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                    />,
                    <ResultScreen 
                        message="Ixe, Você Perdeu!" 
                        changer={(nextScreen)=>{props.changer(nextScreen);}}
                    />
            ];

    return screen[props.screen];
}

export default ScreenSelector;