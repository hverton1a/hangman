import logo from './logo.svg';
import './styles/App.css';
import Card from './components/card';
import { SocketProvider } from './components/socketContext';
import { ResultProvider } from './components/resultContext';

//import { TesteCon } from './components/hangman/testSocket';


function App() {
  //const ws = new WebSocket("ws://localhost:5000/ws");
  
  return (
      <div className="App">
        <SocketProvider>
          <ResultProvider>
              <Card/>
          </ResultProvider>
        </SocketProvider>
      </div>
  );
}

export default App;
