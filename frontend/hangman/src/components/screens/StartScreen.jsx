function StartScreen(props){
    return (
        <div>
            <h2>Bem vindo ao Hangman</h2>
            <h3>Um jogo onde vc tenta adivinhar uma palavra oculta,<br/>chutando as letras do alfabeto</h3>
            <br/>
            <button onClick={()=>{ props.changer(1)}}>
                        Iniciar Jogo !
            </button>
        </div>
    );
}

export default( StartScreen );
