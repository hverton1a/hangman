import logo from './logo.svg';
import './App.css';
import Card from './components/card';
import { SocketProvider } from './components/socketProvider.jsx';
import { ResultProvider } from './components/resultProvider.jsx';

function App() {
  //const ws = new WebSocket("ws://localhost:5000/ws");

  return (
    <SocketProvider>
      <ResultProvider>
        <div className="App">
          <Card/>
        </div>
      </ResultProvider>
    </SocketProvider>
  );
}

export default App;
